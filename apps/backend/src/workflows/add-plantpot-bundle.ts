import {
  createWorkflow,
  createStep,
  StepResponse,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk"
import {
  addToCartWorkflow,
  useQueryGraphStep,
} from "@medusajs/medusa/core-flows"
import { MedusaError } from "@medusajs/framework/utils"
import crypto from "crypto"
import { potFitsPlant } from "../utils/fit"

type AddPlantPotBundleInput = {
  cart_id: string
  plant_product_id: string
  plant_variant_id: string
  pot_product_id: string
  pot_variant_id: string
  plant_nursery_pot_diameter_cm: number
  pot_inner_diameter_cm: number
}

// Step 1: validate the plant/pot fit
const validateFitStep = createStep(
  "validate-fit-step",
  async (input: AddPlantPotBundleInput) => {
    const { plant_nursery_pot_diameter_cm, pot_inner_diameter_cm } = input

    const fits = potFitsPlant(
      pot_inner_diameter_cm,
      plant_nursery_pot_diameter_cm
    )

    if (!fits) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Pot (${pot_inner_diameter_cm}cm) does not fit this plant's nursery pot (${plant_nursery_pot_diameter_cm}cm).`
      )
    }

    return new StepResponse({ fits })
  }
)

// Step 2: generate a shared bundle_id
const generateBundleIdStep = createStep(
  "generate-bundle-id-step",
  async () => {
    const bundle_id = crypto.randomUUID()
    return new StepResponse({ bundle_id })
  }
)

export const addPlantPotBundleWorkflow = createWorkflow(
  "add-plantpot-bundle",
  (input: AddPlantPotBundleInput) => {
    validateFitStep(input)
    const { bundle_id } = generateBundleIdStep()

    const bundleItems = transform({ input, bundle_id }, ({ input, bundle_id }) => [
      {
        product_id: input.plant_product_id,
        variant_id: input.plant_variant_id,
        quantity: 1,
        title: "Plant",
        metadata: { bundle_id, bundle_role: "plant" },
      },
      {
        product_id: input.pot_product_id,
        variant_id: input.pot_variant_id,
        quantity: 1,
        title: "Pot",
        metadata: { bundle_id, bundle_role: "pot" },
      },
    ])

    // Adding both items through Medusa's own add-to-cart workflow (not the
    // cart module directly) so locking, inventory confirmation, price
    // resolution from the variant, and the totals/tax-line recompute
    // (refreshCartItemsWorkflow) all run as they would for a normal cart
    // mutation. It self-compensates on failure. unit_price is deliberately
    // left unset so the price always comes from the variant, never a caller.
    addToCartWorkflow.runAsStep({
      input: {
        cart_id: input.cart_id,
        items: bundleItems,
      },
    })

    const { data: carts } = useQueryGraphStep({
      entity: "cart",
      fields: ["items.*"],
      filters: { id: input.cart_id },
    })

    const lineItems = transform({ carts, bundle_id }, ({ carts, bundle_id }) =>
      (carts[0]?.items ?? []).filter(
        (item: any) => item.metadata?.bundle_id === bundle_id
      )
    )

    return new WorkflowResponse({ bundle_id, lineItems })
  }
)

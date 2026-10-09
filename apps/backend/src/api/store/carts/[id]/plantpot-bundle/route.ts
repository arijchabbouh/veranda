import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import { addPlantPotBundleWorkflow } from "../../../../../workflows/add-plantpot-bundle"

type PlantPotBundleBody = {
  plant_product_id: string
  plant_variant_id: string
  pot_product_id: string
  pot_variant_id: string
}

export async function POST(
  req: MedusaRequest<PlantPotBundleBody>,
  res: MedusaResponse
) {
  const { plant_product_id, plant_variant_id, pot_product_id, pot_variant_id } =
    req.body

  if (
    !plant_product_id ||
    !plant_variant_id ||
    !pot_product_id ||
    !pot_variant_id
  ) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "plant_product_id, plant_variant_id, pot_product_id and pot_variant_id are all required"
    )
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  // Diameters used for the fit check are always resolved from the linked
  // plant-meta/pot-meta records here, never taken from the request body -
  // otherwise a caller could fabricate dimensions to force an incompatible
  // pair past validation.
  const {
    data: [plantProduct],
  } = await query.graph({
    entity: "product",
    fields: ["id", "plant_meta.nursery_pot_diameter_cm"],
    filters: { id: plant_product_id },
  })

  const {
    data: [potProduct],
  } = await query.graph({
    entity: "product",
    fields: ["id", "pot_meta.inner_diameter_cm"],
    filters: { id: pot_product_id },
  })

  if (!plantProduct?.plant_meta) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `Product ${plant_product_id} has no plant-meta record`
    )
  }

  if (!potProduct?.pot_meta) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `Product ${pot_product_id} has no pot-meta record`
    )
  }

  const { result } = await addPlantPotBundleWorkflow(req.scope).run({
    input: {
      cart_id: req.params.id,
      plant_product_id,
      plant_variant_id,
      pot_product_id,
      pot_variant_id,
      plant_nursery_pot_diameter_cm:
        plantProduct.plant_meta.nursery_pot_diameter_cm,
      pot_inner_diameter_cm: potProduct.pot_meta.inner_diameter_cm,
    },
  })

  res.json(result)
}

import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { potFitsPlant } from "../../../utils/fit"

const PRODUCT_FIELDS = [
  "products.id",
  "products.title",
  "products.handle",
  "products.thumbnail",
  "products.images.id",
  "products.images.url",
  "products.images.asset_meta.*",
  "products.variants.id",
  "products.variants.title",
  "products.variants.sku",
]

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const {
    data: [plantsCategory],
  } = await query.graph({
    entity: "product_category",
    fields: [...PRODUCT_FIELDS, "products.plant_meta.*"],
    filters: { handle: "plants" },
  })

  const {
    data: [potsCategory],
  } = await query.graph({
    entity: "product_category",
    fields: [...PRODUCT_FIELDS, "products.pot_meta.*"],
    filters: { handle: "pots" },
  })

  const plants = plantsCategory?.products ?? []
  const pots = potsCategory?.products ?? []

  const compatibility = plants.flatMap((plant: any) => {
    if (!plant.plant_meta) {
      return []
    }
    return pots
      .filter((pot: any) => pot.pot_meta)
      .map((pot: any) => ({
        plant_id: plant.id,
        pot_id: pot.id,
        fits: potFitsPlant(
          pot.pot_meta.inner_diameter_cm,
          plant.plant_meta.nursery_pot_diameter_cm
        ),
      }))
  })

  res.json({ plants, pots, compatibility })
}

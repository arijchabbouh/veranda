import ProductModule from "@medusajs/medusa/product"
import PlantMetaModule from "../modules/plant-meta"
import { defineLink } from "@medusajs/framework/utils"

export default defineLink(
  ProductModule.linkable.product,
  PlantMetaModule.linkable.plantMeta
)

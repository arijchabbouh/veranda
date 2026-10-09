import ProductModule from "@medusajs/medusa/product"
import PotMetaModule from "../modules/pot-meta"
import { defineLink } from "@medusajs/framework/utils"

export default defineLink(
  ProductModule.linkable.product,
  PotMetaModule.linkable.potMeta
)

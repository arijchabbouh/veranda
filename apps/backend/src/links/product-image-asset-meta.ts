import ProductModule from "@medusajs/medusa/product"
import AssetMetaModule from "../modules/asset-meta"
import { defineLink } from "@medusajs/framework/utils"

export default defineLink(
  ProductModule.linkable.productImage,
  AssetMetaModule.linkable.assetMeta
)

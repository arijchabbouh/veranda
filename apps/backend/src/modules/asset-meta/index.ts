import { Module } from "@medusajs/framework/utils"
import AssetMetaModuleService from "./service"

export const ASSET_META_MODULE = "assetMeta"

export default Module(ASSET_META_MODULE, {
  service: AssetMetaModuleService,
})
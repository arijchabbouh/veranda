import { Module } from "@medusajs/framework/utils"
import PotMetaModuleService from "./service"

export const POT_META_MODULE = "potMeta"

export default Module(POT_META_MODULE, {
  service: PotMetaModuleService,
})

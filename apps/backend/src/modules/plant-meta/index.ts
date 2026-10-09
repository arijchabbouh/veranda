import { Module } from "@medusajs/framework/utils"
import PlantMetaModuleService from "./service"

export const PLANT_META_MODULE = "plantMeta"

export default Module(PLANT_META_MODULE, {
  service: PlantMetaModuleService,
})
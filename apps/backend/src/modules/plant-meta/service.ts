import { MedusaService } from "@medusajs/framework/utils"
import { PlantMeta } from "./models"

class PlantMetaModuleService extends MedusaService({
  PlantMeta,
}) {}

export default PlantMetaModuleService
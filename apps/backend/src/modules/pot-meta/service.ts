import { MedusaService } from "@medusajs/framework/utils"
import { PotMeta } from "./models"

class PotMetaModuleService extends MedusaService({
  PotMeta,
}) {}

export default PotMetaModuleService

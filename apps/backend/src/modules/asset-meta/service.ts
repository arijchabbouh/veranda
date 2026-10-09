import { MedusaService } from "@medusajs/framework/utils"
import { AssetMeta } from "./models"

class AssetMetaModuleService extends MedusaService({
  AssetMeta,
}) {}

export default AssetMetaModuleService
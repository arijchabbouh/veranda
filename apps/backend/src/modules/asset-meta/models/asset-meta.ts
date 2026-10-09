import { model } from "@medusajs/framework/utils"

const AssetMeta = model.define("asset_meta", {
  id: model.id().primaryKey(),
  rimYPct: model.number(),
  rimWidthPct: model.number(),
  baseYPct: model.number(),
  version: model.number(),
})

export default AssetMeta

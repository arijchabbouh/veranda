import { model } from "@medusajs/framework/utils"

const PotMeta = model.define("pot_meta", {
  id: model.id().primaryKey(),
  name_en: model.text(),
  name_ar: model.text(),
  material: model.text(),
  color_hex: model.text(),
  finish: model.text(),
  inner_diameter_cm: model.number(),
  height_cm: model.number(),
  drainage: model.boolean(),
  saucer: model.boolean(),
})

export default PotMeta

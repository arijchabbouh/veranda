import { model } from "@medusajs/framework/utils"

const PlantMeta = model.define("plant_meta", {
  id: model.id().primaryKey(),
  name_botanical: model.text(),
  name_ar: model.text(),
  growth_habit: model.text(),
  light: model.text(),
  water_frequency_days: model.number(),
  toxicity: model.text(),
  real_height_cm: model.number(),
  nursery_pot_diameter_cm: model.number(),
  care_notes_en: model.text(),
  care_notes_ar: model.text(),
})

export default PlantMeta

// Shapes returned by the backend's GET /store/plants route.

export type AssetMeta = {
  id: string
  rimYPct: number
  rimWidthPct: number
  baseYPct: number
  version: number
}

export type ConfiguratorImage = {
  id: string
  url: string
  asset_meta?: AssetMeta | null
}

export type ConfiguratorVariant = {
  id: string
  title: string
  sku: string | null
}

type ConfiguratorProduct = {
  id: string
  title: string
  handle: string
  thumbnail: string | null
  images: ConfiguratorImage[]
  variants: ConfiguratorVariant[]
}

export type PlantMeta = {
  id: string
  name_botanical: string
  name_ar: string
  growth_habit: string
  light: string
  water_frequency_days: number
  toxicity: string
  real_height_cm: number
  nursery_pot_diameter_cm: number
  care_notes_en: string
  care_notes_ar: string
}

export type PotMeta = {
  id: string
  name_en: string
  name_ar: string
  material: string
  color_hex: string
  finish: string
  inner_diameter_cm: number
  height_cm: number
  drainage: boolean
  saucer: boolean
}

export type ConfiguratorPlant = ConfiguratorProduct & {
  plant_meta?: PlantMeta | null
}

export type ConfiguratorPot = ConfiguratorProduct & {
  pot_meta?: PotMeta | null
}

export type ConfiguratorCompatibility = {
  plant_id: string
  pot_id: string
  fits: boolean
}

export type ConfiguratorData = {
  plants: ConfiguratorPlant[]
  pots: ConfiguratorPot[]
  compatibility: ConfiguratorCompatibility[]
}

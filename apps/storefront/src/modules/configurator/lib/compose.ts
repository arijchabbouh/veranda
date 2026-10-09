import { AssetMeta, ConfiguratorImage } from "types/configurator"

// Layout maths for layering a plant cutout onto a pot cutout on the studio
// stage. Everything is expressed in percentages so the stage can be any size.
//
// Anchors come from each image's asset_meta (percent of the image, from its
// top-left). The subject is horizontally centred in every cutout.
//  - pot:   rimYPct = soil line, rimWidthPct = inner opening, baseYPct = seat
//  - plant: baseYPct = where the stem meets the soil

export const STAGE = {
  background: "/configurator/studio-background.jpg",
  // width / height of the stage, matching the background photo
  aspect: 3 / 4,
  // top surface of the plinth, as % of stage height from the bottom
  seatPct: 14.6,
  // headroom kept free above the plant, as % of stage height
  headroomPct: 6,
  // widest a plant may get, as % of stage width
  maxPlantWidthPct: 94,
  // upper bound for the scale, in % of stage width per cm
  maxScalePerCm: 1.25,
}

const DEFAULT_POT_ANCHORS = { rimYPct: 12, rimWidthPct: 82, baseYPct: 96 }
const DEFAULT_PLANT_ANCHORS = { rimYPct: 100, rimWidthPct: 10, baseYPct: 100 }

export type ImageSize = { width: number; height: number }

export type LayerBox = {
  // % of stage width
  left: number
  width: number
  // % of stage height
  bottom: number
  height: number
}

export type Composition = {
  pot: LayerBox
  plant: LayerBox
  // share of the plant image below the soil line, clipped away (% of image)
  plantClipBottomPct: number
  // true when the plant is drawn at the same cm scale as the pot
  toScale: boolean
}

/**
 * The cutout to composite: the first image carrying anchors, else the first.
 */
export const pickCutout = (images: ConfiguratorImage[] | undefined) =>
  images?.find((image) => image.asset_meta) ?? images?.[0]

const anchorsOf = (
  meta: AssetMeta | null | undefined,
  fallback: typeof DEFAULT_POT_ANCHORS
) => ({
  rimY: (meta?.rimYPct ?? fallback.rimYPct) / 100,
  rimWidth: (meta?.rimWidthPct ?? fallback.rimWidthPct) / 100,
  baseY: (meta?.baseYPct ?? fallback.baseYPct) / 100,
})

export function composeStage({
  potSize,
  potMeta,
  potInnerDiameterCm,
  plantSize,
  plantMeta,
  plantHeightCm,
}: {
  potSize: ImageSize
  potMeta?: AssetMeta | null
  potInnerDiameterCm: number
  plantSize: ImageSize
  plantMeta?: AssetMeta | null
  plantHeightCm: number
}): Composition {
  const pot = anchorsOf(potMeta, DEFAULT_POT_ANCHORS)
  const plant = anchorsOf(plantMeta, DEFAULT_PLANT_ANCHORS)

  // Work in "units" = % of stage width, so x and y share one scale.
  const stageHeight = 100 / STAGE.aspect
  const seat = (STAGE.seatPct / 100) * stageHeight
  const available =
    stageHeight - seat - (STAGE.headroomPct / 100) * stageHeight

  // Per cm of scale: how tall the pot is from seat to soil line, and how wide
  // and tall the visible plant is.
  const potWidthPerCm = potInnerDiameterCm / pot.rimWidth
  const potHeightPerCm = potWidthPerCm * (potSize.height / potSize.width)
  const potRiseCm = potHeightPerCm * (pot.baseY - pot.rimY)
  const plantImageHeightCm = plantHeightCm / plant.baseY
  const plantWidthCm = plantImageHeightCm * (plantSize.width / plantSize.height)

  // One scale for both layers, so the pair keeps its real-life proportions.
  // It shrinks until the stack fits between the plinth and the headroom.
  const scale = Math.min(
    STAGE.maxScalePerCm,
    available / (potRiseCm + plantHeightCm)
  )

  // A very wide plant is narrowed on its own rather than shrinking the pot too.
  const plantScale = Math.min(scale, STAGE.maxPlantWidthPct / plantWidthCm)

  const potWidth = potWidthPerCm * scale
  const potHeight = potHeightPerCm * scale
  // the pot's base anchor rests on the plinth
  const potBottom = seat - (1 - pot.baseY) * potHeight
  const soilLine = potBottom + (1 - pot.rimY) * potHeight

  const plantHeight = plantImageHeightCm * plantScale
  const plantWidth = plantWidthCm * plantScale
  // the plant's base anchor rests on the soil line
  const plantBottom = soilLine - (1 - plant.baseY) * plantHeight

  const toStageHeight = (units: number) => (units / stageHeight) * 100

  return {
    pot: {
      left: 50 - potWidth / 2,
      width: potWidth,
      bottom: toStageHeight(potBottom),
      height: toStageHeight(potHeight),
    },
    plant: {
      left: 50 - plantWidth / 2,
      width: plantWidth,
      bottom: toStageHeight(plantBottom),
      height: toStageHeight(plantHeight),
    },
    plantClipBottomPct: (1 - plant.baseY) * 100,
    toScale: plantScale === scale,
  }
}

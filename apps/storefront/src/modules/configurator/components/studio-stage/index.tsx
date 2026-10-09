"use client"

import { clx } from "@modules/common/components/ui"
import {
  composeStage,
  ImageSize,
  LayerBox,
  pickCutout,
  STAGE,
} from "@modules/configurator/lib/compose"
import { useEffect, useMemo, useState } from "react"
import { ConfiguratorPlant, ConfiguratorPot } from "types/configurator"

const LIGHTING_PRESETS = [
  { id: "softbox", name: "Studio", filter: "none", tint: "transparent" },
  {
    id: "amber",
    name: "Morning",
    filter: "sepia(0.06) saturate(1.08) brightness(1.02)",
    tint: "rgba(240, 200, 150, 0.08)",
  },
  {
    id: "charcoal",
    name: "Evening",
    filter: "contrast(1.06) saturate(0.96)",
    tint: "rgba(30, 40, 50, 0.08)",
  },
]

// The compositing needs each cutout's pixel dimensions to keep its aspect
// ratio; the API does not carry them, so they are read from the loaded image.
const useImageSize = (url: string | undefined) => {
  const [sizes, setSizes] = useState<Record<string, ImageSize>>({})

  useEffect(() => {
    if (!url || sizes[url]) {
      return
    }
    const image = new window.Image()
    image.onload = () =>
      setSizes((prev) => ({
        ...prev,
        [url]: { width: image.naturalWidth, height: image.naturalHeight },
      }))
    image.src = url
  }, [url, sizes])

  return url ? sizes[url] : undefined
}

const boxStyle = (box: LayerBox) => ({
  left: `${box.left}%`,
  width: `${box.width}%`,
  bottom: `${box.bottom}%`,
  height: `${box.height}%`,
})

type StudioStageProps = {
  plant: ConfiguratorPlant
  pot: ConfiguratorPot
}

const StudioStage = ({ plant, pot }: StudioStageProps) => {
  const [lighting, setLighting] = useState(LIGHTING_PRESETS[0])

  const plantImage = pickCutout(plant.images)
  const potImage = pickCutout(pot.images)
  const plantSize = useImageSize(plantImage?.url)
  const potSize = useImageSize(potImage?.url)

  const composition = useMemo(() => {
    if (!plantSize || !potSize || !plant.plant_meta || !pot.pot_meta) {
      return null
    }
    return composeStage({
      potSize,
      potMeta: potImage?.asset_meta,
      potInnerDiameterCm: pot.pot_meta.inner_diameter_cm,
      plantSize,
      plantMeta: plantImage?.asset_meta,
      plantHeightCm: plant.plant_meta.real_height_cm,
    })
  }, [plant, pot, plantImage, potImage, plantSize, potSize])

  return (
    <div className="flex flex-col gap-y-3">
      <div
        className="relative w-full overflow-hidden rounded-large bg-[#b9b2a7] select-none"
        style={{ aspectRatio: `${STAGE.aspect}` }}
        data-testid="configurator-stage"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-[filter] duration-700"
          style={{
            backgroundImage: `url(${STAGE.background})`,
            filter: lighting.filter,
          }}
        />
        <div
          className="absolute inset-0 mix-blend-multiply transition-colors duration-700"
          style={{ backgroundColor: lighting.tint }}
        />

        {composition && plantImage && potImage && (
          <div
            className="absolute inset-0 transition-[filter] duration-700"
            style={{ filter: lighting.filter }}
          >
            {/* contact shadow where the pot meets the plinth */}
            <div
              className="absolute rounded-[50%] bg-black/40 blur-md"
              style={{
                left: `${composition.pot.left + composition.pot.width * 0.04}%`,
                width: `${composition.pot.width * 0.92}%`,
                bottom: `${STAGE.seatPct - 1.4}%`,
                height: "2.8%",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={potImage.id}
              src={potImage.url}
              alt={pot.title}
              className="absolute animate-fade-in-right"
              style={boxStyle(composition.pot)}
              data-testid="configurator-pot-layer"
            />
            {/* the plant sits on the soil line; anything below it is clipped */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={plantImage.id}
              src={plantImage.url}
              alt={plant.title}
              className="absolute animate-fade-in-right drop-shadow-md"
              style={{
                ...boxStyle(composition.plant),
                clipPath: `inset(0 0 ${composition.plantClipBottomPct}% 0)`,
              }}
              data-testid="configurator-plant-layer"
            />
          </div>
        )}

        {composition && !composition.toScale && (
          <span className="absolute top-3 left-3 rounded-full bg-white/85 px-3 py-1 txt-compact-xsmall text-ui-fg-subtle">
            Plant narrowed to fit the frame
          </span>
        )}
      </div>

      <div className="flex items-center gap-x-2 txt-compact-small text-ui-fg-subtle">
        <span>Lighting</span>
        {LIGHTING_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setLighting(preset)}
            className={clx(
              "rounded-full border px-3 py-1 transition-colors",
              lighting.id === preset.id
                ? "border-ui-border-interactive text-ui-fg-base bg-ui-bg-base"
                : "border-ui-border-base hover:text-ui-fg-base"
            )}
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default StudioStage

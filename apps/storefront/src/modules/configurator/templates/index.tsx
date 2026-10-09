"use client"

import { addPlantPotBundle } from "@lib/data/configurator"
import { Badge, Button, Heading, Text } from "@modules/common/components/ui"
import Divider from "@modules/common/components/divider"
import OptionSlider from "@modules/configurator/components/option-slider"
import StudioStage from "@modules/configurator/components/studio-stage"
import { useParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { ConfiguratorData } from "types/configurator"

const ConfiguratorTemplate = ({ data }: { data: ConfiguratorData }) => {
  // Only products carrying their meta record can be composed and fit-checked.
  const plants = useMemo(
    () => data.plants.filter((plant) => plant.plant_meta),
    [data.plants]
  )
  const pots = useMemo(
    () => data.pots.filter((pot) => pot.pot_meta),
    [data.pots]
  )

  const [plantId, setPlantId] = useState(plants[0]?.id)
  const [potId, setPotId] = useState(pots[0]?.id)
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  const countryCode = useParams().countryCode as string
  const router = useRouter()

  const plant = plants.find((p) => p.id === plantId)
  const pot = pots.find((p) => p.id === potId)

  const fits = (forPlantId?: string, forPotId?: string) =>
    data.compatibility.some(
      (pair) =>
        pair.plant_id === forPlantId && pair.pot_id === forPotId && pair.fits
    )

  if (!plant || !pot || !plant.plant_meta || !pot.pot_meta) {
    return (
      <div className="content-container py-24 text-center">
        <Heading level="h1" className="text-2xl-semi">
          Configurator
        </Heading>
        <Text className="mt-4 text-ui-fg-subtle">
          No plants or pots are available yet.
        </Text>
      </div>
    )
  }

  const pairFits = fits(plant.id, pot.id)
  const plantVariant = plant.variants[0]
  const potVariant = pot.variants[0]

  const select = (setter: (id: string) => void) => (id: string) => {
    setter(id)
    setError(null)
    setAdded(false)
  }

  const handleAddBundle = async () => {
    if (!plantVariant || !potVariant) {
      return
    }

    setIsAdding(true)
    setError(null)

    try {
      await addPlantPotBundle({
        plantProductId: plant.id,
        plantVariantId: plantVariant.id,
        potProductId: pot.id,
        potVariantId: potVariant.id,
        countryCode,
      })
      setAdded(true)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add the bundle")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div
      className="content-container py-6 grid grid-cols-1 small:grid-cols-[minmax(0,560px)_minmax(0,1fr)] gap-8 small:gap-16"
      data-testid="configurator-container"
    >
      <StudioStage plant={plant} pot={pot} />

      <div className="flex flex-col gap-y-6 small:py-4 small:max-w-[440px]">
        <div>
          <Heading level="h1" className="text-3xl leading-10 text-ui-fg-base">
            {plant.title}
          </Heading>
          <Text className="text-medium text-ui-fg-subtle italic">
            {plant.plant_meta.name_botanical}
          </Text>
          <Text className="mt-1 text-medium text-ui-fg-subtle">
            in {pot.title}
          </Text>
        </div>

        <OptionSlider
          label="Plant"
          options={plants.map((p) => ({
            id: p.id,
            title: p.title,
            thumbnail: p.thumbnail,
            unavailable: !fits(p.id, pot.id),
          }))}
          selectedId={plant.id}
          onSelect={select(setPlantId)}
          data-testid="configurator-plant-slider"
        />

        <OptionSlider
          label="Pot"
          options={pots.map((p) => ({
            id: p.id,
            title: p.title,
            thumbnail: p.thumbnail,
            unavailable: !fits(plant.id, p.id),
          }))}
          selectedId={pot.id}
          onSelect={select(setPotId)}
          data-testid="configurator-pot-slider"
        />

        <Divider />

        <div className="flex flex-col gap-y-2">
          <div data-testid="configurator-fit">
            {pairFits ? (
              <Badge color="green">This pot fits this plant</Badge>
            ) : (
              <Badge color="red">This pot does not fit this plant</Badge>
            )}
          </div>
          <Text className="text-small-regular text-ui-fg-subtle">
            Pot opening {pot.pot_meta.inner_diameter_cm} cm, nursery pot{" "}
            {plant.plant_meta.nursery_pot_diameter_cm} cm.
          </Text>
        </div>

        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-small-regular">
          <dt className="text-ui-fg-subtle">Height</dt>
          <dd>{plant.plant_meta.real_height_cm} cm</dd>
          <dt className="text-ui-fg-subtle">Light</dt>
          <dd>{plant.plant_meta.light}</dd>
          <dt className="text-ui-fg-subtle">Water</dt>
          <dd>Every {plant.plant_meta.water_frequency_days} days</dd>
          <dt className="text-ui-fg-subtle">Toxicity</dt>
          <dd>{plant.plant_meta.toxicity}</dd>
          <dt className="text-ui-fg-subtle">Pot</dt>
          <dd className="flex items-center gap-x-2">
            <span
              className="inline-block h-3 w-3 rounded-full border border-black/10"
              style={{ backgroundColor: pot.pot_meta.color_hex }}
            />
            {pot.pot_meta.material}, {pot.pot_meta.height_cm} cm tall
            {pot.pot_meta.drainage ? ", drainage" : ""}
            {pot.pot_meta.saucer ? ", saucer" : ""}
          </dd>
        </dl>

        <Text className="text-small-regular text-ui-fg-subtle">
          {plant.plant_meta.care_notes_en}
        </Text>

        <Button
          onClick={handleAddBundle}
          disabled={!pairFits || !plantVariant || !potVariant}
          isLoading={isAdding}
          className="w-full h-10"
          data-testid="configurator-add-button"
        >
          {pairFits ? "Add plant + pot to cart" : "Choose a pot that fits"}
        </Button>

        {added && (
          <Text
            className="text-small-regular text-ui-fg-subtle"
            data-testid="configurator-added"
          >
            Added to your cart.
          </Text>
        )}
        {error && (
          <Text
            className="text-small-regular text-rose-500"
            data-testid="configurator-error"
          >
            {error}
          </Text>
        )}
      </div>
    </div>
  )
}

export default ConfiguratorTemplate

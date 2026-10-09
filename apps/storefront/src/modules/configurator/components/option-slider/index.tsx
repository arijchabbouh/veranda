"use client"

import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"

type SliderOption = {
  id: string
  title: string
  thumbnail: string | null
  // marks an option that cannot be combined with the other selection
  unavailable?: boolean
}

type OptionSliderProps = {
  label: string
  options: SliderOption[]
  selectedId: string
  onSelect: (id: string) => void
  "data-testid"?: string
}

const OptionSlider = ({
  label,
  options,
  selectedId,
  onSelect,
  "data-testid": dataTestId,
}: OptionSliderProps) => {
  const index = options.findIndex((option) => option.id === selectedId)
  const selected = options[index]

  const step = (delta: number) => {
    const next = (index + delta + options.length) % options.length
    onSelect(options[next].id)
  }

  return (
    <div className="flex flex-col gap-y-3" data-testid={dataTestId}>
      <div className="flex items-center justify-between">
        <span className="txt-compact-small text-ui-fg-subtle">{label}</span>
        <span className="txt-compact-small text-ui-fg-muted">
          {index + 1} / {options.length}
        </span>
      </div>
      <div className="flex items-center gap-x-3">
        <button
          onClick={() => step(-1)}
          aria-label={`Previous ${label.toLowerCase()}`}
          className="rounded-full border border-ui-border-base p-2 hover:bg-ui-bg-subtle-hover"
        >
          <ChevronLeft />
        </button>
        <span className="flex-1 text-center txt-compact-large-plus text-ui-fg-base">
          {selected?.title}
        </span>
        <button
          onClick={() => step(1)}
          aria-label={`Next ${label.toLowerCase()}`}
          className="rounded-full border border-ui-border-base p-2 hover:bg-ui-bg-subtle-hover"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            title={option.title}
            aria-pressed={option.id === selectedId}
            className={clx(
              "relative aspect-square rounded-rounded border bg-ui-bg-subtle p-2 transition-colors",
              option.id === selectedId
                ? "border-ui-border-interactive"
                : "border-ui-border-base hover:border-ui-border-strong",
              option.unavailable && "opacity-40"
            )}
          >
            {option.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={option.thumbnail}
                alt={option.title}
                className="h-full w-full object-contain"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default OptionSlider

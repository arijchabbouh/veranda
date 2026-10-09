import fs from "fs"
import path from "path"
import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  MedusaError,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  uploadFilesWorkflow,
} from "@medusajs/medusa/core-flows"
import { ASSET_META_MODULE } from "../modules/asset-meta"
import { PLANT_META_MODULE } from "../modules/plant-meta"
import { POT_META_MODULE } from "../modules/pot-meta"

// Seeds the plant + pot catalogue used by the storefront configurator.
// Run from apps/backend: <pm> exec medusa exec ./src/scripts/seed-configurator.ts
//
// The cutouts live in the storefront's public folder; they are uploaded through
// the file module so product images are served like any other Medusa image.
// Safe to re-run: products whose handle already exists are skipped.

const CUTOUT_DIR = path.resolve(
  process.cwd(),
  "../storefront/public/configurator"
)

// Anchors are percentages of the cutout image, measured from its top-left.
// The subject is horizontally centred in every cutout, so no x anchor is stored.
//  - pot:   rimYPct = soil line, rimWidthPct = inner opening, baseYPct = where it sits
//  - plant: baseYPct = where the stem meets the soil, rimWidthPct = stem base width
type Anchors = { rimYPct: number; rimWidthPct: number; baseYPct: number }

type PlantSeed = {
  handle: string
  title: string
  subtitle: string
  description: string
  file: string
  price: number
  anchors: Anchors
  meta: {
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
}

type PotSeed = {
  handle: string
  title: string
  description: string
  file: string
  price: number
  origin_country: string
  weight: number
  anchors: Anchors
  meta: {
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
}

const PLANTS: PlantSeed[] = [
  {
    handle: "dwarf-mediterranean-olive",
    title: "Dwarf Mediterranean Olive",
    subtitle:
      "Artisanal aged woody trunk crowned with soft silvery-sage foliage.",
    description:
      "Pruned in the classic Tuscan bonsai standard, this dwarf olive tree features a deeply textured cork bark trunk and delicate dual-toned leaves that shimmer silvery-grey in directional light.",
    file: "plants/olive.png",
    price: 130,
    anchors: { rimYPct: 99, rimWidthPct: 35, baseYPct: 99 },
    meta: {
      name_botanical: "Olea europaea",
      name_ar: "زيتون قزم متوسطي",
      growth_habit: "tree",
      light: "Direct bright sunlight (6+ hours daily)",
      water_frequency_days: 9,
      toxicity: "non-toxic",
      real_height_cm: 75,
      nursery_pot_diameter_cm: 24,
      care_notes_en:
        "Place by a south- or west-facing window. Let the soil dry between waterings; sensitive to standing root water.",
      care_notes_ar:
        "ضعه قرب نافذة جنوبية أو غربية. اترك التربة تجف بين الريّات؛ حساس للماء الراكد عند الجذور.",
    },
  },
  {
    handle: "monstera-deliciosa",
    title: "Monstera Deliciosa",
    subtitle:
      "Iconic Swiss Cheese architectural foliage with perforated fenestrations.",
    description:
      "Celebrated for its broad, sculptured split leaves, the Monstera Deliciosa introduces instant organic drama to minimalist interiors.",
    file: "plants/monstera.png",
    price: 85,
    anchors: { rimYPct: 97, rimWidthPct: 8, baseYPct: 97 },
    meta: {
      name_botanical: "Monstera deliciosa",
      name_ar: "مونستيرا ديليسيوسا",
      growth_habit: "climbing",
      light: "Bright, indirect ambient sunlight",
      water_frequency_days: 8,
      toxicity: "toxic to cats and dogs",
      real_height_cm: 95,
      nursery_pot_diameter_cm: 24,
      care_notes_en:
        "Wipe foliage monthly with a damp cloth. Rotate 90 degrees every month for balanced growth. Prefers a well-draining, airy aroid substrate.",
      care_notes_ar:
        "امسح الأوراق شهرياً بقطعة قماش مبللة. أدر النبتة ربع دورة كل شهر لنمو متوازن. تفضّل تربة خفيفة جيدة التصريف.",
    },
  },
  {
    handle: "ficus-lyrata",
    title: "Ficus Lyrata",
    subtitle:
      "Majestic upright standard with oversized violin-shaped leathery leaves.",
    description:
      "The Fiddle Leaf Fig boasts towering vertical presence and scalloped emerald leaves. Pruned to a single woody trunk for a clean silhouette.",
    file: "plants/ficus.png",
    price: 110,
    anchors: { rimYPct: 99, rimWidthPct: 4, baseYPct: 99 },
    meta: {
      name_botanical: "Ficus lyrata",
      name_ar: "تين كماني الأوراق",
      growth_habit: "upright tree",
      light: "High, bright filtered sunlight",
      water_frequency_days: 12,
      toxicity: "toxic to cats and dogs",
      real_height_cm: 140,
      nursery_pot_diameter_cm: 27,
      care_notes_en:
        "Keep in consistent indirect light, away from drafty vents. Let the top 5 cm of soil dry out completely between soakings.",
      care_notes_ar:
        "ضعها في ضوء غير مباشر ثابت بعيداً عن تيارات الهواء. اترك أعلى 5 سم من التربة تجف تماماً بين الريّات.",
    },
  },
  {
    handle: "sansevieria-laurentii",
    title: "Sansevieria Laurentii",
    subtitle:
      "Crisp upright sword leaves with prominent gold margins and marble banding.",
    description:
      "The Snake Plant delivers striking verticality without spreading sideways, making it a natural choice for corners and consoles.",
    file: "plants/snake-plant.png",
    price: 65,
    anchors: { rimYPct: 97, rimWidthPct: 17, baseYPct: 97 },
    meta: {
      name_botanical: "Dracaena trifasciata",
      name_ar: "سانسيفيريا (نبتة الثعبان)",
      growth_habit: "upright rosette",
      light: "Adaptable (low light to partial direct sun)",
      water_frequency_days: 17,
      toxicity: "toxic to cats and dogs",
      real_height_cm: 85,
      nursery_pot_diameter_cm: 21,
      care_notes_en:
        "Water sparingly; the root ball prefers staying dry. Never let water stand in the central rosette.",
      care_notes_ar:
        "اسقها باعتدال؛ الجذور تفضّل الجفاف على الرطوبة الزائدة. لا تترك الماء يتجمع في قلب النبتة.",
    },
  },
]

const POTS: PotSeed[] = [
  {
    handle: "ribbed-alabaster-glaze",
    title: "Ribbed Alabaster Glaze",
    description:
      "Satin-touch porcelain with gentle undulating ribs that diffuse highlights softly across its circumference.",
    file: "pots/ribbed-alabaster.png",
    price: 64,
    origin_country: "fr",
    weight: 5800,
    anchors: { rimYPct: 12, rimWidthPct: 84, baseYPct: 96 },
    meta: {
      name_en: "Ribbed Alabaster Glaze",
      name_ar: "أصيص مرمري مضلّع",
      material: "Kaolin porcelain with reactive dolomite glaze",
      color_hex: "#EAE6DF",
      finish: "Satin chalk white, soft ribbed",
      inner_diameter_cm: 27,
      height_cm: 26,
      drainage: true,
      saucer: false,
    },
  },
  {
    handle: "fluted-basalt-ceramic",
    title: "Fluted Basalt Ceramic",
    description:
      "Precision vertical fluting creates tactile rhythm and subtle shadow play under directional lighting.",
    file: "pots/basalt-ceramic.png",
    price: 68,
    origin_country: "jp",
    weight: 6200,
    anchors: { rimYPct: 10, rimWidthPct: 86, baseYPct: 97 },
    meta: {
      name_en: "Fluted Basalt Ceramic",
      name_ar: "أصيص بازلتي مخدّد",
      material: "Vitrified high-fire stoneware",
      color_hex: "#252628",
      finish: "Matte anthracite, vertical fluted",
      inner_diameter_cm: 29,
      height_cm: 28,
      drainage: true,
      saucer: false,
    },
  },
  {
    handle: "tuscan-terracotta-cylinder",
    title: "Tuscan Terracotta Cylinder",
    description:
      "Breathes naturally through porous clay walls to regulate root moisture and develop an organic patina over time.",
    file: "pots/terracotta-cylinder.png",
    price: 48,
    origin_country: "it",
    weight: 5400,
    anchors: { rimYPct: 15, rimWidthPct: 80, baseYPct: 96 },
    meta: {
      name_en: "Tuscan Terracotta Cylinder",
      name_ar: "أصيص فخاري توسكاني",
      material: "Natural high-density Impruneta clay",
      color_hex: "#C07D5A",
      finish: "Raw porous earthenware, ochre patina",
      inner_diameter_cm: 27,
      height_cm: 30,
      drainage: true,
      saucer: true,
    },
  },
  {
    handle: "cast-sandstone-taper",
    title: "Cast Sandstone Taper",
    description:
      "Sculptural conical taper with micro-aggregate mineral flecks that grounds large botanicals with weighted stability.",
    file: "pots/sandstone-taper.png",
    price: 74,
    origin_country: "mx",
    weight: 7900,
    anchors: { rimYPct: 15, rimWidthPct: 80, baseYPct: 96 },
    meta: {
      name_en: "Cast Sandstone Taper",
      name_ar: "أصيص حجر رملي مخروطي",
      material: "Sedimentary quartz and fine mineral composite",
      color_hex: "#D6C5A9",
      finish: "Warm dune sand, tactile grain",
      inner_diameter_cm: 26,
      height_cm: 32,
      drainage: true,
      saucer: false,
    },
  },
]

export default async function seedConfigurator({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const plantMetaService: any = container.resolve(PLANT_META_MODULE)
  const potMetaService: any = container.resolve(POT_META_MODULE)
  const assetMetaService: any = container.resolve(ASSET_META_MODULE)

  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id"],
  })
  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["currency_code"],
  })
  const currencies = [
    ...new Set(regions.map((region: any) => region.currency_code as string)),
  ]

  if (!salesChannels.length || !shippingProfiles.length || !currencies.length) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "A sales channel, shipping profile and region are required - run the initial seed first"
    )
  }

  const categoryId = async (name: string, handle: string) => {
    const {
      data: [existing],
    } = await query.graph({
      entity: "product_category",
      fields: ["id"],
      filters: { handle },
    })
    if (existing) {
      return existing.id as string
    }
    const {
      result: [created],
    } = await createProductCategoriesWorkflow(container).run({
      input: { product_categories: [{ name, handle, is_active: true }] },
    })
    return created.id
  }

  const createProduct = async (
    seed: PlantSeed | PotSeed,
    category_id: string,
    extra: Record<string, unknown>
  ) => {
    const {
      data: [existing],
    } = await query.graph({
      entity: "product",
      fields: ["id"],
      filters: { handle: seed.handle },
    })
    if (existing) {
      logger.info(`Skipping ${seed.handle}: already exists`)
      return null
    }

    const {
      result: [file],
    } = await uploadFilesWorkflow(container).run({
      input: {
        files: [
          {
            filename: path.basename(seed.file),
            mimeType: "image/png",
            content: fs
              .readFileSync(path.join(CUTOUT_DIR, seed.file))
              .toString("base64"),
            access: "public",
          },
        ],
      },
    })

    const {
      result: [product],
    } = await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: seed.title,
            handle: seed.handle,
            description: seed.description,
            status: ProductStatus.PUBLISHED,
            category_ids: [category_id],
            shipping_profile_id: shippingProfiles[0].id,
            thumbnail: file.url,
            images: [{ url: file.url }],
            options: [{ title: "Size", values: ["Standard"] }],
            variants: [
              {
                title: "Standard",
                sku: seed.handle.toUpperCase(),
                manage_inventory: false,
                options: { Size: "Standard" },
                prices: currencies.map((currency_code) => ({
                  amount: seed.price,
                  currency_code,
                })),
              },
            ],
            sales_channels: salesChannels.map((channel: any) => ({
              id: channel.id,
            })),
            ...extra,
          },
        ],
      },
    })

    const assetMeta = await assetMetaService.createAssetMetas({
      ...seed.anchors,
      version: 1,
    })
    await link.create({
      [Modules.PRODUCT]: { product_image_id: product.images[0].id },
      [ASSET_META_MODULE]: { asset_meta_id: assetMeta.id },
    })

    logger.info(`Created ${seed.handle}`)
    return product
  }

  const plantsCategoryId = await categoryId("Plants", "plants")
  const potsCategoryId = await categoryId("Pots", "pots")

  for (const seed of PLANTS) {
    const product = await createProduct(seed, plantsCategoryId, {
      subtitle: seed.subtitle,
    })
    if (!product) {
      continue
    }
    const plantMeta = await plantMetaService.createPlantMetas(seed.meta)
    await link.create({
      [Modules.PRODUCT]: { product_id: product.id },
      [PLANT_META_MODULE]: { plant_meta_id: plantMeta.id },
    })
  }

  for (const seed of POTS) {
    const product = await createProduct(seed, potsCategoryId, {
      origin_country: seed.origin_country,
      weight: seed.weight,
      material: seed.meta.material,
    })
    if (!product) {
      continue
    }
    const potMeta = await potMetaService.createPotMetas(seed.meta)
    await link.create({
      [Modules.PRODUCT]: { product_id: product.id },
      [POT_META_MODULE]: { pot_meta_id: potMeta.id },
    })
  }

  logger.info("Finished seeding configurator catalogue.")
}

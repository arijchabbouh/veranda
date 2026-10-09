"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { revalidateTag } from "next/cache"
import { ConfiguratorData } from "types/configurator"
import { getOrSetCart } from "./cart"
import { getAuthHeaders, getCacheTag } from "./cookies"

/**
 * Loads the plants, pots and their fit matrix from the backend's custom
 * /store/plants route. Nothing about the catalogue is hardcoded here.
 */
export const getConfiguratorData = async () => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return await sdk.client.fetch<ConfiguratorData>(`/store/plants`, {
    method: "GET",
    headers,
    cache: "no-store",
  })
}

/**
 * Adds a plant + pot pair to the cart through the backend's
 * add-plantpot-bundle workflow, which re-validates the fit server-side.
 */
export async function addPlantPotBundle({
  plantProductId,
  plantVariantId,
  potProductId,
  potVariantId,
  countryCode,
}: {
  plantProductId: string
  plantVariantId: string
  potProductId: string
  potVariantId: string
  countryCode: string
}) {
  const cart = await getOrSetCart(countryCode)

  if (!cart) {
    throw new Error("Error retrieving or creating cart")
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  await sdk.client
    .fetch(`/store/carts/${cart.id}/plantpot-bundle`, {
      method: "POST",
      headers,
      body: {
        plant_product_id: plantProductId,
        plant_variant_id: plantVariantId,
        pot_product_id: potProductId,
        pot_variant_id: potVariantId,
      },
    })
    .then(async () => {
      const cartCacheTag = await getCacheTag("carts")
      revalidateTag(cartCacheTag)

      const fulfillmentCacheTag = await getCacheTag("fulfillment")
      revalidateTag(fulfillmentCacheTag)
    })
    .catch(medusaError)
}

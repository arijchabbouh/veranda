import { getConfiguratorData } from "@lib/data/configurator"
import ConfiguratorTemplate from "@modules/configurator/templates"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Configurator",
  description: "Pair a plant with a pot that fits it.",
}

export default async function ConfiguratorPage() {
  const data = await getConfiguratorData()

  return <ConfiguratorTemplate data={data} />
}

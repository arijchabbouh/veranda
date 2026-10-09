export const POT_FIT_TOLERANCE_CM = 5

export function potFitsPlant(
  potInnerDiameterCm: number,
  plantNurseryPotDiameterCm: number
) {
  return (
    potInnerDiameterCm >= plantNurseryPotDiameterCm &&
    potInnerDiameterCm <= plantNurseryPotDiameterCm + POT_FIT_TOLERANCE_CM
  )
}

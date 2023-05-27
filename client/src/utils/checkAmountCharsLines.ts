import { IAlternative } from '../interfaces/Quiz'

export const checkAmountCharsLines = (
  createdAlterantives: IAlternative[] | null
) => {
  if (!createdAlterantives) {
    throw new Error(
      'Está sendo passado um valor nulo para checkAmountCharsLines'
    )
  }
  const maxCaracteresInLine = 30
  const condition = !!createdAlterantives
    .map(
      (alt) =>
        alt.value
          .split('\n')
          .filter((altV) => altV.length > maxCaracteresInLine).length
    )
    .find(Boolean)
  return condition
}

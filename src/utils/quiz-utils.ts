export const randomNumber = (maxNumber: number, currentNumber?: number): number => {
  let newNumber = Math.floor(Math.random() * maxNumber)
  if (currentNumber) {
    while (newNumber === currentNumber) {
      newNumber = Math.floor(Math.random() * maxNumber)
    }
  }
  return newNumber
}

export const normalizeString = (string: string|null): string => {
  if (!string) {
    return ''
  }
  const stringWithoutAccent = string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  return stringWithoutAccent.replace('-', ' ').toLowerCase()
}

export const shuffleArray = (array:Array<any>): Array<any> => {
  const copyArray = [...array]
  for (let i = copyArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copyArray[i]
    copyArray[i] = copyArray[j]
    copyArray[j] = temp
  }
  return copyArray
}

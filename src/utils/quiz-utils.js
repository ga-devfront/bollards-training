const randomNumber = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber)
}
export { randomNumber }

const normalizeString = (string) => {
  if (typeof string !== 'string') {
    return ''
  }
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}
export { normalizeString }

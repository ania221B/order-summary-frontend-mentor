/**
 * Capitalizes text
 * @param {String} text string of text to be capitalized
 * @returns {String} capitalized string of text
 */
export function capitalizeText (text) {
  if (text === '') return ''

  return text
    .replace(/\s+/g, ' ')
    .replace(/\s*-\s*/g, '-')
    .split(' ')
    .map(part =>
      part
        .split('-')
        .map(
          part => part.slice(0, 1).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join('-')
    )
    .join(' ')
}

/**
 * Checks if date is grater than current month
 * @param {String} date hyphenated date to check
 * @returns {Boolean}
 */
export function checkDate (date) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const [yearToCheck, monthToCheck] = date
    .split('-')
    .map(item => parseInt(item))

  return (
    yearToCheck > currentYear ||
    (yearToCheck === currentYear && monthToCheck >= currentMonth)
  )
}

/**
 * Converts hyphenated lowercase text to camelCase text
 * @param {String} text string to convert
 * @returns {String} converted string
 */
export function makeCamelCaseHyphenatedLowercase (text) {
  if (text === '') return ''
  if (!/^[a-zA-Z]+$/.test(text)) {
    throw new Error('Invalid input: only alphabetic characters are allowed')
  }

  return text
    .split(/(?=[A-Z])/)
    .map(item => item.toLowerCase())
    .join('-')
}

/**
 * Converts camelCase text to hyphenated lowercase text
 * @param {String} text string to convert
 * @returns {String} converted string
 */
export function makeHyphenatedLowercaseCamelCase (text) {
  if (text === '') return ''
  if (!/^[a-z-]+$/.test(text)) {
    throw new Error(
      'Invalid input: only lowercase alphabetic characters and hyphens are allowed'
    )
  }

  return text
    .split('-')
    .map((item, index) => {
      if (index === 0) {
        return item.toLowerCase()
      }
      return item.substring(0, 1).toUpperCase() + item.substring(1)
    })
    .join('')
}

/**
 * Checks if the value is null
 * @param {*} currentValue any value to check
 * @returns {Boolean} true if value is null, false if otherwise
 */
export function isNull (currentValue) {
  return currentValue === null
}

/**
 * Group card number digits into groups of four
 * @param {String} cardNumber card number to format
 * @returns {String} grouped string
 */
export function formatCardNumber (cardNumber) {
  return [...cardNumber]
    .reduce((groups, item) => {
      const lastGroup = groups[groups.length - 1]
      if (!lastGroup || lastGroup.length === 4) {
        groups.push([item])
      } else {
        lastGroup.push(item)
      }
      return groups
    }, [])
    .map(item => item.join(''))
    .join(' ')
}

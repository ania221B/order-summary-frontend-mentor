import {
  capitalizeText,
  checkDate,
  makeCamelCaseHyphenatedLowercase,
  makeHyphenatedLowercaseCamelCase,
  isNull,
  formatCardNumber
} from '../js/utils.js'

describe('capitalizeText', () => {
  test('capitalizes first letter of a lowercase string', () => {
    expect(capitalizeText('jean')).toBe('Jean')
  })
  test('capitalizes first letter of a upppercase string', () => {
    expect(capitalizeText('Jean')).toBe('Jean')
  })
  test('capitalizes both parts of a hyphenated string', () => {
    expect(capitalizeText('jean-paul')).toBe('Jean-Paul')
  })
  test('capitalizes both parts of a hyphenated string with mixed case', () => {
    expect(capitalizeText('jean-Paul')).toBe('Jean-Paul')
  })
  test('capitalizes both parts of a string containing a space', () => {
    expect(capitalizeText('jean bernard')).toBe('Jean Bernard')
  })
  test('capitalizes both parts of a string containing a space when mixed case', () => {
    expect(capitalizeText('Jean bernard')).toBe('Jean Bernard')
  })
  test('capitalizes all parts of a hyphenated string containing a space', () => {
    expect(capitalizeText('jean-paul bernard')).toBe('Jean-Paul Bernard')
  })
  test('capitalizes all parts of a hyphenated string containing a space when mixed case', () => {
    expect(capitalizeText('Jean-paul Bernard')).toBe('Jean-Paul Bernard')
  })
  test('returns empty string when input is an empty string', () => {
    expect(capitalizeText('')).toBe('')
  })
  test('capitalizes words with multiple spaces between them', () => {
    expect(capitalizeText('jean    paul')).toBe('Jean Paul')
  })
  test('capitalizes words with unnecessary spaces around hyphens', () => {
    expect(capitalizeText('jean - paul')).toBe('Jean-Paul')
  })
  test('handles special characters correctly', () => {
    expect(capitalizeText('jean-paul bernard!')).toBe('Jean-Paul Bernard!')
  })
  test('handles single character words correctly', () => {
    expect(capitalizeText('a. james')).toBe('A. James')
  })
})

describe('checkDate', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2025, 11, 7))
  })

  afterAll(() => {
    jest.useRealTimers()
  })
  function generateDate (yearOffset = 0, monthOffset = 0) {
    const currentDate = new Date()
    let month = currentDate.getMonth() + 1 + monthOffset

    if (month > 12) {
      mont -= 12
      yearOffset++
    } else if (month < 1) {
      month += 12
      yearOffset--
    }
    const year = currentDate.getFullYear() + yearOffset

    return `${year}-${month}`
  }

  test('returns true for a future date', () => {
    const futureDate = generateDate(1)
    expect(checkDate(futureDate)).toBe(true)
  })
  test('returns false for a past date in current year', () => {
    const pastDate = generateDate(0, -3)
    expect(checkDate(pastDate)).toBe(false)
  })
  test('returns true for current date', () => {
    const currentDate = generateDate()
    expect(checkDate(currentDate)).toBe(true)
  })
  test('returns false for date from last year', () => {
    const lastYearDate = generateDate(-1)
    expect(checkDate(lastYearDate)).toBe(false)
  })
})

describe('makeCamelCaseHyphenatedLowercase', () => {
  test('handles an empty string', () => {
    expect(makeCamelCaseHyphenatedLowercase('')).toBe('')
  })
  test('handles one word correctly', () => {
    expect(makeCamelCaseHyphenatedLowercase('card')).toBe('card')
  })
  test('handles string without any capital letters', () => {
    expect(makeCamelCaseHyphenatedLowercase('expirydate')).toBe('expirydate')
  })
  test('handles string with multiple capital letters', () => {
    expect(makeCamelCaseHyphenatedLowercase('APIResponseData')).toBe(
      'a-p-i-response-data'
    )
  })
  test('throws error for text containing numbers', () => {
    expect(() => makeCamelCaseHyphenatedLowercase('expiry123Date')).toThrow(
      'Invalid input: only alphabetic characters are allowed'
    )
  })
  test('throws error for text containing special characters', () => {
    expect(() => makeCamelCaseHyphenatedLowercase('expiry!Date')).toThrow(
      'Invalid input: only alphabetic characters are allowed'
    )
  })
  test('throws error for text containing hyphens', () => {
    expect(() => makeCamelCaseHyphenatedLowercase('expiry-Date')).toThrow(
      'Invalid input: only alphabetic characters are allowed'
    )
  })
  test('converts camelCase text to hyphenated lowercase text', () => {
    expect(makeCamelCaseHyphenatedLowercase('cardExpiryDate')).toBe(
      'card-expiry-date'
    )
  })
})

describe('makeHyphenatedLowercaseCamelCase', () => {
  test('handles an empty string', () => {
    expect(makeHyphenatedLowercaseCamelCase('')).toBe('')
  })
  test('handles one word correctly', () => {
    expect(makeHyphenatedLowercaseCamelCase('card')).toBe('card')
  })
  test('handles string without any hyphens letters', () => {
    expect(makeHyphenatedLowercaseCamelCase('expirydate')).toBe('expirydate')
  })
  test('handles string with multiple capital letters', () => {
    expect(makeHyphenatedLowercaseCamelCase('a-p-i-response-data')).toBe(
      'aPIResponseData'
    )
  })
  test('converts hyphenated text to camalCase text', () => {
    expect(makeHyphenatedLowercaseCamelCase('card-expiry-date')).toBe(
      'cardExpiryDate'
    )
  })
  test('throws error for hyphenated text starting with capital letter to camalCase text', () => {
    expect(() => makeHyphenatedLowercaseCamelCase('Card-expiry-date')).toThrow(
      'Invalid input: only lowercase alphabetic characters and hyphens are allowed'
    )
  })
  test('throws error for hyphenated textcontaining numbers', () => {
    expect(() =>
      makeHyphenatedLowercaseCamelCase('card- 123-expiry-date')
    ).toThrow(
      'Invalid input: only lowercase alphabetic characters and hyphens are allowed'
    )
  })
  test('throws error for hyphenated text containing special characters', () => {
    expect(() => makeHyphenatedLowercaseCamelCase('card!expiry')).toThrow(
      'Invalid input: only lowercase alphabetic characters and hyphens are allowed'
    )
  })
})

describe(isNull, () => {
  test('returns false when value is a string', () => {
    expect(isNull('Please provide name on card')).toBe(false)
  })
  test('returns false when value is an empty string', () => {
    expect(isNull('')).toBe(false)
  })
  test('returns false when value is a number', () => {
    expect(isNull(4)).toBe(false)
  })
  test('returns false when value is undefined', () => {
    expect(isNull(undefined)).toBe(false)
  })
  test('returns false when value is a boolean', () => {
    expect(isNull(true)).toBe(false)
  })
  test('returns false when value is an array', () => {
    expect(isNull(['card', 'number'])).toBe(false)
  })
  test('returns false when value is an object', () => {
    expect(isNull({ cardNumber: 1236547899632 })).toBe(false)
  })
  test('returns true when value is null', () => {
    expect(isNull(null)).toBe(true)
  })
})

describe('formatCardNumber', () => {
  test('handles numbers with less than 4 digits', () => {
    expect(formatCardNumber('123')).toBe('123')
  })
  test('handles numbers when number of digits is not divisible by 4', () => {
    expect(formatCardNumber('123456')).toBe('1234 56')
  })
})

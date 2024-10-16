const sections = document.querySelectorAll('.section')
const subscriptions = document.querySelector('.subscriptions')
const confirmation = document.querySelector('.confirmation')
const cancellation = document.querySelector('.cancellation')
const payment = document.querySelector('.payment')
const thankYou = document.querySelector('.thank-you')
const form = payment.querySelector('.payment__form')

/**
 * Capitalizes text
 * @param {String} text string of text to be capitalized
 * @returns {String} capitalized string of text
 */
function capitalizeText (text) {
  const text1 = text.split(' ')

  const text2 = text1.map(item => {
    if (item.includes('-')) {
      return item
        .split('-')
        .map(item => item.substring(0, 1).toUpperCase() + item.substring(1))
        .join('-')
    }
    return item
  })

  return text2
    .map(item => item.substring(0, 1).toUpperCase() + item.substring(1))
    .join(' ')
}
/**
 * Gets the type and price of the selected text
 * @param {HTMLElement} button 'subscribe' button clicked by the user
 * @returns {Object} object with details of the plan selected by user
 */
function getSelectedPlan (button) {
  const cardContent = button.parentElement
  const planType = cardContent.querySelector('.jsPlanType').textContent.trim()
  const planPrice = cardContent.querySelector('.jsPrice').textContent.trim()

  return {
    type: capitalizeText(planType),
    price: planPrice
  }
}
/**
 * Creates HTMLElement with plan details and inserts it into DOM
 * @param {Object} selectedPlan object with type and price selected by the user
 */
function createPlanDetails (selectedPlan) {
  const confirmationCard = confirmation.querySelector('.confirmation-card')
  const { type, price } = selectedPlan
  const planInfo = document.createElement('div')
  planInfo.classList.add('plan__details')
  planInfo.innerHTML = `
            <h3 class="h3">${type} Plan</h3>
            <p>${price}</p>`

  const plan = confirmationCard.querySelector('.plan')
  const referenceButton = plan.querySelector('.jsChangeBtn')

  const existingPlan = plan.querySelector('.plan__details')

  if (existingPlan) {
    plan.removeChild(existingPlan)
  }

  plan.insertBefore(planInfo, referenceButton)
}

/**
 * Displays appropriate screen depending on button clicked by user
 * @param {HTMLElement} button button clicled by user
 */
function switchScreen (button) {
  if (
    button.classList.contains('jsOrderBtn') &&
    button.closest('.section').classList.contains('form-invalid')
  ) {
    document.body.removeAttribute('data-state')
  } else if (
    button.classList.contains('jsOrderBtn') &&
    button.closest('.section').classList.contains('form-valid')
  ) {
    document.body.setAttribute('data-state', 'hide-screen')
  } else {
    document.body.setAttribute('data-state', 'hide-screen')
  }

  document.body.addEventListener('animationend', e => {
    if (e.animationName === 'hideScreen') {
      sections.forEach(section => section.setAttribute('hidden', true))

      if (button.classList.contains('jsSubscribeBtn')) {
        confirmation.removeAttribute('hidden')
      }
      if (button.classList.contains('jsChangeBtn')) {
        subscriptions.removeAttribute('hidden')
      }

      if (button.classList.contains('jsPaymentBtn')) {
        payment.removeAttribute('hidden')
      }

      if (button.classList.contains('jsCancelBtn')) {
        cancellation.removeAttribute('hidden')
        if (button.closest('.section').classList.contains('payment')) {
          form.querySelectorAll('input').forEach(input => {
            clearError(input)
          })

          resetForm()
        }
      }

      if (button.classList.contains('jsHomeBtn')) {
        subscriptions.removeAttribute('hidden')
      }

      if (
        button.classList.contains('jsOrderBtn') &&
        button.closest('.section').classList.contains('form-valid')
      ) {
        const time = getComputedStyle(
          document.body,
          '::before'
        ).animationDuration
        thankYou.removeAttribute('hidden')

        setTimeout(() => {
          form.querySelectorAll('input').forEach(input => {
            clearError(input)
          })

          resetForm()
        }, time)
      } else if (
        button.classList.contains('jsOrderBtn') &&
        button.closest('.section').classList.contains('form-invalid')
      ) {
        payment.removeAttribute('hidden')
      }

      document.body.setAttribute('data-state', 'reveal-screen')
    }

    if (e.animationName === 'revealScreen') {
      document.body.removeAttribute('data-state')
    }
  })
}

/**
 * Sets 'min' and 'value' attributes for card expiry date input
 */
function setMinDate () {
  const expiryInput = form.querySelector('#card-expiry-date')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const formattedDate = `${currentYear}-${currentMonth}`

  expiryInput.setAttribute('min', `${formattedDate}`)
  expiryInput.setAttribute('value', `${formattedDate}`)
}

/**
 * Sets attribute to indicate that input has been validated and is valid
 * @param {HTMLElement} targetInput input to mark
 */
function markAsValid (targetInput) {
  targetInput.setAttribute('data-valid', 'true')
}
/**
 * Sets attribute to indicate that input has been validated and is invalid
 * @param {HTMLElement} targetInput input to mark
 */
function markAsInvalid (targetInput) {
  targetInput.setAttribute('data-valid', 'false')
}
/**
 * Checks if the input has already been validated
 * @param {HTMLElement} targetInput input to check
 */
function checkValidity (targetInput) {
  return targetInput.getAttribute('data-valid') === 'true'
}

/**
 * Checks the existence and length of value in input field
 * @param {HTMLElement} targetInput input field to check
 * @param {Number} min minimum length value
 * @param {Number} max maximum length value
 * @returns {String} error message if checks aren't passed or null if otherwise
 */
function checkValue (targetInput, min, max) {
  const targetInputWrapper = targetInput.parentElement
  const targetLabel = targetInputWrapper.querySelector('label').textContent
  const value = targetInput.value.trim().split(' ').join('')
  if (!value) {
    return `Please provide ${targetLabel}`
  } else if (value.length < min) {
    return `${targetLabel} must have at least ${min} digits`
  } else if (value.length > max) {
    return `${targetLabel} must have at most ${max} digits`
  } else {
    return null
  }
}

/**
 * Checks if date is grater than current month
 * @param {String} date hyphenated date to check
 * @returns {Boolean}
 */
function checkDate (date) {
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
 * Checks card number value
 * @returns {String} error messsage or null
 */
function validateCardNumber () {
  const cardNumber = form.querySelector('#card-number')
  const isLengthOK = checkValue(cardNumber, 13, 19)

  if (isLengthOK) {
    return isLengthOK
  }
  return null
}

/**
 * Checks card holder name value
 * @returns {String} error messsage or null
 */
function validateHolderName () {
  const namePattern = /^[\p{L}-]+\s[\p{L}\-\s']{2,}$/u
  const cardHolderName = form.querySelector('#card-holder-name').value.trim()
  if (!cardHolderName) {
    return 'Please provide name on card'
  } else if (!cardHolderName.match(namePattern)) {
    return 'Use letters & hyphens for name & surname'
  }
  return null
}

/**
 * Checks card expiry date value
 * @returns {String} error messsage or null
 */
function validateExpiryDate () {
  const cardExpiryDate = form.querySelector('#card-expiry-date').value.trim()
  const isDateFuture = checkDate(cardExpiryDate)
  if (!cardExpiryDate) {
    return 'Please provide card expiry date'
  }
  if (!isDateFuture) {
    return 'Must be current month or later'
  }
  return null
}

/**
 * Checks card verification code value
 * @returns {String} error messsage or null
 */
function validateCardCode () {
  const cardCode = form.querySelector('#card-code')
  const cardCodeValue = cardCode.value.trim()
  const cardNumberValue = form.querySelector('#card-number').value.trim()
  const isLengthOK = checkValue(cardCode, 3, 4)

  if (isLengthOK) {
    return isLengthOK
  }
  if (
    cardNumberValue.substring(0, 2) === '34' ||
    cardNumberValue.substring(0, 2) === '37'
  ) {
    if (cardCodeValue.length < 4) {
      return 'Card code must be 4 digits'
    }
  }
  return null
}

/**
 * Checks if form inputs were correctly filled in
 * @returns {Object} errors object containing error messages for invalid inputs
 */
function validateForm () {
  const errors = {
    cardNumber: validateCardNumber(),
    cardHolderName: validateHolderName(),
    cardExpiryDate: validateExpiryDate(),
    cardCode: validateCardCode()
  }
  return errors
}

/**
 * Resets form and removes any classes indicating its validity
 */
function resetForm () {
  form.closest('.section').classList.remove('form-valid')
  form.closest('.section').classList.remove('form-invalid')
  form.reset()
}

/**
 * Creates error icon and text for incorrectly filled in input and adds an error class
 * @param {HTMLElement} targetControl form input that was incorrectly filled in
 * @param {String} errorMessage error message for incorrectly fille in form input
 */
function createError (targetControl, errorMessage) {
  const targetControlWrapper = targetControl.parentElement
  const targetError = targetControlWrapper.querySelector('.error-message')
  targetControlWrapper.classList.add('error')
  targetError.innerHTML = `<svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        fill-rule='evenodd'
        d='M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75c-1.856 0-3.605-.471-5.13-1.3l-4.233.787a.75.75 0 0 1-.874-.874l.788-4.233A10.7 10.7 0 0 1 1.25 12M12 7.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75m.567 9.251a.75.75 0 1 0-1.114-1.004l-.01.011a.75.75 0 1 0 1.114 1.004z'
        clip-rule='evenodd'
      />
    </svg>
    <p>${errorMessage}</p>`
}

/**
 * Removes error icon, text and class
 * @param {HTMLElement} targetControl active form input
 */
function clearError (targetControl) {
  const targetControlWrapper = targetControl.parentElement
  const targetError = targetControlWrapper.querySelector('.error-message')
  if (targetError.textContent) {
    targetError.innerHTML = ''
    targetControlWrapper.classList.remove('error')
  }
}

/**
 * Converts hyphenated lowercase text to camelCase text
 * @param {String} text string to convert
 * @returns {String} converted string
 */
function makeCamelCaseHyphenatedLowercase (text) {
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
function makeHyphenatedLowercaseCamelCase (text) {
  return text
    .split('-')
    .map((item, index) => {
      if (index === 0) {
        return item
      }
      return item.substring(0, 1).toUpperCase() + item.substring(1)
    })
    .join('')
}

/**
 * Checks if string is an empty one
 * @param {String} currentValue string to check
 * @returns {Boolean}
 */
function isNull (currentValue) {
  return currentValue === null
}

/**
 * Group card number digits into groups of four
 * @param {String} cardNumber card number to format
 * @returns {String} grouped string
 */
function formatCardNumber (cardNumber) {
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

window.addEventListener('load', e => {
  setMinDate()
})
document.body.addEventListener('click', e => {
  if (!e.target.closest('.jsBtn')) return

  if (e.target.closest('.jsSubscribeBtn')) {
    const selectedPlan = getSelectedPlan(e.target)
    createPlanDetails(selectedPlan)
  }

  if (e.target.closest('.jsOrderBtn')) {
    e.preventDefault()
    const parentSection = form.closest('.section')
    const existingErrors = validateForm()
    const isFormValid = Object.values(existingErrors).every(isNull)

    if (isFormValid) {
      parentSection.classList.remove('form-invalid')
      parentSection.classList.add('form-valid')
    } else {
      const errorArray = Object.entries(existingErrors)

      parentSection.classList.remove('form-valid')
      parentSection.classList.add('form-invalid')

      errorArray.forEach(item => {
        const [input, value] = item
        if (value !== null) {
          const targetInput = form.querySelector(
            `#${makeCamelCaseHyphenatedLowercase(input)}`
          )
          markAsInvalid(targetInput)
          createError(targetInput, value)
        }
      })
    }
  }

  switchScreen(e.target)
})

form.addEventListener('input', e => {
  if (!e.target.closest('input')) return

  const isInputValid = checkValidity(e.target)

  if (isInputValid) return

  let error = ''
  const inputName = makeHyphenatedLowercaseCamelCase(e.target.id)

  if (inputName === 'cardNumber') {
    error = validateCardNumber()
  }
  if (inputName === 'cardHolderName') {
    error = validateHolderName()
  }
  if (inputName === 'cardExpiryDate') {
    error = validateExpiryDate()
  }
  if (inputName === 'cardCode') {
    error = validateCardCode()
  }

  if (!error) {
    clearError(e.target)
    markAsValid(e.target)
  }
})

form.addEventListener('change', e => {
  if (!e.target.closest('input')) return

  if (e.target.closest('#card-expiry-date')) {
    const isInputValid = checkValidity(e.target)
    if (isInputValid) return

    const error = validateCardCode()

    if (!error) {
      clearError(e.target)
      markAsValid(e.target)
    }
  }

  if (e.target.closest('#card-holder-name')) {
    e.target.value = capitalizeText(e.target.value)
  }

  if (e.target.closest('#card-number')) {
    e.target.value = formatCardNumber(e.target.value)
  }
})

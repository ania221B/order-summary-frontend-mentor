import {
  capitalizeText,
  checkDate,
  isNull,
  makeCamelCaseHyphenatedLowercase,
  makeHyphenatedLowercaseCamelCase,
  formatCardNumber
} from './utils.js'

/**
 * Initializes DOM variables
 * @returns {Object} object with all necessary DOM elements
 */
export function initDOMElements () {
  const sections = Array.from(document.querySelectorAll('.section'))
  const subscriptions = document.querySelector('.subscriptions')
  const confirmation = document.querySelector('.confirmation')
  const cancellation = document.querySelector('.cancellation')
  const payment = document.querySelector('.payment')
  const thankYou = document.querySelector('.thank-you')
  const form = document.querySelector('.payment__form')

  return {
    sections,
    subscriptions,
    confirmation,
    cancellation,
    payment,
    thankYou,
    form
  }
}

/**
 * Gets the type and price of the selected text
 * @param {HTMLElement} button 'subscribe' button clicked by the user
 * @returns {Object} object with details of the plan selected by user
 */
export function getSelectedPlan (button) {
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
export function createPlanDetails (selectedPlan) {
  const { confirmation } = initDOMElements()
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
export function switchScreen (button) {
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
      const {
        sections,
        confirmation,
        subscriptions,
        payment,
        cancellation,
        thankYou,
        form
      } = initDOMElements()
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
export function setMinDate () {
  const { form } = initDOMElements()
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
export function markAsValid (targetInput) {
  targetInput.setAttribute('data-valid', 'true')
}
/**
 * Sets attribute to indicate that input has been validated and is invalid
 * @param {HTMLElement} targetInput input to mark
 */
export function markAsInvalid (targetInput) {
  targetInput.setAttribute('data-valid', 'false')
}
/**
 * Checks if the input has already been validated
 * @param {HTMLElement} targetInput input to check
 */
export function checkValidity (targetInput) {
  return targetInput.getAttribute('data-valid') === 'true'
}

/**
 * Checks the existence and length of value in input field
 * @param {HTMLElement} targetInput input field to check
 * @param {Number} min minimum length value
 * @param {Number} max maximum length value
 * @returns {String} error message if checks aren't passed or null if otherwise
 */
export function checkValue (targetInput) {
  const targetInputWrapper = targetInput.parentElement
  const targetLabel = targetInputWrapper.querySelector('label').textContent
  const labelText =
    targetInput.id === 'card-code'
      ? targetLabel.slice(0, targetLabel.length - 1)
      : targetLabel.slice(0, 1).toUpperCase() +
        targetLabel.slice(1, targetLabel.length - 1).toLowerCase()
  const value = targetInput.value.trim().split(' ').join('')
  const min = targetInput.getAttribute('minlength')
  const max = targetInput.getAttribute('maxlength')
  if (!min) {
    throw new Error('Please provide the input with minlength attribute')
  }
  if (!max) {
    throw new Error('Please provide the input with maxlength attribute')
  }
  if (!value) {
    return `Please provide ${
      targetInput.id === 'card-code' ? labelText : labelText.toLowerCase()
    }`
  } else if (value.length < min) {
    return `${labelText} must have at least ${min} digits`
  } else if (value.length > max) {
    return ` ${labelText} must have at most ${max} digits`
  } else {
    return null
  }
}

/**
 * Checks card number value
 * @returns {String} error messsage or null
 */
export function validateCardNumber () {
  const { form } = initDOMElements()
  const cardNumber = form.querySelector('#card-number')
  const isLengthOK = checkValue(cardNumber)

  if (isLengthOK) {
    return isLengthOK
  }
  return null
}

/**
 * Checks card holder name value
 * @returns {String} error messsage or null
 */
export function validateHolderName () {
  const namePattern = /^[\p{L}-]+\s[\p{L}\-\s']{2,}$/u
  const { form } = initDOMElements()
  const cardHolderName = form.querySelector('#card-holder-name').value.trim()
  const targetLabel = form
    .querySelector('#card-holder-name')
    .parentElement.querySelector('label').textContent
  const labelText = targetLabel.slice(0, targetLabel.length - 1).toLowerCase()
  if (!cardHolderName) {
    return `Please provide ${labelText}`
  } else if (!cardHolderName.match(namePattern)) {
    return 'Use letters & hyphens for name & surname'
  }
  return null
}

/**
 * Checks card expiry date value
 * @returns {String} error messsage or null
 */
export function validateExpiryDate () {
  const { form } = initDOMElements()
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
export function validateCardCode () {
  const { form } = initDOMElements()
  const cardCode = form.querySelector('#card-code')
  const cardCodeValue = cardCode.value.trim()
  const cardNumberValue = form.querySelector('#card-number').value.trim()
  const isLengthOK = checkValue(cardCode)

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
export function validateForm () {
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
export function resetForm () {
  const { form } = initDOMElements()
  form.closest('.section').classList.remove('form-valid')
  form.closest('.section').classList.remove('form-invalid')
  form.reset()
}

/**
 * Creates error icon and text for incorrectly filled in input and adds an error class
 * @param {HTMLElement} targetControl form input that was incorrectly filled in
 * @param {String} errorMessage error message for incorrectly fille in form input
 */
export function createError (targetControl, errorMessage) {
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
export function clearError (targetControl) {
  const targetControlWrapper = targetControl.parentElement
  const targetError = targetControlWrapper.querySelector('.error-message')
  if (targetError && targetError.textContent) {
    targetError.innerHTML = ''
    targetControlWrapper.classList.remove('error')
  }
}

/**
 * Handles form input events
 * Checks if form data is valid
 * If data is valid, clears errors
 * @param {Event} e event object of the input event triggered by form interaction
 */
export function handleFormInput (e) {
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
}

/**
 * Handles form data changes by checking validity and formatting data
 * @param {*} e event object of the change event triggered by form interaction
 * @returns
 */
export function handleFormChange (e) {
  if (!e.target.closest('input')) return

  if (e.target.closest('#card-expiry-date')) {
    const isInputValid = checkValidity(e.target)
    if (isInputValid) return

    const error = validateExpiryDate()

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
}

document.addEventListener('DOMContentLoaded', () => {
  const { form } = initDOMElements()
  setMinDate()

  form.addEventListener('input', handleFormInput)
  form.addEventListener('change', handleFormChange)
})

document.body.addEventListener('click', e => {
  const { form } = initDOMElements()
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

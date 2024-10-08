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
  return text.substring(0, 1).toUpperCase() + text.substring(1)
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
      form.reset()
    }
  }

  if (button.classList.contains('jsHomeBtn')) {
    subscriptions.removeAttribute('hidden')
  }

  if (
    button.classList.contains('jsOrderBtn') &&
    button.closest('.section').classList.contains('form-valid')
  ) {
    thankYou.removeAttribute('hidden')
    form.reset()
  } else if (
    button.classList.contains('jsOrderBtn') &&
    button.closest('.section').classList.contains('form-invalid')
  ) {
    payment.removeAttribute('hidden')
  }
}

/**
 * Checks if form inputs were correctly filled in
 * @returns {Object} errors object containing error messages for invalid inputs
 */
function validateForm () {
  const errors = {}
  const namePattern = /^[\p{L}\-]+\s[\p{L}\-\s']{2,}$/u
  const cardNumber = form.querySelector('#card-number').value.trim()
  const cardHolderName = form.querySelector('#card-holder-name').value.trim()
  const cardExpiryDate = form.querySelector('#card-expiry-date').value.trim()
  const cardCode = form.querySelector('#card-code').value.trim()

  if (!cardNumber) {
    errors.cardNumber = 'Please provide card number'
  } else if (cardNumber.length < 13) {
    errors.cardNumber = 'Card number must have at least 13 digits'
  } else if (cardNumber.length > 19) {
    errors.cardNumber = 'Card number must have at most 19 digits'
  }

  if (!cardHolderName) {
    errors.cardHolderName = 'Please provide name on card'
  } else if (!cardHolderName.match(namePattern)) {
    errors.cardHolderName = 'Use letters & hyphens for name & surname'
  }

  if (!cardExpiryDate) {
    errors.cardExpiryDate = 'Please provide card expiry date'
  }

  if (!cardCode) {
    errors.cardCode = 'Please provide Card Verification Value'
  } else if (cardCode.length < 3) {
    errors.cardCode = 'CVV must have at least 3 digits'
  } else if (cardCode.length > 4) {
    errors.cardCode = 'CVV must have at most 4 digits'
  }

  return errors
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

document.body.addEventListener('click', e => {
  if (!e.target.closest('.jsBtn')) return

  if (e.target.closest('.jsSubscribeBtn')) {
    const selectedPlan = getSelectedPlan(e.target)
    createPlanDetails(selectedPlan)
  }

  if (e.target.closest('.jsOrderBtn')) {
    e.preventDefault()
    const existingErrors = validateForm()
    const isFormValid = Object.keys(existingErrors).length === 0

    if (isFormValid) {
      form.closest('.section').classList.add('form-valid')
      form.reset()
    } else {
      const errorArray = Object.entries(existingErrors)

      form.closest('.section').classList.add('form-invalid')
      errorArray.forEach(item => {
        const [input, value] = item
        const targetInput = form.querySelector(
          `#${makeCamelCaseHyphenatedLowercase(input)}`
        )
        createError(targetInput, value)
      })
    }
  }

  switchScreen(e.target)
})

form.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', e => {
    const inputName = makeHyphenatedLowercaseCamelCase(e.target.id)
    const errors = validateForm()
    if (!errors[inputName]) {
      clearError(e.target)
    }
  })
})

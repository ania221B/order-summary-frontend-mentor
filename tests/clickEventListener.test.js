import {
  initDOMElements,
  getSelectedPlan,
  createPlanDetails,
  validateForm,
  markAsInvalid,
  createError,
  switchScreen
} from '../js/main'
import { makeCamelCaseHyphenatedLowercase } from '../js/utils'

describe('clickEventListener', () => {
  let currentDate
  let currentYear
  let currentMonth
  let clickEvent
  let sections
  let paymentSection
  let thankYouSection
  let orderButton
  let form
  let cardNumberInput
  let cardNumberWrapper
  let cardNumberLabel
  let cardNumberLabelText
  let cardNumberMin
  let cardNumberErrorContainer
  let cardHolderNameInput
  let cardExpiryDateInput
  let cardCodeInput
  let cardHolderNameWrapper
  let cardHolderNameErrorContainer
  let cardExpiryDateWrapper
  let cardExpiryDateErrorContainer
  let cardCodeWrapper
  let cardCodeLabel
  let cardCodeLabelText
  let cardCodeErrorContainer

  beforeEach(() => {
    document.body.innerHTML = `
    <section id="subscription-section" class="subscriptions section" hidden>
    </section>

    <section id='confirmation-section' class="confirmation section" hidden>
    </section>

    <section id="cancellation-section" class="cancellation section" hidden>
    </section>

    <section id="payment-section" class="payment section">
          <form class="payment__form">
            <h2 class="h2">Payment Details</h2>
            <div class="form__control-wrapper">
              <label for="card-number">Card Number:</label>
              <input id="card-number" class="numeric-input" type="text" data-inputmode="numeric" minlength="13" maxlength="19" pattern="[0-9\s]{13,19}" placeholder="1234 5678 9012 3456" required>
              <div class="error-message"></div>
            </div>

            <div class="form__control-wrapper">
              <label for="card-holder-name">Name on card:</label>
              <input id="card-holder-name" type="text" placeholder="Jane Doe" required>
              <div class="error-message"></div>
            </div>

            <div class="form__control-wrapper">
              <label for="card-expiry-date">Expiry:</label>
              <input id="card-expiry-date" type="month" required>
              <div class="error-message"></div>
            </div>

            <div class="form__control-wrapper">
              <label for="card-code">CVV:</label>
              <input id="card-code" type="text" minlength="3" maxlength="4" pattern="\d{3,4}" placeholder="CVV" required>
              <div class="error-message"></div>
            </div>

            <div class="form__buttons">
              <button type="submit" class="btn jsBtn jsOrderBtn" data-type="primary" data-theme="dark">
                Place Order
              </button>
              <button type="button" class="btn jsBtn jsCancelBtn" data-type="secondary">
                Cancel Order
              </button>
            </div>
          </form>
    </section>

     <section id="thank-you-section" class="thank-you section" hidden>
    </section>`
    clickEvent = new Event('click', { bubbles: true })
    sections = Array.from(document.querySelectorAll('.section'))
    paymentSection = document.querySelector('#payment-section')
    thankYouSection = document.querySelector('#thank-you-section')
    currentDate = new Date()
    currentYear = currentDate.getFullYear()
    currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    orderButton = document.querySelector('.jsOrderBtn')
    form = document.querySelector('.payment__form')
    cardNumberInput = form.querySelector('#card-number')
    cardNumberWrapper = cardNumberInput.parentElement
    cardNumberLabel = cardNumberWrapper.querySelector('label').textContent
    cardNumberLabelText =
      cardNumberLabel.slice(0, 1).toUpperCase() +
      cardNumberLabel.slice(1, cardNumberLabel.length - 1).toLowerCase()
    cardNumberMin = cardNumberInput.getAttribute('minlength')
    cardNumberErrorContainer = cardNumberWrapper.querySelector('.error-message')
    cardHolderNameInput = form.querySelector('#card-holder-name')
    cardHolderNameWrapper = cardHolderNameInput.parentElement
    cardHolderNameErrorContainer =
      cardHolderNameWrapper.querySelector('.error-message')
    cardExpiryDateInput = form.querySelector('#card-expiry-date')
    cardExpiryDateWrapper = cardExpiryDateInput.parentElement
    cardExpiryDateErrorContainer =
      cardExpiryDateWrapper.querySelector('.error-message')
    cardCodeInput = form.querySelector('#card-code')
    cardCodeWrapper = cardCodeInput.parentElement
    cardCodeLabel = cardCodeWrapper.querySelector('label').textContent
    cardCodeLabelText = cardCodeLabel.slice(0, cardCodeLabel.length - 1)
    cardCodeErrorContainer = cardCodeWrapper.querySelector('.error-message')
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('does nothing when clicked element is not a button', () => {
    const header = document.querySelector('.payment__form h2')

    expect(header).not.toBeNull()

    header.dispatchEvent(clickEvent)

    expect(paymentSection.getAttribute('hidden')).toBeFalsy()
    expect(
      sections.filter(section => !section.hasAttribute('hidden')).length
    ).toBe(1)
  })
  test('fetches plan details when subscribe button is clicked', () => {
    document.body.innerHTML = `
    <section id="subscription-section" class="subscriptions section">
      <div class="container">
        <div class="cards grid-auto-fit">
          <div class="card">
            <div class="card__content card__content--subscription flow">
              <header class="flow">
                <h2 class="jsPlanType small-text">free</h2>
                <p class="h2 jsPrice">
                  $0.00<span>/month</span>
                </p>
              </header>
              <button type="button" class="btn jsBtn jsSubscribeBtn" data-type="primary" data-theme="dark">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section id='confirmation-section' class="confirmation section" hidden>
     <div class="card confirmation-card container">
        <div class="card__content flow">
          <header class="flow">
            <h2 class="h2">Order Summary</h2>
          </header>
          <div class="plan">
            <img src="images/icon-music.svg" alt="">
            <!-- plan details go here -->
            <button type="button" class="btn jsBtn jsChangeBtn" data-type="primary" data-theme="link">
              Change
            </button>
          </div>
          <button type="button" class="btn jsBtn jsPaymentBtn" data-type="primary" data-theme="dark">
            Proceed to Payment
          </button>
          <button type="button" class="btn jsBtn jsCancelBtn" data-type="secondary">
            Cancel Order
          </button>
        </div>
      </div>
    </section>

    <section id="cancellation-section" class="cancellation section" hidden>
    </section>
     <section id="payment-section" class="payment section" hidden></section>
      <section id="thank-you-section" class="thank-you section" hidden>
    `

    const subscribeButton = document.querySelector('.jsSubscribeBtn')

    subscribeButton.dispatchEvent(clickEvent)

    const subscriptionSection = document.querySelector('#subscription-section')
    const confirmationSection = document.querySelector('#confirmation-section')
    const confirmationCard =
      confirmationSection.querySelector('.confirmation-card')
    const planDetails = confirmationCard.querySelector('.plan__details')

    expect(planDetails).not.toBeNull()
    expect(planDetails.querySelector('h3').textContent).toBe('Free Plan')
    expect(planDetails.querySelector('p').textContent).toBe('$0.00/month')
    expect(subscriptionSection.hasAttribute('hidden')).toBeFalsy()
    expect(confirmationSection.hasAttribute('hidden')).toBeTruthy()
    expect(
      sections.filter(section => !section.hasAttribute('hidden')).length
    ).toBe(1)
  })
  test('marks a valid form as valid when Order button is clicked and form is filled correctly at the get go', () => {
    cardNumberInput.value = '1234 5678 9123 4567'
    cardHolderNameInput.value = 'Anna-Maria Kowalska'
    cardExpiryDateInput.value = `${currentYear}-${currentMonth}`
    cardCodeInput.value = '456'

    orderButton.dispatchEvent(clickEvent)

    expect(paymentSection.classList.contains('form-invalid')).toBeFalsy()
    expect(paymentSection.classList.contains('form-valid')).toBeTruthy()
    expect(paymentSection.hasAttribute('hidden')).toBeFalsy()
    expect(thankYouSection.hasAttribute('hidden')).toBeTruthy()
    expect(
      sections.filter(section => !section.hasAttribute('hidden')).length
    ).toBe(1)
  })
  test('removes invalid class when Order button is clicked after correcting an invalid form', () => {
    paymentSection.classList.add('form-invalid')
    cardNumberInput.value = '1234 5678 9123 4567'
    cardHolderNameInput.value = 'Anna-Maria Kowalska'
    cardExpiryDateInput.value = `${currentYear + 1}-${currentMonth}`
    cardCodeInput.value = '456'

    orderButton.dispatchEvent(clickEvent)

    expect(paymentSection.classList.contains('form-invalid')).toBeFalsy()
    expect(paymentSection.classList.contains('form-valid')).toBeTruthy()
    expect(paymentSection.hasAttribute('hidden')).toBeFalsy()
    expect(thankYouSection.hasAttribute('hidden')).toBeTruthy()
    expect(
      sections.filter(section => !section.hasAttribute('hidden')).length
    ).toBe(1)
  })
  test('marks form as invalid when Order button is clicked after incorrectly filling in the form', () => {
    const cardCodeMin = cardCodeInput.getAttribute('minlength')
    const cardNumberError = `${cardNumberLabelText} must have at least ${cardNumberMin} digits`
    const cardCodeError = `${cardCodeLabelText} must have at least ${cardCodeMin} digits`

    const expectedCardNumberErrorContainerHTML = `<svg
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
    <p>${cardNumberError}</p>`
    const expectedCardNumberErrorContainer = document.createElement('div')
    const actualCardNumberErrorContainer = document.createElement('div')
    const expectedCodeErrorContainerHTML = `<svg
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
    <p>${cardCodeError}</p>`
    const expectedCardCodeErrorContainer = document.createElement('div')
    const actualCardCodeErrorContainer = document.createElement('div')

    cardNumberInput.value = '123'
    cardHolderNameInput.value = 'Anna-Maria Kowalska'
    cardExpiryDateInput.value = `${currentYear}-${currentMonth}`
    cardCodeInput.value = '4'

    orderButton.dispatchEvent(clickEvent)

    expectedCardNumberErrorContainer.innerHTML =
      expectedCardNumberErrorContainerHTML.trim()
    actualCardNumberErrorContainer.innerHTML =
      cardNumberErrorContainer.innerHTML.trim()
    expectedCardCodeErrorContainer.innerHTML =
      expectedCodeErrorContainerHTML.trim()
    actualCardCodeErrorContainer.innerHTML =
      cardCodeErrorContainer.innerHTML.trim()

    expect(paymentSection.classList.contains('form-invalid')).toBeTruthy()
    expect(paymentSection.classList.contains('form-valid')).toBeFalsy()
    expect(cardNumberInput.getAttribute('data-valid')).toBe('false')

    expect(cardCodeInput.getAttribute('data-valid')).toBe('false')
    expect(
      actualCardNumberErrorContainer.isEqualNode(
        expectedCardNumberErrorContainer
      )
    ).toBeTruthy()
    expect(
      actualCardCodeErrorContainer.isEqualNode(expectedCardCodeErrorContainer)
    ).toBeTruthy()
    expect(cardHolderNameErrorContainer.innerHTML).toBe('')
    expect(cardExpiryDateErrorContainer.innerHTML).toBe('')
    expect(cardNumberWrapper.classList.contains('error')).toBeTruthy()
    expect(cardCodeWrapper.classList.contains('error')).toBeTruthy()
    expect(paymentSection.hasAttribute('hidden')).toBeFalsy()
    expect(
      sections.filter(section => !section.hasAttribute('hidden')).length
    ).toBe(1)
  })
  test('marks a previously valid form as invalid when Order button is clicked after introducing errors to form', () => {
    const cardCodeMax = cardCodeInput.getAttribute('maxlength')
    const cardCodeError = `${cardCodeLabelText} must have at most ${cardCodeMax} digits`
    const expectedCardCodeErrorContainerHTML = `<svg
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
    <p>${cardCodeError}</p>`
    const expectedElement = document.createElement('div')
    const actualElement = document.createElement('div')

    paymentSection.classList.add('form-valid')
    cardNumberInput.value = '1234 5678 9123 4567'
    cardHolderNameInput.value = 'Anna-Maria Kowalska'
    cardExpiryDateInput.value = `${currentYear + 2}-${currentMonth}`
    cardCodeInput.value = '12345'

    orderButton.dispatchEvent(clickEvent)

    expectedElement.innerHTML = expectedCardCodeErrorContainerHTML.trim()
    actualElement.innerHTML = cardCodeErrorContainer.innerHTML.trim()

    expect(paymentSection.classList.contains('form-invalid')).toBeTruthy()
    expect(paymentSection.classList.contains('form-valid')).toBeFalsy()
    expect(paymentSection.hasAttribute('hidden')).toBeFalsy()
    expect(cardNumberWrapper.classList.contains('error')).toBeFalsy()
    expect(cardHolderNameWrapper.classList.contains('error')).toBeFalsy()
    expect(cardExpiryDateWrapper.classList.contains('error')).toBeFalsy()
    expect(cardCodeWrapper.classList.contains('error')).toBeTruthy()
    expect(cardNumberErrorContainer.innerHTML).toBe('')
    expect(cardHolderNameErrorContainer.innerHTML).toBe('')
    expect(cardExpiryDateErrorContainer.innerHTML).toBe('')
    expect(actualElement.isEqualNode(expectedElement)).toBeTruthy()
    expect(
      sections.filter(section => !section.hasAttribute('hidden')).length
    ).toBe(1)
  })
})

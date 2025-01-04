import { validateForm } from '../js/main'

describe('validateForm', () => {
  let currentDate
  let cardNumberInput
  let cardNumberLabel
  let cardNumberLabelText
  let cardNumberMin
  let cardNumberMax
  let cardHolderNameInput
  let cardExpiryDateInput
  let cardCodeInput
  let cardCodeLabel
  let cardCodeLabelText
  let cardCodeMax
  beforeEach(() => {
    document.body.innerHTML = `<section id="payment-section" class="payment section" hidden>
      <div class="card payment-card container">
        <div class="card__img">
          <img src="images/illustration-hero.svg" alt="cartoon figure with headphones on their head dancing to music from a phone held in one hand with an outline of a city and music notes in the background">
        </div>
        <div class="card__content flow">
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
          </form>
        </div>
      </div>
    </section>`
    currentDate = new Date()
    cardNumberInput = document.querySelector('#card-number')
    cardNumberLabel =
      cardNumberInput.parentElement.querySelector('label').textContent
    cardNumberLabelText =
      cardNumberLabel.slice(0, 1).toUpperCase() +
      cardNumberLabel.slice(1, cardNumberLabel.length - 1).toLowerCase()
    cardNumberMin = cardNumberInput.getAttribute('minlength')
    cardNumberMax = cardNumberInput.getAttribute('maxlength')
    cardHolderNameInput = document.querySelector('#card-holder-name')
    cardExpiryDateInput = document.querySelector('#card-expiry-date')
    cardCodeInput = document.querySelector('#card-code')
    cardCodeLabel =
      cardCodeInput.parentElement.querySelector('label').textContent
    cardCodeLabelText = cardCodeLabel.slice(0, cardCodeLabel.length - 1)
    cardCodeMax = cardCodeInput.getAttribute('maxlength')
  })

  test(`returns an object with all properites' value of null when all data entered is valid`, () => {
    cardNumberInput.value = '1234567890123456789'
    cardHolderNameInput.value = 'Anna-Maria Nowak'
    cardExpiryDateInput.value = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}`
    cardCodeInput.value = '123'

    expect(validateForm()).toEqual({
      cardNumber: null,
      cardHolderName: null,
      cardExpiryDate: null,
      cardCode: null
    })
  })
  test(`returns an object with error messages when all data entered is invalid`, () => {
    cardNumberInput.value = '12345'
    cardHolderNameInput.value = 'An'
    cardExpiryDateInput.value = `${currentDate.getFullYear() - 1}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}`
    cardCodeInput.value = '12345'

    expect(validateForm()).toEqual({
      cardNumber: `${cardNumberLabelText} must have at least ${cardNumberMin} digits`,
      cardHolderName: 'Use letters & hyphens for name & surname',
      cardExpiryDate: 'Must be current month or later',
      cardCode: `${cardCodeLabelText} must have at most ${cardCodeMax} digits`
    })
  })
  test('returns an object with appropriate values when data entered is partially correct', () => {
    cardNumberInput.value = '3712345678901234567890'
    cardHolderNameInput.value = 'Anna-Maria Nowak'
    cardExpiryDateInput.value = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}`
    cardCodeInput.value = '123'

    expect(validateForm()).toEqual({
      cardNumber: `${cardNumberLabelText} must have at most ${cardNumberMax} digits`,
      cardHolderName: null,
      cardExpiryDate: null,
      cardCode: `${cardCodeLabelText} must be 4 digits`
    })
  })
})

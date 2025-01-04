import { validateCardNumber } from '../js/main'

describe('validateCardNumber', () => {
  let cardNumberInput
  let cardNumberLabel
  let cardNumberLabelText
  beforeEach(() => {
    document.body.innerHTML = `<main>
      <section id="payment-section" class="payment section" hidden>
      <div class="card payment-card container">
          <div class="card__img">
          </div>
          <div class="card__content flow">
            <form class="payment__form"> 
             <h2 class="h2">Payment Details</h2>
             <div class="form__control-wrapper">
              <label for="card-number">Card Number:</label>
              <input id="card-number" class="numeric-input" type="text" data-inputmode="numeric" minlength="13" maxlength="19" pattern="[0-9\s]{13,19}" placeholder="1234 5678 9012 3456" required>
              <div class="error-message"></div>
            </div>          
            </form>
          </div>
        </div>
      </section>
    </main>`
    cardNumberInput = document.querySelector('#card-number')
    cardNumberLabel =
      cardNumberInput.parentElement.querySelector('label').textContent
    cardNumberLabelText =
      cardNumberLabel.slice(0, 1).toUpperCase() +
      cardNumberLabel.slice(1, cardNumberLabel.length - 1).toLowerCase()
  })
  test('returns null when card number is valid', () => {
    cardNumberInput.value = '1234567899517'
    expect(validateCardNumber()).toBeNull()
  })
  test('returns correct error message when card number is missing', () => {
    cardNumberInput.value = ''
    expect(validateCardNumber()).toBe(
      `Please provide ${cardNumberLabelText.toLowerCase()}`
    )
  })
  test('returns correct error message when card number is too short', () => {
    cardNumberInput.value = '123'
    expect(validateCardNumber()).toBe(
      `${cardNumberLabelText} must have at least ${cardNumberInput.getAttribute(
        'minlength'
      )} digits`
    )
  })
  test('returns correct error message when card number is too long', () => {
    cardNumberInput.value = '98745632114785236951753'
    expect(validateCardNumber()).toBe(
      `${cardNumberLabelText} must have at most ${cardNumberInput.getAttribute(
        'maxlength'
      )} digits`
    )
  })
})

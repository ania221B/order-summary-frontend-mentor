import { validateCardCode } from '../js/main'

describe('validateCardCode', () => {
  let cardNumberInput
  let cardCodeInput
  let cardCodeLabel
  let cardCodeLabelText
  let cardCodeMinLength
  let cardCodeMaxLength

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

            <div class="form__control-wrapper">
              <label for="card-code">CVV:</label>
              <input id="card-code" type="text" minlength="3" maxlength="4" pattern="\d{3,4}" placeholder="CVV" required>
              <div class="error-message"></div>
            </div>
            </form>
          </div>
        </div>
      </section>
    </main>`
    cardNumberInput = document.querySelector('#card-number')
    cardCodeInput = document.querySelector('#card-code')
    cardCodeLabel =
      cardCodeInput.parentElement.querySelector('label').textContent
    cardCodeLabelText = cardCodeLabel.slice(0, cardCodeLabel.length - 1)
    cardCodeMinLength = cardCodeInput.getAttribute('minlength')
    cardCodeMaxLength = cardCodeInput.getAttribute('maxlength')
  })

  test('returns null when card code is valid', () => {
    cardNumberInput = '1234567891234'
    cardCodeInput.value = '1234'

    expect(validateCardCode()).toBeNull()
  })
  test('returns correct error message when card code is missing', () => {
    cardCodeInput.value = ''
    expect(validateCardCode()).toBe(`Please provide ${cardCodeLabelText}`)
  })
  test('returns correct error message when card code is too short', () => {
    cardCodeInput.value = '12'
    expect(validateCardCode()).toBe(
      `${cardCodeLabelText} must have at least ${cardCodeMinLength} digits`
    )
  })
  test('returns correct error message when card code is too long', () => {
    cardCodeInput.value = '12345'
    expect(validateCardCode()).toBe(
      `${cardCodeLabelText} must have at most ${cardCodeMaxLength} digits`
    )
  })
  test('returns correct error message when card is American Express and card code has less than 4 digits', () => {
    cardNumberInput.value = '3712345678901'
    cardCodeInput.value = '123'
    expect(validateCardCode()).toBe(`${cardCodeLabelText} must be 4 digits`)
  })
})

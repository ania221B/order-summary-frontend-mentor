import { handleFormInput } from '../js/main'

describe('handleFormInput', () => {
  beforeEach(() => {
    document.body.innerHTML = `<section id="payment-section" class="payment section" hidden>
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
    </section>`
  })
  test('clears error and marks input as valid when entered data is correct', () => {
    const cardNumberInput = document.querySelector('#card-number')
    const cardNumberInputWrapper = cardNumberInput.parentElement
    const errorContainer =
      cardNumberInputWrapper.querySelector('.error-message')

    cardNumberInput.value = '1234 5678 9012 3456 789'

    const inputEvent = new Event('input', {
      bubbles: true
    })

    cardNumberInput.dispatchEvent(inputEvent)

    handleFormInput(inputEvent)

    expect(errorContainer.textContent).toBe('')
    expect(cardNumberInput.getAttribute('data-valid')).toBe('true')
  })
})

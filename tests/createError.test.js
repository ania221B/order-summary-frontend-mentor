import { createError } from '../js/main'

describe('createError', () => {
  document.body.innerHTML = `<section id="payment-section" class="payment section" hidden>
      <div class="card payment-card container">
        <div class="card__img"></div>
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

  test('adds appropriate class and error message to form element in question', () => {
    const cardNumberInput = document.querySelector('#card-number')
    const cardNumberError = `Card number must have at least 13 digits`

    createError(cardNumberInput, cardNumberError)

    const inputWrapper = cardNumberInput.parentElement
    const errorContainer = inputWrapper.querySelector('.error-message')

    expect(inputWrapper.classList.contains('error')).toBeTruthy()

    const expectedHTML = `<svg
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
    const expectedElement = document.createElement('div')
    expectedElement.innerHTML = expectedHTML.trim()

    const actualElement = document.createElement('div')
    actualElement.innerHTML = errorContainer.innerHTML.trim()
    expect(actualElement.isEqualNode(expectedElement)).toBeTruthy()
  })
})

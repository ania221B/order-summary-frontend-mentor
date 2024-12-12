import { resetForm } from '../js/main'

describe('resetForm', () => {
  let formSection
  let form
  let cardNumberInput
  let cardHolderNameInput
  let cardExpiryDateInput
  let cardCodeInput
  let currentDate
  beforeEach(() => {
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
    </section>
`
    formSection = document.querySelector('#payment-section')
    form = formSection.querySelector('.payment__form')
    cardNumberInput = form.querySelector('#card-number')
    cardHolderNameInput = form.querySelector('#card-holder-name')
    cardExpiryDateInput = form.querySelector('#card-expiry-date')
    cardCodeInput = form.querySelector('#card-code')
    currentDate = new Date()
  })

  test('removes form-valid class and resets all form fields', () => {
    formSection.classList.add('form-valid')
    cardNumberInput.value = '1234567890123'
    cardHolderNameInput.value = 'Anna-Maria Nowak'
    cardExpiryDateInput.value = `${currentDate.getFullYear()}-${(
      currentDate.getMonth + 1
    )
      .toString()
      .padStart(2, '0')}`
    cardCodeInput.value = '1234'
    resetForm()
    const formInputs = Array.from(form.querySelectorAll('input'))
    expect(formSection.className).toBe('payment section')
    formInputs.forEach(input => {
      expect(input.value).toBe('')
    })
  })

  test('removes form-invalid class and resets all form fields', () => {
    formSection.classList.add('form-invalid')
    cardNumberInput.value = '123'
    cardHolderNameInput.value = 'An'
    cardExpiryDateInput.value = `${currentDate.getFullYear() - 1}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}`
    cardCodeInput.value = '0'
    resetForm()
    const formInputs = Array.from(form.querySelectorAll('input'))
    expect(formSection.className).toBe('payment section')
    formInputs.forEach(input => {
      expect(input.value).toBe('')
    })
  })
  test('removes both form-valid and form-invalid class and resets all form fields', () => {
    formSection.classList.add('form-valid', 'form-invalid')
    cardNumberInput.value = '1234567890123'
    cardHolderNameInput.value = 'An'
    cardExpiryDateInput.value = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}`
    cardCodeInput.value = '0'

    resetForm()
    const formInputs = Array.from(form.querySelectorAll('input'))
    expect(formSection.className).toBe('payment section')
    formInputs.forEach(input => {
      expect(input.value).toBe('')
    })
  })
})

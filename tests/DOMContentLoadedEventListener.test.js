import { setMinDate } from '../js/main'

describe('DOMContentLoaded', () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <form class="payment__form">
            <h2 class="h2">Payment Details</h2>

            <div class="form__control-wrapper">
              <label for="card-number">Card Number:</label>
              <input id="card-number" class="numeric-input" type="text" data-inputmode="numeric" minlength="13" maxlength="19" pattern="[0-9\s]{13,19}" placeholder="1234 5678 9012 3456" required>
              <div class="error-message"></div>
            </div>

            <div class="form__control-wrapper">
              <label for="card-expiry-date">Expiry:</label>
              <input id="card-expiry-date" type="month" required>
              <div class="error-message"></div>
            </div>

          </form>`
    jest.resetModules()
  })

  test('assigns input and change listeners to form and sets min-date for the form', () => {
    const domConteneLoadedEvent = new Event('DOMContentLoaded')

    document.dispatchEvent(domConteneLoadedEvent)

    const form = document.querySelector('.payment__form')
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')
    const formattedDate = `${currentYear}-${currentMonth}`
    const expiryDateInput = form.querySelector('#card-expiry-date')
    const expiryDate = expiryDateInput.getAttribute('min')
    const expiryValue = expiryDateInput.getAttribute('value')
    const cardNumberInput = form.querySelector('#card-number')

    expect(form).not.toBeNull()
    expect(expiryDate).toBe(formattedDate)
    expect(expiryValue).toBe(formattedDate)

    const inputEvent = new Event('input', {
      bubbles: true
    })
    const changeEvent = new Event('change', {
      bubbles: true
    })

    cardNumberInput.value = '4458 9875 9632 2588'
    expiryDateInput.value = `${currentYear}-${currentMonth}`

    cardNumberInput.dispatchEvent(inputEvent)
    expiryDateInput.dispatchEvent(changeEvent)

    expect(cardNumberInput.getAttribute('data-valid')).toBe('true')
    expect(expiryDateInput.getAttribute('data-valid')).toBe('true')
  })
})

import { validateExpiryDate } from '../js/main'

describe('validateExpiryDate', () => {
  let cardExpiryDateInput
  let currentDate
  let currentYear
  let currentMonth
  beforeEach(() => {
    document.body.innerHTML = `<section id="payment-section" class="payment section" hidden>
      <div class="card payment-card container">
        <div class="card__img"></div>
        <div class="card__content flow">
          <form class="payment__form">
            <h2 class="h2">Payment Details</h2>   
            <div class="form__control-wrapper">
              <label for="card-expiry-date">Expiry:</label>
              <input id="card-expiry-date" type="month" required>
              <div class="error-message"></div>
            </div>
          </form>
        </div>
      </div>
    </section>`
    cardExpiryDateInput = document.body.querySelector('#card-expiry-date')
    currentDate = new Date()
    currentYear = currentDate.getFullYear()
    currentMonth = currentDate.getMonth() + 1
  })

  test('returns null if date is valid', () => {
    const selectedMonth = currentMonth.toString().padStart(2, '0')
    const selectedYear = currentDate.getFullYear()
    const selectedDate = `${selectedYear}-${selectedMonth}`

    cardExpiryDateInput.value = selectedDate
    expect(validateExpiryDate()).toBeNull()
  })
  test('returns correct error message when expiry date is null', () => {
    cardExpiryDateInput.value = ''
    expect(validateExpiryDate()).toBe('Please provide card expiry date')
  })
  test('returns correct error message when expiry date is invalid', () => {
    const selectedMonth = currentMonth.toString().padStart(2, '0')
    const selectedYear = currentDate.getFullYear() - 2
    const selectedDate = `${selectedYear}-${selectedMonth}`
    cardExpiryDateInput.value = selectedDate

    expect(validateExpiryDate()).toBe('Must be current month or later')
  })
})

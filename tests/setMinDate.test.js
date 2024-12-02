import { setMinDate } from '../js/main.js'

describe('setMinDate', () => {
  let date
  let year
  let month
  let dateString

  beforeEach(() => {
    document.body.innerHTML = `<main>
    <section id="payment-section" class="payment section form-invalid">
       <form class="payment__form">
            <h2 class="h2">Payment Details</h2>
             <div class="form__control-wrapper">
              <label for="card-expiry-date">Expiry:</label>
              <input id="card-expiry-date" type="month" required>
              <div class="error-message"></div>
            </div>
          </form>
    </section>
  </main>`
    date = new Date()
    year = date.getFullYear()
    month = (date.getMonth() + 1).toString().padStart(2, '0')
    dateString = `${year}-${month}`
  })

  test('correctly sets min attribute for card expiry date', () => {
    setMinDate()
    const cardExpiryDateInput = document.body.querySelector('#card-expiry-date')
    expect(cardExpiryDateInput.getAttribute('min')).toBe(dateString)
  })

  test('correctly sets value attribute for card expiry date', () => {
    setMinDate()
    const cardExpiryDateInput = document.body.querySelector('#card-expiry-date')
    expect(cardExpiryDateInput.getAttribute('value')).toBe(dateString)
  })
})

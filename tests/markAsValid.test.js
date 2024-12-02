import { markAsValid } from '../js/main.js'

describe('markAsValid', () => {
  test('sets data-valid attribute to true for a given input', () => {
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

    const cardExpiryDateInput = document.body.querySelector('#card-expiry-date')
    markAsValid(cardExpiryDateInput)
    expect(cardExpiryDateInput.getAttribute('data-valid')).toBe('true')
  })
})
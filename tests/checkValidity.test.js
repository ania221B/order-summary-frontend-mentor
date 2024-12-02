import { checkValidity } from '../js/main.js'

describe('checkValidity', () => {
  test('returns true when data-valid attribute is set to true', () => {
    document.body.innerHTML = `<main>
      <section id="payment-section" class="payment section form-invalid">
         <form class="payment__form">
              <h2 class="h2">Payment Details</h2>
               <div class="form__control-wrapper">
                <label for="card-expiry-date">Expiry:</label>
                <input id="card-expiry-date" type="month" data-valid="true" required>
                <div class="error-message"></div>
              </div>
            </form>
      </section>
    </main>`

    const cardExpiryDateInput = document.querySelector('#card-expiry-date')
    checkValidity(cardExpiryDateInput)
    expect(
      cardExpiryDateInput.getAttribute('data-valid') === 'true'
    ).toBeTruthy()
  })

  test('returns false when data-valid attribute is set to false', () => {
    document.body.innerHTML = `<main>
      <section id="payment-section" class="payment section form-invalid">
         <form class="payment__form">
              <h2 class="h2">Payment Details</h2>
               <div class="form__control-wrapper">
                <label for="card-expiry-date">Expiry:</label>
                <input id="card-expiry-date" type="month" data-valid="false" required>
                <div class="error-message"></div>
              </div>
            </form>
      </section>
    </main>`

    const cardExpiryDateInput = document.querySelector('#card-expiry-date')
    checkValidity(cardExpiryDateInput)
    expect(
      cardExpiryDateInput.getAttribute('data-valid') === 'true'
    ).toBeFalsy()
  })

  test('returns false when data-valid attribute is not present', () => {
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

    const cardExpiryDateInput = document.querySelector('#card-expiry-date')
    checkValidity(cardExpiryDateInput)
    expect(
      cardExpiryDateInput.getAttribute('data-valid') === 'true'
    ).toBeFalsy()
  })
})

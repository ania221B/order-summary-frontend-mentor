import { validateHolderName } from '../js/main'

describe('validateHolderName', () => {
  let cardHolderNameInput
  let cardHolderNameLabel
  let labelText
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
              <label for="card-holder-name">Name on card:</label>
              <input id="card-holder-name" type="text" placeholder="Jane Doe" required>
              <div class="error-message"></div>
            </div>   
            </form>
          </div>
        </div>
      </section>
    </main>`
    cardHolderNameInput = document.querySelector('#card-holder-name')
    cardHolderNameLabel =
      cardHolderNameInput.parentElement.querySelector('label').textContent
    labelText = cardHolderNameLabel
      .slice(0, cardHolderNameLabel.length - 1)
      .toLowerCase()
  })
  test('returns null when card holder name is valid', () => {
    cardHolderNameInput.value = 'Anna-Maria Kowalska'
    expect(validateHolderName()).toBeNull()
  })
  test('returns correct error message when card holder name is missing', () => {
    cardHolderNameInput.value = ''
    expect(validateHolderName()).toBe(`Please provide ${labelText}`)
  })
  test('returns correct error message when card holder name is invalid', () => {
    cardHolderNameInput.value = 'abc'
    expect(validateHolderName()).toBe(
      'Use letters & hyphens for name & surname'
    )
  })
})

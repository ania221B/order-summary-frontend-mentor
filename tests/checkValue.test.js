import { checkValue } from '../js/main.js'

describe('checkValue', () => {
  let inputToCheck
  let inputToCheckWrapper
  let inputToCheckLabel
  beforeEach(() => {
    document.body.innerHTML = `<main>
    <section id="payment-section" class="payment section form-invalid">
       <form class="payment__form">
            <h2 class="h2">Payment Details</h2>
              <div class="form__control-wrapper">
                <label for="card-number">Card Number:</label>
                <input id="card-number" class="numeric-input" type="text" data-inputmode="numeric" minlength="13" maxlength="19" pattern="[0-9\s]{13,19}" placeholder="1234 5678 9012 3456" required>
                <div class="error-message"></div>
            </div>

            <div class="form__control-wrapper">
               <label for="quantity">Quantity (between 1 and 5):</label>
  <input type="number" id="quantity" name="quantity" min="1" max="5">
            </div>
          </form>
    </section>
  </main>`
    inputToCheck = document.querySelector('#card-number')
    inputToCheckWrapper = inputToCheck.parentElement
    inputToCheckLabel = inputToCheckWrapper.querySelector('label').textContent
  })

  test('if there is no value returns error message asking to provide one', () => {
    inputToCheck.value = ''
    expect(checkValue(inputToCheck)).toBe(`Please provide ${inputToCheckLabel}`)
  })
  test('if value is shorter than min allowed length returns a message informing about min value', () => {
    inputToCheck.value = '123654789'
    expect(checkValue(inputToCheck)).toBe(
      `${inputToCheckLabel} must have at least ${inputToCheck.getAttribute(
        'minlength'
      )} digits`
    )
  })
  test('if value is longer than max allowed length returns a message informing about max value', () => {
    inputToCheck.value = '123456789951357741963'
    expect(checkValue(inputToCheck)).toBe(
      `${inputToCheckLabel} must have at most ${inputToCheck.getAttribute(
        'maxlength'
      )} digits`
    )
  })
  test('if value is of expected length returns null', () => {
    inputToCheck.value = '1234567893579518426'
    expect(checkValue(inputToCheck)).toBeNull()
  })
  test('if there is no minlength attribute throws an error asking to provide the attribute', () => {
    inputToCheck.removeAttribute('minlength')
    expect(() => {
      checkValue(inputToCheck)
    }).toThrow('Please provide the input with minlength attribute')
  })
  test('if there is no maxlength attribute throws an error asking to provide the attribute', () => {
    inputToCheck.removeAttribute('maxlength')
    expect(() => checkValue(inputToCheck)).toThrow(
      'Please provide the input with maxlength attribute'
    )
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
})

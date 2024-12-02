import { handleFormChange } from '../js/main'

describe('handleFormChange', () => {
  beforeEach(() => {
    document.body.innerHTML = `<section id="payment-section" class="payment section" hidden>     
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

            <div class="form__buttons">
              <button type="submit" class="btn jsBtn jsOrderBtn" data-type="primary" data-theme="dark">
                Place Order
              </button>
              <button type="button" class="btn jsBtn jsCancelBtn" data-type="secondary">
                Cancel Order
              </button>
            </div>

          </form>        
      </div>
    </section>`
  })

  test('does nothing when change event is from a non-input element', () => {
    const inputElement = document.querySelector('#card-holder-name')
    const inputElementWrapper = inputElement.parentElement
    const inputErrorContainer =
      inputElementWrapper.querySelector('.error-message')
    const cancleBtn = document.querySelector('.jsCancelBtn')
    const errorMessage = 'Use letters & hyphens for name & surname'
    const changeEvent = new Event('change', {
      bubbles: true
    })
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
    <p>${errorMessage}</p>`
    const expectedElement = document.createElement('div')
    const actualElement = document.createElement('div')

    inputElement.value = 'Jean-Paul'
    inputElement.setAttribute('data-valid', 'false')
    inputElementWrapper.classList.add('error')
    inputErrorContainer.innerHTML = `<svg
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
    <p>${errorMessage}</p>`
    expectedElement.innerHTML = expectedHTML.trim()
    actualElement.innerHTML = inputErrorContainer.innerHTML.trim()

    cancleBtn.dispatchEvent(changeEvent)

    handleFormChange(changeEvent)

    expect(inputElement.value).toBe('Jean-Paul')
    expect(inputElement.getAttribute('data-valid')).toBe('false')
    expect(inputElementWrapper.classList.contains('error')).toBeTruthy()
    expect(actualElement.isEqualNode(expectedElement)).toBeTruthy()
  })

  test('clears existing error if changed input is card expiry date form field with corrected data', () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const changedInput = document.querySelector('#card-expiry-date')
    const changedInputWrapper = changedInput.parentElement
    const changedInputErrorContainer =
      changedInputWrapper.querySelector('.error-message')
    const errorMessage = `Please provide card expiry date`
    const changeEvent = new Event('change', {
      bubbles: true
    })

    changedInputErrorContainer.innerHTML = `<svg
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
    <p>${errorMessage}</p>`
    changedInputWrapper.classList.add('error')
    changedInput.value = `${year}-${(month + 1).toString().padStart(2, '0')}`
    changedInput.dispatchEvent(changeEvent)

    handleFormChange(changeEvent)

    expect(changedInputWrapper.classList.contains('error')).toBeFalsy()
    expect(changedInputErrorContainer.innerHTML).toBe('')
    expect(changedInput.getAttribute('data-valid')).toBe('true')
  })

  test('capitalizes text when the changed input is card holder name form field', () => {
    const changedInput = document.querySelector('#card-holder-name')
    const changeEvent = new Event('change', {
      bubbles: true
    })

    changedInput.value = 'anna-maria kowalska'
    changedInput.dispatchEvent(changeEvent)

    handleFormChange(changeEvent)

    expect(changedInput.value).toBe('Anna-Maria Kowalska')
  })
  test('formats card number when the changed input is card number form field', () => {
    const changedInput = document.querySelector('#card-number')
    const changeEvent = new Event('change', {
      bubbles: true
    })

    changedInput.value = '5555153992639783'
    changedInput.dispatchEvent(changeEvent)

    handleFormChange(changeEvent)

    expect(changedInput.value).toBe('5555 1539 9263 9783')
  })
})

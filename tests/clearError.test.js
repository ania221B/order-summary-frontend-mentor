import { clearError } from '../js/main'

describe('clearError', () => {
  document.body.innerHTML = `<section id="payment-section" class="payment section" hidden>
      <div class="card payment-card container">
        <div class="card__img">
          <img src="images/illustration-hero.svg" alt="cartoon figure with headphones on their head dancing to music from a phone held in one hand with an outline of a city and music notes in the background">
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
    </section>`

  test('clears exising error message and error class from the control', () => {
    const cardHolderNameInput = document.querySelector('#card-holder-name')
    const cardHolderNameWrapper = cardHolderNameInput.parentElement
    const cardHoldeNameError =
      cardHolderNameWrapper.querySelector('.error-message')
    const errorMessage = 'Use letters & hyphens for name & surname'

    cardHoldeNameError.innerHTML = `<svg
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

    clearError(cardHolderNameInput)

    expect(cardHolderNameWrapper.classList.contains('error')).toBeFalsy()
    expect(cardHoldeNameError.innerHTML).toBe('')
  })

  test('does nothing when there is no error', () => {
    const cardHolderNameInput = document.querySelector('#card-holder-name')
    const cardHolderNameWrapper = cardHolderNameInput.parentElement
    const errorContainer = cardHolderNameWrapper.querySelector('.error-message')
    cardHolderNameWrapper.classList.remove('error')
    errorContainer.innerHTML = ''

    clearError(cardHolderNameInput)

    expect(cardHolderNameWrapper.classList.contains('error')).toBeFalsy()
    expect(errorContainer.innerHTML).toBe('')
  })
})

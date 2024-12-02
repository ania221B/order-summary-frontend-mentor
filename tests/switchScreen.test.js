import { switchScreen, clearError, resetForm } from '../js/main.js'

describe('switchScreen', () => {
  test('switches screens correctly when Subscribe button is clicked', () => {
    document.body.className = ''
    document.body.innerHTML = `<main>
      <section id="subscription-section" class="subscriptions section">
        <button type="button" class="btn jsBtn jsSubscribeBtn" data-type="primary" data-theme="dark">
                  Subscribe
                </button>
      </section>
  
      <section id="confirmation-section" class="confirmation section" hidden>
      </section>
  
      <section id="cancellation-section" class="cancellation section" hidden>
      </section>
  
      <section id="payment-section" class="payment section" hidden>
      </section>
  
      <section id="thank-you-section" class="thank-you section" hidden>
      </section>
    </main>
  
    <footer class="container">
      <div class="attribution">
      </div>
    </footer>`

    const clicledButton = document.querySelector('.jsSubscribeBtn')

    switchScreen(clicledButton)

    expect(document.body.getAttribute('data-state')).toBe('hide-screen')

    const hideScreenEvent = new Event('animationend')
    hideScreenEvent.animationName = 'hideScreen'
    document.body.dispatchEvent(hideScreenEvent)

    const sections = Array.from(document.querySelectorAll('.section'))
    const confirmationSection = sections.find(
      section => section.id === 'confirmation-section'
    )

    expect(confirmationSection).not.toBeNull()
    expect(confirmationSection.getAttribute('hidden')).toBeFalsy()
    expect(
      sections.filter(section => section.hasAttribute('hidden')).length
    ).toBe(4)

    expect(document.body.getAttribute('data-state')).toBe('reveal-screen')

    const revealScreenEvent = new Event('animationend')
    revealScreenEvent.animationName = 'revealScreen'
    document.body.dispatchEvent(revealScreenEvent)

    expect(document.body.hasAttribute('data-state')).toBeFalsy()
  })
  test('switches screens correctly when Change button is clicked', () => {
    document.body.className = ''
    document.body.innerHTML = `<main>
      <section id="subscription-section" class="subscriptions section" hidden>
        <button type="button" class="btn jsBtn jsSubscribeBtn" data-type="primary" data-theme="dark">
                  Subscribe
                </button>
      </section>
  
      <section id="confirmation-section" class="confirmation section">
        <div class="plan">
          <button type="button" class="btn jsBtn jsChangeBtn" data-type="primary" data-theme="link">
            Change
          </button>
        </div>
        <button type="button" class="btn jsBtn jsPaymentBtn" data-type="primary" data-theme="dark">
          Proceed to Payment
        </button>
        <button type="button" class="btn jsBtn jsCancelBtn" data-type="secondary">
          Cancel Order
        </button>
      </section>
  
      <section id="cancellation-section" class="cancellation section" hidden>
      </section>
  
      <section id="payment-section" class="payment section" hidden>
      </section>
  
      <section id="thank-you-section" class="thank-you section" hidden>
      </section>
    </main>
  
    <footer class="container">
      <div class="attribution">
      </div>
    </footer>`

    const clickedButton = document.querySelector('.jsChangeBtn')

    switchScreen(clickedButton)

    expect(document.body.getAttribute('data-state')).toBe('hide-screen')

    const hideScreenEvent = new Event('animationend')
    hideScreenEvent.animationName = 'hideScreen'
    document.body.dispatchEvent(hideScreenEvent)

    const sections = Array.from(document.querySelectorAll('.section'))
    const subscriptionsSection = sections.find(
      section => section.id === 'subscription-section'
    )

    expect(subscriptionsSection).not.toBeNull()
    expect(subscriptionsSection.getAttribute('hidden')).toBeFalsy()
    expect(
      sections.filter(section => section.hasAttribute('hidden')).length
    ).toBe(4)

    expect(document.body.getAttribute('data-state')).toBe('reveal-screen')

    const revealScreenEvent = new Event('animationend')
    revealScreenEvent.animationName = 'revealScreen'
    document.body.dispatchEvent(revealScreenEvent)

    expect(document.body.getAttribute('data-state')).toBeFalsy()
  })

  test('switches screens correctly when Proceed to Payment button is clicked', () => {
    document.body.className = ''
    document.body.innerHTML = `<main>
      <section id="subscription-section" class="subscriptions section" hidden>
        <button type="button" class="btn jsBtn jsSubscribeBtn" data-type="primary" data-theme="dark">
                  Subscribe
                </button>
      </section>
  
      <section id="confirmation-section" class="confirmation section">
        <div class="plan">
          <button type="button" class="btn jsBtn jsChangeBtn" data-type="primary" data-theme="link">
            Change
          </button>
        </div>
        <button type="button" class="btn jsBtn jsPaymentBtn" data-type="primary" data-theme="dark">
          Proceed to Payment
        </button>
        <button type="button" class="btn jsBtn jsCancelBtn" data-type="secondary">
          Cancel Order
        </button>
      </section>
  
      <section id="cancellation-section" class="cancellation section" hidden>
      </section>
  
      <section id="payment-section" class="payment section" hidden>
      </section>
  
      <section id="thank-you-section" class="thank-you section" hidden>
      </section>
    </main>
  
    <footer class="container">
      <div class="attribution">
      </div>
    </footer>`

    const clickedButton = document.querySelector('.jsPaymentBtn')

    switchScreen(clickedButton)

    expect(document.body.getAttribute('data-state')).toBe('hide-screen')

    const hideScreenEvent = new Event('animationend')
    hideScreenEvent.animationName = 'hideScreen'
    document.body.dispatchEvent(hideScreenEvent)

    const sections = Array.from(document.querySelectorAll('.section'))
    const paymentSection = sections.find(
      section => section.id === 'payment-section'
    )

    expect(paymentSection).not.toBeNull()
    expect(paymentSection.getAttribute('hidden')).toBeFalsy()
    expect(
      sections.filter(section => section.hasAttribute('hidden')).length
    ).toBe(4)

    expect(document.body.getAttribute('data-state')).toBe('reveal-screen')

    const revealScreenEvent = new Event('animationend')
    revealScreenEvent.animationName = 'revealScreen'
    document.body.dispatchEvent(revealScreenEvent)

    expect(document.body.getAttribute('data-state')).toBeFalsy()
  })

  test('switches screens correctly when Cancel Order button on confirmation screen is clicked', () => {
    document.body.className = ''
    document.body.innerHTML = `<main>
      <section id="subscription-section" class="subscriptions section" hidden>
        <button type="button" class="btn jsBtn jsSubscribeBtn" data-type="primary" data-theme="dark">
                  Subscribe
                </button>
      </section>
  
      <section id="confirmation-section" class="confirmation section">
        <div class="plan">
          <button type="button" class="btn jsBtn jsChangeBtn" data-type="primary" data-theme="link">
            Change
          </button>
        </div>
        <button type="button" class="btn jsBtn jsPaymentBtn" data-type="primary" data-theme="dark">
          Proceed to Payment
        </button>
        <button type="button" class="btn jsBtn jsCancelBtn" data-type="secondary">
          Cancel Order
        </button>
      </section>
  
      <section id="cancellation-section" class="cancellation section" hidden>
      </section>
  
      <section id="payment-section" class="payment section" hidden>
      </section>
  
      <section id="thank-you-section" class="thank-you section" hidden>
      </section>
    </main>
  
    <footer class="container">
      <div class="attribution">
      </div>
    </footer>`

    const clickedButton = document.querySelector('.jsCancelBtn')

    switchScreen(clickedButton)

    expect(document.body.getAttribute('data-state')).toBe('hide-screen')

    const hideScreenEvent = new Event('animationend')
    hideScreenEvent.animationName = 'hideScreen'
    document.body.dispatchEvent(hideScreenEvent)

    const sections = Array.from(document.querySelectorAll('.section'))
    const cancellationSection = sections.find(
      section => section.id === 'cancellation-section'
    )

    expect(cancellationSection).not.toBeNull()
    expect(cancellationSection.getAttribute('hidden')).toBeFalsy()
    expect(
      sections.filter(section => section.hasAttribute('hidden')).length
    ).toBe(sections.length - 1)

    expect(document.body.getAttribute('data-state')).toBe('reveal-screen')

    const revealScreenEvent = new Event('animationend')
    revealScreenEvent.animationName = 'revealScreen'
    document.body.dispatchEvent(revealScreenEvent)

    expect(document.body.getAttribute('data-state')).toBeFalsy()
  })

  test('switches screen correctly when Cancel Order button on payment screen is clicked', () => {
    document.body.className = ''
    document.body.innerHTML = `<main>
      <section id="subscription-section" class="subscriptions section" hidden>
        <button type="button" class="btn jsBtn jsSubscribeBtn" data-type="primary" data-theme="dark">
                  Subscribe
                </button>
      </section>
  
      <section id="confirmation-section" class="confirmation section">
      </section>
  
      <section id="cancellation-section" class="cancellation section" hidden>
      </section>
  
      <section id="payment-section" class="payment section" hidden>
         <form class="payment__form">
              <h2 class="h2">Payment Details</h2>
              <div class="form__control-wrapper">
              <label></label>
              <input type="text" required>
              <div class="error-message"></div>
              </div>
  
              <div class="form__control-wrapper">
              <label></label>
              <input type="text" required>
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
      </section>
  
      <section id="thank-you-section" class="thank-you section" hidden>
      </section>
    </main>
  
    <footer class="container">
      <div class="attribution">
      </div>
    </footer>`

    const clickedButton = document.querySelector('.jsCancelBtn')
    expect(
      clickedButton.closest('.section').classList.contains('payment')
    ).toBe(true)

    switchScreen(clickedButton)

    expect(document.body.getAttribute('data-state')).toBe('hide-screen')

    const firstInput = document.querySelector('.payment__form input')
    const firstInputError =
      firstInput.parentElement.querySelector('.error-message')

    firstInput.value = 'John'
    firstInputError.textContent = 'Use letters & hyphens for name & surname'

    const hideScreenEvent = new Event('animationend')
    hideScreenEvent.animationName = 'hideScreen'
    document.body.dispatchEvent(hideScreenEvent)

    expect(firstInput.value).toBe('')
    expect(firstInputError.textContent).toBe('')

    const sections = Array.from(document.querySelectorAll('.section'))
    const cancellationSection = sections.find(
      section => section.id === 'cancellation-section'
    )
    expect(cancellationSection).not.toBeNull()
    expect(cancellationSection.getAttribute('hidden')).toBeFalsy()
    expect(
      sections.filter(section => section.hasAttribute('hidden')).length
    ).toBe(sections.length - 1)

    expect(document.body.getAttribute('data-state')).toBe('reveal-screen')

    const revealScreenEvent = new Event('animationend')
    revealScreenEvent.animationName = 'revealScreen'
    document.body.dispatchEvent(revealScreenEvent)

    expect(document.body.getAttribute('data-state')).toBeFalsy()
  })

  test('switches screen correctly when Home button is clicked', () => {
    document.body.className = ''
    document.body.innerHTML = `<main>
      <section id="subscription-section" class="subscriptions section" hidden>
  
      </section>
  
      <section id="confirmation-section" class="confirmation section" hidden>
      </section>
  
      <section id="cancellation-section" class="cancellation section" hidden>
       <button type="button" class="btn jsBtn jsHomeBtn" data-type="primary" data-theme="dark">
              Back to Home
            </button>
      </section>
  
      <section id="payment-section" class="payment section" hidden>
         <form class="payment__form">
              <h2 class="h2">Payment Details</h2>
              <div class="form__control-wrapper">
              <label></label>
              <input type="text" required>
              <div class="error-message"></div>
              </div>
  
              <div class="form__control-wrapper">
              <label></label>
              <input type="text" required>
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
      </section>
  
      <section id="thank-you-section" class="thank-you section" hidden>
      </section>
    </main>
  
    <footer class="container">
      <div class="attribution">
      </div>
    </footer>`

    const clickedButton = document.querySelector('.jsHomeBtn')

    switchScreen(clickedButton)
    expect(document.body.getAttribute('data-state')).toBe('hide-screen')

    const hideScreenEvent = new Event('animationend')
    hideScreenEvent.animationName = 'hideScreen'
    document.body.dispatchEvent(hideScreenEvent)

    const sections = Array.from(document.body.querySelectorAll('.section'))
    const subscriptions = sections.find(
      section => section.id === 'subscription-section'
    )

    expect(subscriptions).not.toBeNull()
    expect(subscriptions.getAttribute('hidden')).toBeFalsy()
    expect(
      sections.filter(section => section.hasAttribute('hidden')).length
    ).toBe(sections.length - 1)

    expect(document.body.getAttribute('data-state')).toBe('reveal-screen')

    const revealScreenEvent = new Event('animationend')
    revealScreenEvent.animationName = 'revealScreen'
    document.body.dispatchEvent(revealScreenEvent)

    expect(document.body.getAttribute('data-state')).toBeFalsy()
  })
  test('switches screens correctly when Order button is clicked & the form is valid', async () => {
    document.body.className = ''
    document.body.innerHTML = `<main>
      <section id="subscription-section" class="subscriptions section" hidden>
      </section>
  
      <section id="confirmation-section" class="confirmation section" hidden>
      </section>
  
      <section id="cancellation-section" class="cancellation section" hidden>
      </section>
  
      <section id="payment-section" class="payment section form-valid">
         <form class="payment__form">
              <h2 class="h2">Payment Details</h2>
              <div class="form__control-wrapper">
              <label></label>
              <input type="text" required>
              <div class="error-message"></div>
              </div>
  
              <div class="form__control-wrapper">
              <label></label>
              <input type="text" required>
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
      </section>
  
      <section id="thank-you-section" class="thank-you section" hidden>
      </section>
    </main>
  
    <footer class="container">
      <div class="attribution">
      </div>
    </footer>`

    jest.useFakeTimers()
    jest
      .spyOn(window, 'getComputedStyle')
      .mockImplementation((element, pseudo) => {
        if (pseudo === '::before') {
          return {
            animationDuration: '500ms'
          }
        }
        return {}
      })

    const clickedButton = document.querySelector('.jsOrderBtn')
    const firstInput = document.querySelector('.payment__form input')
    const firstInputError =
      firstInput.parentElement.querySelector('.error-message')
    firstInput.value = 'John'
    firstInputError.textContent = 'Use letters & hyphens for name & surname'

    switchScreen(clickedButton)
    jest.runAllTimers()

    expect(document.body.getAttribute('data-state')).toBe('hide-screen')

    const hideScreenEvent = new Event('animationed')
    hideScreenEvent.animationName = 'hiseScreen'
    document.body.dispatchEvent(hideScreenEvent)

    setTimeout(() => {
      expect(
        clickedButton.closest('.section').classList.contains('form-valid')
      ).toBeTruthy()
      expect(
        getComputedStyle(document.body, '::before').animationDuration
      ).not.toBeFalsy()
      expect(
        getComputedStyle(document.body, '::before').animationDuration
      ).not.toBe('0s')
      expect(
        parseFloat(
          getComputedStyle(document.body, '::before').animationDuration
        )
      ).toBeGreaterThan(0)

      const sections = Array.from(document.querySelectorAll('section'))
      const thankYou = sections.find(
        section => section.id === 'thank-you-section'
      )

      expect(thankYou).not.toBeNull()
      expect(thankYou.getAttribute('hidden')).toBeFalsy()
      expect(
        sections.filter(section => section.hasAttribute('hidden')).length
      ).toBe(sections.length - 1)

      expect(firstInput.value).toBe('')
      expect(firstInputError.innerHTML).toBe('')
      expect(document.body.getAttribute('data-state')).toBe('reveal-screen')
    }, 500)

    const revealScreenEvent = new Event('animationend')
    revealScreenEvent.animationName = 'revealScreen'
    document.body.dispatchEvent(revealScreenEvent)

    expect(document.body.getAttribute('data-state')).toBeFalsy()
    window.getComputedStyle.mockRestore()
    jest.useRealTimers()
  })
  test('stays on the same screen when Order button is clicked but form is invalid', () => {
    document.body.className = ''
    document.body.innerHTML = `<main>
      <section id="subscription-section" class="subscriptions section" hidden>
      </section>
  
      <section id="confirmation-section" class="confirmation section" hidden>
      </section>
  
      <section id="cancellation-section" class="cancellation section" hidden>
      </section>
  
      <section id="payment-section" class="payment section form-invalid">
         <form class="payment__form">
              <h2 class="h2">Payment Details</h2>
              <div class="form__control-wrapper">
              <label></label>
              <input type="text" required>
              <div class="error-message"></div>
              </div>
  
              <div class="form__control-wrapper">
              <label></label>
              <input type="text" required>
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
      </section>
  
      <section id="thank-you-section" class="thank-you section" hidden>
      </section>
    </main>
  
    <footer class="container">
      <div class="attribution">
      </div>
    </footer>`

    const clickedButton = document.body.querySelector('.jsOrderBtn')

    switchScreen(clickedButton)

    expect(
      clickedButton.closest('.section').classList.contains('form-invalid')
    ).toBeTruthy()
    expect(document.body.getAttribute('data-state')).toBeFalsy()

    const sections = Array.from(document.body.querySelectorAll('.section'))
    const paymentSection = sections.find(
      section => section.id === 'payment-section'
    )

    expect(paymentSection).not.toBeNull()
    expect(paymentSection.getAttribute('hidden')).toBeFalsy()
    expect(
      sections.filter(section => section.hasAttribute('hidden')).length
    ).toBe(sections.length - 1)
  })
})

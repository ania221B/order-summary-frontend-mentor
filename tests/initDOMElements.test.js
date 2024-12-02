import { initDOMElements } from '../js/main.js'

describe('initDOMElemets', () => {
  beforeEach(() => {
    document.body.innerHTML = `<main>
      <section id="subscription-section" class="subscriptions section">
      </section>
  
      <section id="confirmation-section" class="confirmation section" hidden>
      </section>
  
      <section id="cancellation-section" class="cancellation section" hidden>
      </section>
  
      <section id="payment-section" class="payment section" hidden>
      <div class="card payment-card container">
          <div class="card__img">
          </div>
          <div class="card__content flow">
            <form class="payment__form">           
            </form>
          </div>
        </div>
      </section>
  
      <section id="thank-you-section" class="thank-you section" hidden>
      </section>
    </main>
  
    <footer class="container">
      <div class="attribution">     
      </div>
    </footer>`
  })

  test('initializes sections correctly', () => {
    const result = initDOMElements()
    expect(result.subscriptions).not.toBeNull()
    expect(result.confirmation).not.toBeNull()
    expect(result.cancellation).not.toBeNull()
    expect(result.payment).not.toBeNull()
    expect(result.thankYou).not.toBeNull()
    expect(result.payment.form).not.toBeNull()
  })
  test('selects all elements with .section class', () => {
    const { sections } = initDOMElements()
    expect(sections.length).toBe(5)
    expect(sections[0].id).toBe('subscription-section')
    expect(sections[1].id).toBe('confirmation-section')
    expect(sections[2].id).toBe('cancellation-section')
    expect(sections[3].id).toBe('payment-section')
    expect(sections[4].id).toBe('thank-you-section')
  })
  test('returns empty NodeList if there are no sections', () => {
    document.body.innerHTML = `<main>
      </main>
    <footer class="container">
      <div class="attribution">     
      </div>
    </footer>`
    const { sections } = initDOMElements()
    expect(sections.length).toBe(0)
  })
})

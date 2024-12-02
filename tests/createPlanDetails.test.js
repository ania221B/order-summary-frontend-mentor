import { createPlanDetails } from '../js/main.js'

describe('createPlanDetails', () => {
  test('correctly inserts plan details when no previous details exist', () => {
    document.body.innerHTML = `
      <section id='confirmation-section' class="confirmation section" hidden>
        <div class="card confirmation-card container">
          <div class="card__content flow">
            <header class="flow">
              <h2 class="h2">Order Summary</h2>
              <p></p>
            </header>
            <div class="plan">
              <img src="images/icon-music.svg" alt="">
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
          </div>
        </div>
      </section>
      `
    const selectedPlan = {
      type: 'Free',
      price: '$0.00/month'
    }
    createPlanDetails(selectedPlan)
    const planDetails = document.querySelector('.plan__details')

    expect(planDetails).not.toBeNull()
    expect(planDetails.innerHTML).toContain('<h3 class="h3">Free Plan</h3>')
    expect(planDetails.innerHTML).toContain('<p>$0.00/month</p>')
  })
  test('correctly inserts plan details when previous details already exist', () => {
    document.body.innerHTML = `
      <section id='confirmation-section' class="confirmation section" hidden>
        <div class="card confirmation-card container">
          <div class="card__content flow">
            <header class="flow">
              <h2 class="h2">Order Summary</h2>
              <p></p>
            </header>
            <div class="plan">
              <div class-"plan__details">
                <h3 class="h3">Annual Plan</h3>
                <p>$59.99/year</p>
              </div>
              <img src="images/icon-music.svg" alt="">
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
          </div>
        </div>
      </section>
      `
    const selectedPlan = {
      type: 'Free',
      price: '$0.00/month'
    }

    createPlanDetails(selectedPlan)

    const planDetailsElements = document.querySelectorAll('.plan__details')
    const planDetails = planDetailsElements[0]

    expect(planDetailsElements.length).toBe(1)
    expect(planDetails).not.toBeNull()
    expect(planDetails.innerHTML).toContain('<h3 class="h3">Free Plan</h3>')
    expect(planDetails.innerHTML).toContain('<p>$0.00/month</p>')
  })
})

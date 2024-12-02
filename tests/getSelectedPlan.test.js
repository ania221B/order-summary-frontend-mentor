import { capitalizeText } from '../js/utils.js'
import { getSelectedPlan } from '../js/main.js'

describe('getSelectedPlan', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <div class="card">
      <div class="card__img"></div>
      <div class="card__content card__content--subscription flow">
        <header class="flow">
          <h2 class="jsPlanType small-text">free</h2>
          <p class="h2 jsPrice">
            $0.00<span>/month</span>
          </p>
        </header>
  
      <button type="button" class="btn jsBtn jsSubscribeBtn" data-type="primary" data-theme="dark">
        Subscribe
      </button>
    </div>
  </div>
  
   <div class="card">
    <div class="card__img"></div>
    <div class="card__content card__content--subscription flow">
      <header class="flow">
        <h2 class="jsPlanType small-text">monthly</h2>
        <p class="h2 jsPrice">
          $7.99<span>/month</span>
        </p>
      </header>
  
      <button type="button" class="btn jsBtn jsSubscribeBtn" data-type="primary" data-theme="dark">
        Subscribe
      </button>
    </div>
  </div>
  
  <div class="card">
    <div class="card__img"></div>
    <div class="card__content card__content--subscription flow">
      <header class="flow">
        <h2 class="jsPlanType small-text">annual</h2>
        <p class="h2 jsPrice">
          $59.99<span>/year</span>
        </p>
      </header>
  
      <button type="button" class="btn jsBtn jsSubscribeBtn" data-type="primary" data-theme="dark">
        Subscribe
      </button>
    </div>
  </div>`
  })
  test('returns correct plan type and price for "free" plan', () => {
    const clickedButton = document.querySelector(
      '.card:first-child .jsSubscribeBtn'
    )
    const selectedPlan = getSelectedPlan(clickedButton)

    expect(selectedPlan).toEqual({
      type: capitalizeText('free'),
      price: '$0.00/month'
    })
  })
  test('returns correct plan type and price for "monthly" plan', () => {
    const clickedButton = document.querySelector(
      '.card:nth-child(2) .jsSubscribeBtn'
    )
    const selectedPlan = getSelectedPlan(clickedButton)

    expect(selectedPlan).toEqual({
      type: capitalizeText('monthly'),
      price: '$7.99/month'
    })
  })
  test('returns correct plan type and price for "annual" plan', () => {
    const clickedButton = document.querySelector(
      '.card:nth-child(3) .jsSubscribeBtn'
    )
    const selectedPlan = getSelectedPlan(clickedButton)

    expect(selectedPlan).toEqual({
      type: capitalizeText('annual'),
      price: '$59.99/year'
    })
  })
})

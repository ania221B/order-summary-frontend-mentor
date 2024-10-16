;(function () {
  if (!('inputmode' in document.createElement('input'))) {
    document
      .querySelectorAll('input[class="numeric-input"]')
      .forEach(function (input) {
        const mode = input.getAttribute('data-inputmode')
        input.setAttribute('inputmode', mode)
      })
  }
})()

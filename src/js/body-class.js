const bodyClass = {

  bodyObject: null,

  init: function () {
    this.addBasicBodyClassListeners()
  },

  addBasicBodyClassListeners: function () {
    document.addEventListener(
      'DOMContentLoaded',
      function (event) {
        bodyClass.bodyObject.classList.add('body-loaded')
        bodyClass.bodyObject.classList.remove('body-unloaded')
        if ('ontouchstart' in document.documentElement) {
          bodyClass.bodyObject.classList.add('touch')
        } else {
          bodyClass.bodyObject.classList.add('no-touch')
        }
        bodyClass.addRocketMode()
      }
    )
    window.addEventListener(
      'beforeunload',
      function () {
        // bodyClass.bodyObject.classList.add('body-unloaded')
      }
    )
  }

}

bodyClass.init()

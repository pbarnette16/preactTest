import { render, devtools } from 'preact'
import './index.sass'

let elem, App
const REMOTE_DB_URL = 'http://localhost:5984/'
let inventory = require('./util/schema.json')

function init () {
  window.sessionStorage.setItem('inventory', JSON.stringify(inventory))
  window.sessionStorage.setItem('cart', JSON.stringify(inventory))
  console.log('set inventory on first js')
  App = require('./views').default
  elem = render(App, document.getElementById('root'), elem)
}

init()

if (process.env.NODE_ENV === 'production') {
  // cache all assets if browser supports serviceworker
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('/service-worker.js')
  }

  // add Google Analytics
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
  m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
  ga('create', 'UA-XXXXXXXX-X', 'auto')
  ga('send', 'pageview')
} else {
  // use preact's devtools
  require('preact/devtools')
  // listen for HMR
  if (module.hot) {
    module.hot.accept('./views', init)
  }
}

import { h, Component } from 'preact'
import { Router } from 'preact-router'

import Home from './pages/home'
import Layout from './tags/layout'
import Error404 from './pages/errors/404'
import Cart from './pages/cart'
import Flower from './pages/flower'

// track pages on route change
let inventory = JSON.parse(window.sessionStorage.getItem('inventory'))
let cart = JSON.parse(window.sessionStorage.getItem('cart'))

const onChange = (obj) => {
  window.ga && ga('send', 'pageview', obj.url)
  inventory = JSON.parse(window.sessionStorage.getItem('inventory'))
  cart = JSON.parse(window.sessionStorage.getItem('cart'))
  console.log('route chage')
}

export default (
  <Layout>
    <Router onChange={onChange} >
      <Home path='/' inventory={inventory.schema.flowerShop} />
      <Flower path='/flower/:id' inventory={cart.schema.flowerShop} />
      <Cart path='/cart' />
      <Error404 default />
    </Router>
  </Layout>
  )

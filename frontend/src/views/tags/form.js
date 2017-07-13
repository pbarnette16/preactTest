import { h, render, Component } from 'preact'
import Button from 'preact-material-components/Button'
import Model from '../../util/model'
import Header from './header'
let bundlesCalc = require('../../util/returnCounts')

export default class Form extends Component {
  constructor (props) {
    super()
    this.state = {
      value: 0,
      bundles: props.bundle
    }
    this.bundle = props.bundle
    this.maxNumb = props.maxNumb
    this.model = new Model('cart')
    this.itemId = props.itemId
    this.cart = props.cart

    console.log('props cart', props.cart)
  }

  updateCart (e) {
    let inputVal = e.target.value
    inputVal = (inputVal <= this.maxNumb) ? inputVal : this.maxNumb

    this.setState(() => {
      return {value: inputVal,
        bundles: bundlesCalc.returnBundles(inputVal, this.bundle)}
    })
  }

  addToCart () {
    let inventory = JSON.parse(window.sessionStorage.getItem('inventory'))
    let currCart = JSON.parse(window.sessionStorage.getItem('cart'))
    let currState = this.state

    let foundItem = inventory.schema.flowerShop.find(item => {
      return item.id === this.itemId
    })

    foundItem.count -= currState.value

    // console.log(this.state)
    currCart.schema.flowerShop.find(item => {
      if (item.id === this.itemId && this.state.bundles.branch) {
        console.log(this.state)
        console.log('updating the cart %o', this.itemId, this.state.bundles.branch)
        item.bundles = this.state.bundles.branch
      }
    })

    window.sessionStorage.setItem('cart',
      JSON.stringify(currCart))

    window.sessionStorage.setItem('inventory',
      JSON.stringify(inventory))

    this.props.updateCart(foundItem)
  }

  render (props, state) {
    return (

      <div className='form'>

        <div class='group'>
          <input type='number' required min='0' max={props.maxNumb} onBlur={(item) => this.updateCart(item)} />
          <span class='highlight' />
          <span class='bar' />
          <label>Flowers to purchase</label>
        </div>
        <Button onClick={(e) => this.addToCart(e)} ripple primary raised>
       Add to cart
      </Button>
      </div>
    )
  }

}


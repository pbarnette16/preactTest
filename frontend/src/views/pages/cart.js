import { h, render, Component } from 'preact'
import { Link } from 'preact-router'
import Card from '../tags/card'
import CheckoutTable from '../tags/checkoutTable'
import Button from 'preact-material-components/Button'
import Snackbar from 'preact-material-components/Snackbar'

export default class Cart extends Component {
  constructor (props) {
    super()
  }

  componentDidMount () {
    let cart = JSON.parse(window.sessionStorage.getItem('cart'))
    this.setState({cart: cart.schema.flowerShop})
    // console.log('state cart', this.state.cart)
  }

  checkOut (e) {
    console.log('checkOut')
    this.bar.MDComponent.show({
      message: 'Thank you for your order!'
    })
  }

  render (props, state) {
    return (
      <div className='page page__article'>
        <Card>
          <h1>Check Out</h1>
          <Link href='/' className='back'>Back to Home</Link>
          <CheckoutTable cart={this.state.cart} />
          <Button onClick={(e) => this.checkOut(e)} ripple primary raised>
       Checkout
      </Button>
        </Card>
        <Snackbar ref={bar => { this.bar = bar }} />
      </div>
    )
  }
}

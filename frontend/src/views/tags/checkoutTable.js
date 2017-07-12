import { h, render, Component } from 'preact'
import { Link } from 'preact-router'
import Card from '../tags/card'
import TableBundle from '../tags/tableBundle'
import Form from '../tags/form'
import CheckoutTableBody from './CheckoutTableBody'

export default class CheckoutTable extends Component {
  constructor (props) {
    super()
    console.log('checkout cart', props)
    this.totalCost = 0
    this.preBundleCost = 0
  }

  componentWillReceiveProps (nextProps) {
    // console.log('nextProps', nextProps)
    var inBundles = nextProps.cart
    this.setState({cart: inBundles})
    // cleanCart(inBundles)
  }

  calculateTotal () {
    let cart = this.state.cart
    let total = []

    if (cart) {
      total = cart.map(item => {
        let bundles = item.bundles
        return bundles.map(bundle => {
          // find bundle items that have a count greater than zero
          if (bundle.count && bundle.count > 0) {
            return bundle.total
          }
        })
        .reduce((sum, num) => {
          // (num || 0) returns a 0 when num is undefined
          return sum + (num || 0)
        }, 0)
      })
    }

    this.totalCost = total.reduce((sum, num) => {
      return sum + num
    }, 0).toFixed(2)

    return `\$${this.totalCost}`
  }

  calculateSavings () {
    let cart = this.state.cart
    let total = []

    // calculate total cost first
    this.calculateTotal()

    if (cart) {
      total = cart.map(item => {
        let bundles = item.bundles
        return bundles.map(bundle => {
          // console.log('bundle %o', bundle.preTotal)
          if (bundle.preTotal && bundle.preTotal > 0) {
            // console.log('preTotal %o', bundle.preTotal)
            return bundle.preTotal
          }
        })
        .reduce((sum, num) => {
          // console.log('savings sum %o num %o', sum, num)
          return sum + (num || 0)
        }, 0)
      })
    }

    this.preBundleCost = total.reduce((sum, num) => {
      return sum + num
    }, 0).toFixed(2)
    // console.log('preBundleCost %o totalCost %o', this.preBundleCost, this.totalCost)

    return `($${(this.preBundleCost - this.totalCost).toFixed(2)})`
  }

  render (props, state) {
    return (
      <table className='checkoutTable'>
        <thead>
          <tr>
            <th>
            Flower
          </th>
            <th>
            Loose Count
          </th>
            <th>
              Breakdown
            </th>
            <th>
            Total
          </th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td />
            <td />
            <td>
            Bundle Savings
          </td>
            <td>
              {this.calculateSavings()}
            </td>
          </tr>
          <tr>
            <td />
            <td />
            <td>
            GST
          </td>
            <td>
            50
          </td>
          </tr>
          <tr>
            <td />
            <td />
            <td>
            Shipping
          </td>
            <td>
             -
          </td>
          </tr>
          <tr>
            <td />
            <td />
            <td>
            Total
          </td>
            <td>
              {this.calculateTotal()}
            </td>
          </tr>
        </tfoot>
        <CheckoutTableBody cart={this.state.cart} />
      </table>
    )
  }
}

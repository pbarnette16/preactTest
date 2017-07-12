import { h, render, Component } from 'preact'
import { Link } from 'preact-router'

export default class CheckoutTableBody extends Component {
  constructor (props) {
    super()
    this.setState({displayCart: []})
    console.log('checkout cart bundles', props)
  }

  componentWillReceiveProps (nextProps) {
    console.log('tableBody nextProps', nextProps)
    let inCart = Object.assign([], nextProps.cart)
    let displayCart = []

    inCart.map(item => {
      console.log(item)
      let tempBundle = item.bundles

      var activeBundles = tempBundle.filter(bundle => {
        return bundle.count > 0
      })

      if (activeBundles) {
        item.looseCount = activeBundles.map(bundle => {
          return bundle.count * bundle.bundleSize
        })
        .reduce((sum, num) => {
          return sum + num
        }, 0)

        activeBundles.map(activeBundle => {
          activeBundle.looseCount = item.looseCount
          activeBundle.name = item.name
          activeBundle.img = item.img
        })

        displayCart = displayCart.concat(activeBundles)
      }
      console.log('displayCart %o  typeof %o', displayCart, typeof displayCart)
      this.setState({displayCart: displayCart})
    })

    // cleanCart(inBundles)
  }

  render (props, state) {
    return (
      <tbody>
        {
          this.state.displayCart.map((item, num) => {
            return (
              <tr class={(num % 2) ? 'even' : 'odd'}>
                <td>
                  <span>{item.name}</span>
                  <img src={item.img} className='flowerList__img' />
                </td>
                <td>
                  {item.looseCount}
                </td>
                <td>
                  {item.count} X {item.bundleSize} ${item.price}
                </td>
                <td>
                  {item.total}
                </td>
              </tr>
            )
          })
        }
      </tbody>
    )
  }
}

import { h, render, Component } from 'preact'
import { Link } from 'preact-router'
import Card from '../tags/card'
import TableBundle from '../tags/tableBundle'
import Form from '../tags/form'

export default class Flower extends Component {
  constructor (props) {
    super()
    let cart = props.inventory.find(item => {
      return item.id === props.id
    })
    this.state = {
      item: cart
    }

    this.updateCart = this.updateCart.bind(this)
  }

  updateCart (cart) {
    console.log('returned from nested function', cart)
    this.setState({
      item: cart
    })
  }

  render (props, state) {
    return (
      <div className='page page__article'>
        <Card>
          <h1>{ state.item.name }</h1>
          <h2>Items remaing in inventory: {state.item.count}</h2>
          <Link href='/' className='back'>Back to Home</Link>
          <div class='flowerDetail'>
            <div>
              <img src={state.item.img} />
            </div>
            <div>
              <p>{state.item.description}</p>
              <TableBundle bundle={state.item.bundles} />
              <Form cart={state.cart} maxNumb={state.item.count} bundle={state.item.bundles} itemId={state.item.id}
                updateCart={this.updateCart} />
            </div>
          </div>

        </Card>
      </div>
    )
  }
}

import { h, render, Component } from 'preact'
import { Link, History } from 'preact-router'
import Toolbar from 'preact-material-components/Toolbar'
import Icon from 'preact-material-components/Icon'
import Button from 'preact-material-components/Button'
import User from '../../util/userModel'

var browserHistory = require('preact-router')

export default class Header extends Component {
  constructor () {
    super()
    // set initial name of the user
    this.user = new User()
    this.name = 'Ruby'
  }
  componentDidMount () {
    // update with call from pouchdb
    // console.log(this.user.getUser())

    window.addEventListener('storage', this.updateCartCount, false)
    let inventory = JSON.parse(window.sessionStorage.getItem('cart'))

    console.log(inventory)

    let cartCount = inventory.schema.flowerShop.map(item => {
      return item.bundles.map(bundle => {
        return bundle.count || 0
      })
        .reduce((sum, value) => {
          return sum + value
        })
    })
      .reduce((sum, value) => {
        return sum + value
      })

    console.log(cartCount)

    this.setState({ name: this.name, cartCount: cartCount})
  }
  handleClick () {
    browserHistory.route('/cart')
  }

  componentWillReceiveProps (nextProps) {
    // you can do something with incoming props here if you need
    console.log('will recieve props')
    this.setState({name: this.name, cartCount: nextProps.count})
  }

  componentWillUpdate (nextProps, nextState) {
    console.log('will update %o %o', nextProps, nextState)
  }

  updateCartCount (item) {
    console.log('update count ' + item)
    this.setState({
      name: this.name,
      cartCount: item
    })
    this.forceUpdate()
  }

  render (props, state) {
    return (
      <Toolbar className='header'>
        <Toolbar.Row>
          <Toolbar.Section align-start>
            <Toolbar.Icon>menu</Toolbar.Icon>
            <Toolbar.Title>
                  My App
                </Toolbar.Title>
          </Toolbar.Section>
          <Toolbar.Section align-end>
            <Button>
              <span>{state.name}</span>
              <Icon>person</Icon>
            </Button>
            <Button onClick={() => this.handleClick()}>
              <span>{state.cartCount}</span>
              <Icon>shopping_cart</Icon>
            </Button>
          </Toolbar.Section>
        </Toolbar.Row>
      </Toolbar>
    )
  }
}


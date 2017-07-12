import { h } from 'preact'
import { Link } from 'preact-router'
import Card from '../tags/card'

export default function (props) {
  return (
    <div className='page page__home'>
      <Card>
        <h1>Welcome to the Flower Shop</h1>
        <p>Your one stop shop for everything you need in your flower business.</p>

        <p>We have a number of new items which you can check out below.</p>
        <p>Also, know that we now have a new feature where we bundle orders to return you the greatest discount for your purchace.</p>
      </Card>

      <Card>
        <h2>Flowers on Special</h2>
        <nav>
          <ul className='flowerList'>
            {
          	props.inventory.map(item => {
        	return <li>

          <Link href={'/flower/' + item.id}>
            <img src={item.img} className='flowerList__img' />
            {item.name}

          </Link>
        		</li>
          })
        }
          </ul>
        </nav>
      </Card>

    </div>
  )
}

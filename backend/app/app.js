var nano = require('nano')('http://localhost:5984')
nano.db.create('books')
var books = nano.db.use('books')

// Insert a book document in the books database
books.insert({ name: 'The Art of war' }, null, function (err, body) {
  if (err) {
    console.log(err)
  } else {
    console.log('Added the book')
    console.log(body)
  }
})

// Get a list of all books
books.list(function (err, body) {
  if (err) {
    console.log(err)
  } else {
    console.log('List all the books')
    console.log(body.rows)
  }
})

const webpush = require('web-push')
// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys()
console.log(vapidKeys)

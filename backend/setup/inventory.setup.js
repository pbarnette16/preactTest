const schema = require('../app/inventory.schema.json')
const nano = require('nano')('http://localhost:5984')

var setup = function () {
  nano.db.create('inventory', function (err, body) {
    if (!err) {
      console.log('database inventory already created!')
    }
  }) // need to update this so that it doesnt keep creating the db
  var inventory = nano.db.use('inventory')

  inventory.list(function (err, body) {
    if (err) {
      console.log(err)
    } else {
      console.log('List all the inventory len ' + body.rows.length)

      // we dont have a key put it in the DB
      if (body.rows.length === 0) {
        inventory.bulk({'docs': schema.schema.flowerShop}, function (err, docs) {
          if (err) {
            console.log('Error loading the schema')
            console.log(err)
          }

          console.log('Loaded the inventory')
          console.log(docs)
        })
      }
      // console.log('localKey')
      // console.log(localKey)
    }
  })
}

module.exports = {
  populate: setup
}

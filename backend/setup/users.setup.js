const schema = require('../app/users.schema.json')
const nano = require('nano')('http://localhost:5984')

var setup = function () {
  nano.db.create('users', function (err, body) {
    if (!err) {
      console.log('database users already created!')
    }
  }) // need to update this so that it doesnt keep creating the db
  var users = nano.db.use('users')

  users.list(function (err, body) {
    if (err) {
      console.log(err)
    } else {
      console.log('List all the users len ' + body.rows.length)

      // we dont have a key put it in the DB
      if (body.rows.length === 0) {
        users.bulk({'docs': schema.schema.users}, function (err, docs) {
          if (err) {
            console.log('Error loading the user schema')
            console.log(err)
          }
          if (docs) {
            console.log('Loaded the users')
          }
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

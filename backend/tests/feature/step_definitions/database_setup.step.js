const cucumber = require('cucumber')
const nano = require('nano')('http://localhost:5984')
const cmd = require('node-cmd')

cucumber.defineSupportCode((steps) => {
  steps.Given('CouchDB is running', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    cmd.get('curl http://127.0.0.1:5984/',
      function (err, data, stdrr) {
        if (err) {
          console.log('err' + err)
        }

        if (data) {
          // console.log('data' + data)
          var couchdbResponse = JSON.parse(data)
          if (couchdbResponse.couchdb === 'Welcome') {
            callback()
          }
        }
      }
    )
  })
  steps.Given('the setup has been run', function (callback) {
        // Write code here that turns the phrase above into concrete actions
    nano.db.list(function (err, data, stdrr) {
      if (err) {
        console.log('err' + err)
      }

      if (data.indexOf('books') > -1 &&
        data.indexOf('inventory') > -1 &&
        data.indexOf('push-keys') > -1) {
        // console.log('data' + data)
        callback()
      }
    })
  })

  steps.Then('a single row should be returned from the Push DB table', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    var pushKeys = nano.db.use('push-keys')
    pushKeys.list(function (err, body) {
      if (err) {
        console.log(err)
      } else {
      // we dont have a key put it in the DB
        if (body.rows.length === 1) {
          callback()
        }
      // console.log('localKey')
      // console.log(localKey)
      }
    })
  })

  steps.Then('you will find the users table', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    var users = nano.db.use('users')

    users.list(function (err, body) {
      if (err) {
        console.log(err)
      }

        // we dont have a key put it in the DB
      if (body.rows.length > 0) {
        callback()
      }
    })
  })

  steps.Then('you will find the inventory table', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    var inventory = nano.db.use('inventory')

    inventory.list(function (err, body) {
      if (err) {
        console.log(err)
      }

        // we dont have a key put it in the DB
      if (body.rows.length > 0) {
        callback()
      }
      // console.log('localKey')
      // console.log(localKey)
    })
  })
})

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
    callback(null, 'pending')
  })
  steps.When('you query the push db', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })
  steps.Then('a single row should be returned', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })
  steps.Then('you will find the users table', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending')
  })
})

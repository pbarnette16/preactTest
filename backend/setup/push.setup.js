const webpush = require('web-push')
const nano = require('nano')('http://localhost:5984')

var setup = function () {
  // VAPID keys should only be generated only once.
  const vapidKeys = webpush.generateVAPIDKeys()
  if (vapidKeys.publicKey && vapidKeys.privateKey) {
    nano.db.create('push-keys', function (err, body) {
      if (!err) {
        console.log('database push-keys already created!')
      }
    }) // need to update this so that it doesnt keep creating the db
    var pushKeys = nano.db.use('push-keys')
    pushKeys.list(function (err, body) {
      if (err) {
        console.log(err)
      } else {
        console.log('List all the keys len ' + body.rows.length)

      // we dont have a key put it in the DB
        if (body.rows.length === 0) {
          pushKeys.insert(vapidKeys, null, function (err, body) {
            if (err) {
              console.log(err)
            } else {
              console.log('Added the pushKeys to the couchdb')
              setVapidDetails(vapidKeys)
              console.log('Push notifications set up')
            }
          })
        } else {
          getRowData(body.rows[0].id).then(function (data) {
            setVapidDetails(data)
            console.log('Push notifications set up')
          })
        }
      // console.log('localKey')
      // console.log(localKey)
      }
    })
  }
}

var getRowData = function (id) {
  var pushKeys = nano.db.use('push-keys')
  return new Promise(function (resolve, reject) {
    pushKeys.get(id, function (err, body) {
      if (!err) {
        return resolve(body)
      }
    })
  })
}

var setVapidDetails = function (keys) {
  webpush.setVapidDetails(
  'mailto:paul.barnette@gmail.com',
  keys.publicKey,
  keys.privateKey
)
}

module.exports = {
  setup: setup
}

const cmd = require('node-cmd')
const webpush = require('web-push')
const nano = require('nano')('http://localhost:5984')

// Set couch running
cmd.get('brew services start couchdb',
   function (err, data, stdrr) {
     if (err) {
       console.log('starting couchdb error: ' + err)
     }
     if (data) {
       console.log('started couchdb ' + data)
     }
   }
 )

cmd.get('curl http://127.0.0.1:5984/',
  function (err, data, stdrr) {
    if (err) {
      console.log('err' + err)
    }

    if (data) {
      // console.log('data' + data)
      var couchdbResponse = JSON.parse(data)
      if (couchdbResponse.couchdb === 'Welcome') {
        console.log('Couch is installed properly')
      }
    }
  }
)

cmd.get('add-cors-to-couchdb',
  function (err, data, stdrr) {
    if (err) {
      console.log('CouchDB unable to add CORS requests')
    }
    if (data) {
      console.log('Added CORS to Couchdb')
    }
  }
)

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys()
if (vapidKeys.publicKey && vapidKeys.privateKey) {
  nano.db.create('push-keys') // need to update this so that it doesnt keep creating the db
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

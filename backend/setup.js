var cmd = require('node-cmd')

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

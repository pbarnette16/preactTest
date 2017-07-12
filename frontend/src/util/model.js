import PouchDB from 'pouchdb'

const REMOTE_DB_URL = 'http://localhost:5984/'

export default class Models {
  constructor (table) {
    var self = this

    this.remoteDBURL = REMOTE_DB_URL + table

    // init
    this.localDB = new PouchDB(table)
    this.localDB.changes({
      since: 'now',
      live: true
    }).on('change', function () {
      // something change
      console.log('localDB.change')
      self.draw()
      self.syncAndDraw()
    }).on('error', function (err) {
      // totally unhandled error (shouldn't happen)
      console.log('localDB.error : ', err)
    })

    // draw with localDB
    this.draw()

    // then sync with remoteDB
    this.remoteDB = new PouchDB(this.remoteDBURL)
    this.syncAndDraw()
  }

  draw () {
    var self = this
    this.localDB.allDocs({ include_docs: true, descending: true }, function (err, doc) {
      if (err) return
      // console.log(doc.rows)
      try {
        if (doc && doc.rows.length > 0) {
          var item = doc.rows.map(items => items.doc)
          // TODO : dirty check
          self.item = item
          self.publish()
        }
      } catch (e) {
        console.log(e)
      }
    })
  }

  subscribe (fn) {
    this.onChanges.push(fn)
  }

  publish () {
    if (this.onChanges && this.onChanges.length > 0) {
      this.onChanges.forEach(cb => cb())
    }
  }

  syncAndDraw () {
    var self = this
    // sync with remote
    this.localDB.sync(this.remoteDB).on('change', function () {
      // something change
      console.log('remoteDB.change')
      self.draw()
    }).on('remoteDB.paused', function (info) {
      // replication was paused, usually because of a lost connection
      console.log('remoteDB.paused : ', info)
    }).on('active', function (info) {
      // replication was resumed
      console.log('remoteDB.active : ', info)
    }).on('error', function (err) {
      // totally unhandled error (shouldn't happen)
      console.log('remoteDB.error : ', err)
    })
  }

  addItem (inventoryItem) {
    var cartItem = {
      '_id': new Date().toISOString(),
      'title': title,
      'completed': false
    }

    this.localDB.put(cartItem, function callback (err, result) {
      if (!err) {
        console.log('Successfully added an item to the cart!')
      }
    })
  }

  destroy (item) {
    this.localDB.remove(item)
  }

  save (itemToSave, title) {
    this.localDB.put(itemToSave)
  }

  returnItem () {
    return this.item
  }

}

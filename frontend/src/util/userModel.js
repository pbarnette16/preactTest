import PouchDB from 'pouchdb'
import Models from './model'

export default class User extends Models {
  constructor () {
    super('users')
    this.syncAndDraw()
    this.draw()
  }
  getUser () {
    return this.returnItem()
  }
}

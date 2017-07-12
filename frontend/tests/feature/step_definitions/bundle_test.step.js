const cucumber = require('cucumber')
const utilLib = require('../../../src/util/returnCounts.js')
const testStruct = {
  'schema': {
    'ver': 1.0,
    'flowerShop': [{
      'id': 'R12',
      'name': 'Roses',
      'bundles': [{
        'price': 6.99,
        'bundleSize': 5,
        'count': 0
      }, {
        'price': 12.99,
        'bundleSize': 10,
        'count': 0
      }],
      'count': 53
    }, {
      'id': 'L09',
      'name': 'Lilies',
      'bundles': [{
        'price': 9.95,
        'bundleSize': 3,
        'count': 0
      }, {
        'price': 16.95,
        'bundleSize': 6,
        'count': 0
      }, {
        'price': 24.95,
        'bundleSize': 9,
        'count': 0
      }],
      'count': 65
    }, {
      'id': 'T58',
      'name': 'Tulips',
      'bundles': [{
        'price': 5.95,
        'bundleSize': 3,
        'count': 0
      }, {
        'price': 9.95,
        'bundleSize': 5,
        'count': 0
      }, {
        'price': 16.99,
        'bundleSize': 9,
        'count': 0
      }],
      'count': 17
    }]
  }
}

cucumber.defineSupportCode((steps) => {
  steps.Given('I have included the util library', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    if (utilLib.hasOwnProperty('returnBundles')) {
      callback(null)
    }
  })

  steps.Given('<input> <flower> <type> are entered', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null)
  })

  steps.Then('<bundle> bundle of <bundleItems> will be returned <cost>', function (callback) {
         // Write code here that turns the phrase above into concrete actions
    callback(null)
  })

  steps.Then('the total cost will be <total>', function (table, callback) {
    // Write code here that turns the phrase above into concrete actions
    var testBundle, result, shopObj, pastTest = true
    testBundle = testStruct.schema.flowerShop

    // console.log(testBundle)

    table.rawTable.forEach((item, a) => {
      if (a === 0) return

      shopObj = testBundle.filter((obj) => {
        return obj.id === item[1]
      })

      shopObj = Object.assign({}, shopObj[0])
      result = null
      // console.log(shopObj.bundles)
      shopObj.bundles.map((itm) => {
        itm.count = 0
      })

      result = utilLib.returnBundles(parseInt(item[0]), shopObj.bundles)

      if (result.branch.length > 0) {
        // console.log(result.branch)
        let compareObj = {
          count: parseInt(item[2]),
          bundleSize: parseInt(item[3]),
          price: parseFloat(item[4]).toFixed(2),
          total: parseFloat(item[5]).toFixed(2)
        }

        pastTest = compare(result.branch, compareObj)
      }
      // console.log(item)
      // console.log(a)
    })

    if (!pastTest) {
      callback(null, 'pending')
    } else {
      callback(null)
    }
  })
})

let compare = (foundItem, compareObj) => {
  // console.log(compareObj)
  let testObj = false
  let compare = false

  testObj = foundItem.find((itm) => {
    return itm.bundleSize === compareObj.bundleSize
  })

  let total = foundItem.reduce((sum, value) => {
    return sum + value.total
  }, 0).toFixed(2)

  if (testObj.count === compareObj.count && testObj.bundleSize === compareObj.bundleSize &&
    testObj.price.toFixed(2) === compareObj.price && total === compareObj.total) {
    compare = true
  }
  return compare
}

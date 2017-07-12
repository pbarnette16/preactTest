/**
 * @returnCounts
 * Returns the counts and the remainder when given a number. Updates the inventory.
 * Reballences the branches to save the user money
 * Gives the option for the interface to deal with the remainder.
 *
 */

/**
* @findBundles
*
* @param {number} startNum - The input for finding the bundles
* @param {object} inArr - An array containing the bundle object for iteration
* @returns {object} - Returns the remainder if any, and a breakdown of the bundles
*
* A recursive function finds the smallest bundle size, this gets fixed later
*/

let findBundles = (startNum, inArr) => {
  var remainder = parseInt(startNum, 10)
  var arrPos = 0
  // Check to see if the remainder is still greater than the smallest bundle
  // cant go smaller than that
  if (remainder >= inArr[0].bundleSize) {
    // See if there's any combination that doesnt have a remainder
    var branch = inArr.map((item) => {
      return (remainder % item.bundleSize === 0)
    })
    // If i found a clean modulo use it
    if (branch.indexOf(true) > -1) {
      remainder -= inArr[branch.indexOf(true)].bundleSize
      inArr[branch.indexOf(true)].count++
    } else {
      // didnt find a clean modulo take the smallest number
      remainder -= inArr[arrPos].bundleSize
      inArr[arrPos].count++
    }
    // try again to reduce the counts
    return findBundles(remainder, inArr)
  }
  return {remainder: remainder, branch: inArr}
}

/**
* @reballanceBundle
*
* @param {object} inArr - Find bundles object
*
* A function that resets the bundles to find the largest possible combo
* based on the breakdown from find bundles
*/

let reballanceBundle = (inArr) => {
  var reballanceArr = Object.assign({}, inArr)
  var temp = reballanceArr

 // iterate over all the items
  temp.branch.forEach((item) => {
    if (item.count > 0) {
      // start at the largest count and work backwards to 1
      for (var i = item.count, tempNum = 0; i > 1; i--, tempNum = 0) {
        tempNum = i * item.bundleSize
        var matchNum = i
        // check to see if the bundle size is in the bundle array
        // somewhere else
        var foundItem = temp.branch.find((obj) => {
          return obj.bundleSize === tempNum
        })
        // Found a match, swap some numbers and counts around
        // send the bundle obj, the lower item of the match
        // the number that matches
        // and the higher item found
        if (foundItem) {
          reballanceArr = swapBundleCounts(reballanceArr, item, matchNum, foundItem)
        }
      }
    }
  })
  return reballanceArr
}

/**
* @swapBundleCounts
*
* @param {object} reballanceArr - The bundle object
* @param {object} a             - The smaller bundle object to be decresed in count
* @param {number} matchNum      - the count number that relates to a higher bundle size
* @param {object} b             - The larger bundle object to be increased in count
*
* @return {object} reballanceArr - the changed array
* A recursive function finds the smallest bundle size, this gets fixed later
*/

let swapBundleCounts = (reballanceArr, a, matchNum, b) => {
  var branch = reballanceArr.branch
  // Update the larger object
  branch.find((obj) => {
    if (obj.bundleSize === b.bundleSize) {
      obj.count++
    }
  })

  // Decrease the smaller object
  // make sure we're not doing anything with negative match numbers
  branch.find((obj) => {
    if (obj.bundleSize === a.bundleSize && matchNum > 0) {
      obj.count -= matchNum
    }
  })

  return reballanceArr
}

let calculatePreBundleCost = (inArr) => {
  var reballanceArr = Object.assign({}, inArr)
  reballanceArr.branch.map((item) => {
    item.preTotal = item.count * item.price
  })
  return reballanceArr
}

let calculateBundleCost = (inArr) => {
  var reballanceArr = Object.assign({}, inArr)
  reballanceArr.branch.map((item) => {
    item.total = item.count * item.price
  })
  return reballanceArr
}

// Zero out the count so that maths can be done on the object counts
let prepBundles = (inArr) => {
  var prepArr = Object.assign([], inArr)
  prepArr.map(item => {
    item.count = 0
  })
  return prepArr
}

// could be chained but keep this way for clarity
// The complier will reoragize anyway
let returnBundles = (input, inArr) => {
  var tempArr = prepBundles(inArr)
  var result = findBundles(input, tempArr)
  result = calculatePreBundleCost(result)
  result = reballanceBundle(result)
  result = calculateBundleCost(result)
  console.log('return bundles %o', result)
  return result
}

module.exports = {
  returnBundles: returnBundles
}

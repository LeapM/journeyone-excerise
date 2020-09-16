/**
 *
 * @param {String} productCode
 * @param {Number} orderSize
 * @param {Array} bundleBreakdown
 * @param {Array} bundleInfo
 */
export function generateReport(productCode, orderSize, prices, bundleBreakdown) {
  const orderItems = bundleBreakdown
    .slice()
    .sort((a, b) => a - b)
    .reduce((accum, val) => {
      accum[val] = accum[val] || { bundleSize: val, numberOfBundle: 0, cost: 0 }
      accum[val].numberOfBundle += 1
      accum[val].cost += prices[val]
      return accum
    }, {})

  const total = Object.values(orderItems).reduce((accum, val) => accum + val['cost'], 0)

  console.log(`${orderSize} ${productCode} $${total} `)
  Object.values(orderItems)
    .sort((a, b) => b.bundleSize - a.bundleSize)
    .forEach((v) => console.log(`   ${v.numberOfBundle} X ${v.bundleSize} $${v.cost}`))
}

/**
 *
 * @param {Array} bundleInfo
 */
export function generateBundlePrices(bundleInfo) {
  return bundleInfo.reduce((accum, val) => {
    accum[val.size] = val.price
    return accum
  }, {})
}

let memo = {}
/**
 * @param {Number} orderSize
 * @param {Array} bundleInfos
 * @param {String} productCode
 * @return {null | Array} null means cannot generate bundle breakdown
 */
export function generateBundleBreakdown(orderSize, bundleInfos, productCode) {
  if (orderSize === 0) {
    return []
  }
  const key = productCode + '_' + orderSize

  if (memo.hasOwnProperty(key)) {
    return memo[key]
  }

  bundleInfos.sort((a, b) => b.size - a.size)

  let result = null

  for (let bundleInfo of bundleInfos) {
    if (orderSize >= bundleInfo.size) {
      const bundlesWithNewOrderSize = generateBundleBreakdown(
        orderSize - bundleInfo.size,
        bundleInfos
      )
      if (bundlesWithNewOrderSize !== null) {
        const bundleBreakdown = [bundleInfo.size, ...bundlesWithNewOrderSize]
        if (result === null || result.length > bundleBreakdown.length) {
          result = bundleBreakdown
        }
      }
    }
  }
  //   console.log('result', result)
  memo[key] = result && result.sort((a, b) => b - a)
  return memo[key]
}

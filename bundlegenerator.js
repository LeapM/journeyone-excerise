/**
 * @param {Number} orderSize
 * @param {Array} bundleInfos
 * @return {null | Array} null means cannot generate bundle breakdown
 */
export function generateBundleBreakdown(orderSize, bundleInfos) {
  if (orderSize === 0) {
    return []
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
  return result && result.sort((a, b) => b - a)
}

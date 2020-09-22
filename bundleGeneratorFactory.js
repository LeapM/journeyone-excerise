/**
 * @param {Array} bundleInfos
 * @param {boolean} enableMemo this flag controls if the memorization optimisation is enabled
 * @param {Function} breakdownCompareFunction this function compares the breakdown.
 */
export function make(bundleInfo, breakdownCompareFunction, enableMemo = true) {
  /**
   * @param {Number} orderSize
   * @return {Array} returm empty array when cannot generate bundle breakdown
   */
  return function (orderSize) {
    return generateBundleBreakdown(
      orderSize,
      bundleInfo,
      breakdownCompareFunction,
      enableMemo ? {} : null
    ).sort((a, b) => b - a)
  }
}

/**
 * bundle breakdown with less element is better but empty array is the worst
 * @param {Array} a bundle breakdown array
 * @param {Array} b  bundle breakdown array
 */
export function comparatorForMinimumBundleNumberStrategy(a, b) {
  if (a.length === 0 && b.length > 0) {
    return -1
  }
  if (b.length === 0 && a.length > 0) {
    return 1
  }

  return b.length - a.length
}

const isValidBunldeBreakdown = (a) => a.length > 0
/**
 *
 * @return {Array}
 */
function generateBundleBreakdown(orderSize, bundleInfos, comparator, memo) {
  if (memo.hasOwnProperty(orderSize)) {
    return memo[orderSize]
  }

  let result = []

  for (let bundleInfo of bundleInfos) {
    let bundleBreakdown = []
    if (orderSize === bundleInfo.size) {
      bundleBreakdown = [orderSize]
    } else if (orderSize > bundleInfo.size) {
      const bundlesWithNewOrderSize = generateBundleBreakdown(
        orderSize - bundleInfo.size,
        bundleInfos,
        comparator,
        memo
      )
      if (isValidBunldeBreakdown(bundlesWithNewOrderSize)) {
        bundleBreakdown = [bundleInfo.size, ...bundlesWithNewOrderSize]
      }
    }

    // update the result if the new bundlebreakdown is better than existing one
    if (comparator(bundleBreakdown, result) > 0) {
      result = bundleBreakdown
    }
  }
  memo[orderSize] = result
  return memo[orderSize]
}

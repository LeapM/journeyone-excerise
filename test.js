import { generateBundleBreakdown } from './bundlegenerator.js'

const isBundleBreakdownEqual = (a1, a2) => {
  if (a1 === null && a2 === null) {
    return true
  }

  if (a1 !== null && a2 === null) {
    return false
  }

  if (a1 === null && a2 !== null) {
    return false
  }

  return a1.length === a2.length && a1.every((val, index) => val === a2[index])
}
const testCases = [
  {
    input: {
      orderSize: 1,
      bundleInfos: [{ size: 1, price: 6.99 }],
    },
    expected: [1],
  },
  {
    input: {
      orderSize: 10,
      bundleInfos: [
        { size: 5, price: 6.99 },
        { size: 10, price: 12.99 },
      ],
    },
    expected: [10],
  },
  {
    input: {
      orderSize: 15,
      bundleInfos: [
        { size: 3, price: 9.95 },
        { size: 6, price: 16.95 },
        { size: 9, price: 24.95 },
      ],
    },
    expected: [9, 6],
  },
  {
    input: {
      orderSize: 13,
      bundleInfos: [
        { size: 3, price: 5.95 },
        { size: 5, price: 9.75 },
        { size: 9, price: 16.99 },
      ],
    },
    expected: [5, 5, 3],
  },
  {
    input: {
      orderSize: 7,
      bundleInfos: [
        { size: 3, price: 5.95 },
        { size: 5, price: 9.75 },
      ],
    },
    expected: null,
  },
]

testCases.forEach(({ input, expected }, index) => {
  const bundles = generateBundleBreakdown(input.orderSize, input.bundleInfos)
  if (isBundleBreakdownEqual(bundles, expected)) {
    console.log(`testcase ${index} passed`)
  } else {
    console.error(
      `testcase ${index} failed, expected result [${expected}], actually result [${bundles}]`
    )
  }
})

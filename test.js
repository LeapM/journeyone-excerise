import { generateBundleBreakdown } from './bundlegenerator.js'

const isArrayEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((val, index) => val === a2[index])

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
      orderSize: 15,
      bundleInfos: [
        { size: 5, price: 6.99 },
        { size: 10, price: 12.99 },
      ],
    },
    expected: [5, 10],
  },
]

testCases.forEach(({ input, expected }, index) => {
  const bundles = generateBundleBreakdown(input.orderSize, input.bundleInfos)
  if (isArrayEqual(bundles, expected)) {
    console.log(`testcase ${index} passed`)
  } else {
    console.error(
      `testcase ${index} failed, expected result [${expected}], actually result [${bundles}]`
    )
  }
})

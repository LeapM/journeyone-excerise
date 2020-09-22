import {
  make as makeBreakdownFunction,
  comparatorForMinimumBundleNumberStrategy as comparatorForMinBundleNumber,
} from './bundleGeneratorFactory.js'

const comparatorWithMaxBundleNumber = (a, b) => {
  if (a.length === 0 && b.length > 0) {
    return -1
  }
  if (b.length === 0 && a.length > 0) {
    return 1
  }

  return a.length - b.length
}

// // const generate = makeBreakdownFunction(
// //   [
// //     { size: 1, price: 6.99 },
// //     { size: 2, price: 6.99 },
// //     { size: 3, price: 6.99 },
// //     { size: 5, price: 6.99 },
// //     { size: 10, price: 12.99 },
// //   ],
// //   comparatorWithMinBundleNumber
// // )(20)

// // console.log('result', generate)

// const generateMax = makeBreakdownFunction(
//   [
//     { size: 1, price: 6.99 },
//     { size: 2, price: 6.99 },
//     // { size: 3, price: 6.99 },
//     // { size: 10, price: 12.99 },
//   ],
//   comparatorWithMaxBundleNumber
// )(2)
// console.log('result', generateMax)
const testCases = [
  {
    input: {
      orderSize: 1,
      bundleInfos: [{ size: 1, price: 6.99 }],
    },
    expectedWithMin: [1],
    expectedWithMax: [1],
  },
  {
    input: {
      orderSize: 10,
      bundleInfos: [
        { size: 5, price: 6.99 },
        { size: 10, price: 12.99 },
      ],
    },
    expectedWithMin: [10],
    expectedWithMax: [5, 5],
  },
  {
    input: {
      orderSize: 20,
      bundleInfos: [
        { size: 3, price: 6.99 },
        { size: 5, price: 6.99 },
        { size: 10, price: 12.99 },
      ],
    },
    expectedWithMin: [10, 10],
    expectedWithMax: [5, 3, 3, 3, 3, 3],
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
    expectedWithMin: [9, 6],
    expectedWithMax: [3, 3, 3, 3, 3],
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
    expectedWithMin: [5, 5, 3],
    expectedWithMax: [5, 5, 3],
  },
  {
    input: {
      orderSize: 7,
      bundleInfos: [
        { size: 3, price: 5.95 },
        { size: 5, price: 9.75 },
      ],
    },
    expectedWithMin: [],
    expectedWithMax: [],
  },
]

testCases.forEach(({ input, expectedWithMin, expectedWithMax }, index) => {
  const generateMinBundleBreakdown = makeBreakdownFunction(
    input.bundleInfos,
    comparatorForMinBundleNumber
  )
  const generateMaxBundleBreakdown = makeBreakdownFunction(
    input.bundleInfos,
    comparatorWithMaxBundleNumber
  )
  const minBundles = generateMinBundleBreakdown(input.orderSize)
  const maxBundles = generateMaxBundleBreakdown(input.orderSize)

  if (comparatorForMinBundleNumber(minBundles, expectedWithMin) === 0) {
    console.log(`minimum bundle number testcase ${index} passed`)
  } else {
    console.error(
      `minimum bunlde number testcase ${index} failed, expected result [${expectedWithMax}], actually result [${minBundles}]`
    )
  }

  if (comparatorForMinBundleNumber(maxBundles, expectedWithMax) === 0) {
    console.log(`maximum bundle number testcase ${index} passed`)
  } else {
    console.error(
      `maximum bunlde number testcase ${index} failed, expected result [${expectedWithMax}], actually result [${maxBundles}]`
    )
  }
})

// generateReport('HB24', 10, { 5: 11.11, 10: 22.22 }, [10, 5, 5, 10, 5])

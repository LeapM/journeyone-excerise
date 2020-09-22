import {
  make as makeBreakdownFunction,
  comparatorForMinimumBundleNumberStrategy,
} from './bundleGeneratorFactory.js'
import readline from 'readline'
import { generateReport, generateBundlePrices } from './reportgenerator.js'
const bundles = {
  HB24: [
    { size: 5, price: 6.99 },
    { size: 10, price: 12.99 },
  ],
  PPM3: [
    { size: 3, price: 9.95 },
    { size: 6, price: 16.95 },
    { size: 9, price: 24.95 },
  ],
  BP19: [
    { size: 3, price: 5.95 },
    { size: 5, price: 9.75 },
    { size: 9, price: 16.99 },
  ],
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log(
  'Please type you order in the format {ProductCode} {OrderSize}, such as HB24 10. Press Enter'
)

console.log('Type end, press Enter to finish the program')
rl.on('line', function (order) {
  if (order == 'end') {
    rl.close()
    process.exit()
  }
  const [productCode, orderSize] = order.split(' ')
  console.log(
    `generating bundle breakdown for product code ${productCode}, order size ${orderSize}`
  )
  const generateBundleBreakdown = makeBreakdownFunction(
    bundles[productCode],
    comparatorForMinimumBundleNumberStrategy
  )
  // force ordersize to be number
  const bundleBreakdown = generateBundleBreakdown(orderSize - 0)
  const prices = generateBundlePrices(bundles[productCode])
  if (bundleBreakdown !== null) {
    generateReport(productCode, orderSize, prices, bundleBreakdown)
  } else {
    console.log('sorry, cannot generate bundle breakdown. please try different ordersize')
  }
})

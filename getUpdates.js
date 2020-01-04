const { compare } = require('./compare')
const { config } = require('./config')
const { Product } = require('./product')
const { telegram } = require('./telegram')
const axios = require('axios')
const cheerio = require('cheerio')

function formatUrl (url) {
  return `http:${url.replace(/\?.*/, '')}`
}

async function loadPage (pageNumber) {
  const url = `${config.melissaUrl}&page=${pageNumber}`
  console.log(url)
  const data = await axios(url)
  return { data: data.data, url }
}

async function buildProdutList ($) {
  const elements = []

  $('.nm-product-name a').each((_, value) => {
    const link = formatUrl($(value).attr('href'))
    const name = $(value).text()

    elements.push({ link, name })
  })

  $('.nm-price-container').each((index, value) => {
    const price = $(value).text().trim()
    elements[index].price = price
  })

  $('.nm-product-img').each((index, value) => {
    const img = formatUrl($(value).attr('src'))
    elements[index].img = img
  })

  return elements
}

function containNext ($) {
  const element = $('.neemu-pagination-last')[0]
  return element
}

async function getPages ({ pages = [], currentPage = 1 }) {
  const { data } = await loadPage(currentPage)
  const page = cheerio.load(data)

  pages.push(page)

  if (containNext(page)) {
    return getPages({ pages, currentPage: ++currentPage })
  }

  return pages
}

function flatArray (arr) {
  return arr.reduce((acc, val) => acc.concat(val), [])
}

function getLink (product) {
  return product && product.link
}

async function updateDatabase (currentProducts) {
  await Product.deleteMany({})
  await Product.insertMany(currentProducts)
}

async function getNewProducts (comparation, currentProducts) {
  return comparation.added.items.map(
    link => currentProducts.find(
      current => current.link === link
    )
  )
}

async function getCurrentProducts (pages) {
  const resolvingProducts = Promise.all(
    pages.map(page => buildProdutList(page))
  )

  const currentProducts = flatArray(await resolvingProducts)

  return currentProducts
}

async function buildComparation (currentProducts, oldProducts) {
  const currentUrls = currentProducts.map(getLink)
  const oldUrls = oldProducts.map(getLink)
  const comparation = compare(currentUrls, oldUrls)

  return comparation
}

async function sendTelegramMessages (newProducts) {
  const messages = newProducts.map(product => telegram.sendPhoto({
    photoUrl: product.img,
    caption: `<a href="${product.link}">${product.name} - ${product.price}</a>`,
    chatId: config.telegramId
  }))

  return Promise.all(messages)
}

async function getUpdates () {
  const pages = await getPages({})
  const currentProducts = await getCurrentProducts(pages)

  const oldProducts = await Product.find({})
  const comparation = await buildComparation(
    currentProducts,
    oldProducts
  )

  const newProducts = await getNewProducts(
    comparation,
    currentProducts
  )

  await updateDatabase(currentProducts)
  await sendTelegramMessages(newProducts)
}

module.exports = {
  getUpdates
}

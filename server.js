const { default: axios } = require('axios')
const express = require('express')
const cors = require('cors')
const puppeteer = require('puppeteer')

const app = express()
app.use(cors())
const port = 3001

// category names mapped to steam api category ids
const categories = {
  "onlinecoop": 38,
  "localcoop": 39,
  "localpvp": 37
}

app.get('/', (req, res) => {
  res.send('Query /apps?cat=[onlinecoop,localcoop,localpvp]')
})

app.get('/apps', async (req, res, next = console.error) => {  
  // get category
  const category = categories[req.query.cat]
  if (category == null) return res.json([])

  // create steam url
  const url = `https://store.steampowered.com/search/?sort_by=Reviews_DESC&category2=${category}`
  console.log("fetching", url)
  
  // launch puppeteer and scrape terrible steam api
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2', // ?
  })
  
  // scrape the id and name from the search result
  const result = await page.$$eval('#search_resultsRows > a[data-ds-appid]', anchors => Array.from(anchors, a => ({
    id: a.dataset.dsAppid,
    name: a.querySelector(".title").textContent,
    href: a.href
  })))

  // send result to client
  res.json(result)

  // don't forget to close the puppeteer browser
  await browser.close()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

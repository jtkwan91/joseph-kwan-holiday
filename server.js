const axios = require('axios')
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

app.get("/app", async (req, res, next = console.error) => {
  const result = await axios.get(`http://store.steampowered.com/api/appdetails?appids=${req.query.id}`)
  if (result.data && result.data[req.query.id] && result.data[req.query.id].success)
    res.json(result.data[req.query.id]?.data)
  else
    res.json({error: "game not found"})
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
  const result = await page.$$eval('#search_resultsRows > a[data-ds-appid]', anchors => {
    function parseRating(text) {
      const [_, match = "0"] = text.match(/(\d+)%/) ?? []
      return Number.parseInt(match)
    }
    function parsePrice(text) {
      const [_, match = "0.00"] = text.match(/CDN\$\s*(\d+\.\d+)\s*$/) ?? []
      return Number.parseFloat(match)
    }
    return Array.from(anchors, a => ({
      id: a.dataset.dsAppid,
      name: a.querySelector(".title")?.textContent,
      href: a.href,
      image_uri: a.querySelector("img")?.src,
      rating: parseRating(a.querySelector(".search_review_summary").dataset.tooltipHtml),
      price: parsePrice(a.querySelector(".search_price").textContent)
    }))
  })

  // send result to client
  res.json(result.slice(0,10))

  // don't forget to close the puppeteer browser
  await browser.close()
})

app.listen(port, () => {
  console.log(`Steam Search Server listening at http://localhost:${port}`)
})

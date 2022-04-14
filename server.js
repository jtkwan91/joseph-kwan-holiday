const axios = require("axios")
const express = require("express")
const cors = require("cors")
const puppeteer = require("puppeteer")
const prettier = require("prettier")

// init express app
const app = express()
app.use(cors())
const port = 3001

// category names mapped to steam api category ids
const STEAM_CATEGORIES = {
  "onlinecoop": 38,
  "localcoop": 39,
  "localpvp": 37
}

// routes
app.get("/", (req, res) => {
  res.send("Query /apps?cat=[onlinecoop,localcoop,localpvp]")
})

app.get("/app", async (req, res) => {
  const appid = req.query.id
  const url = `http://store.steampowered.com/api/appdetails?appids=${appid}`
  const result = await axios.get(url)
  const data = result?.data?.[appid]?.data
  if (data == null) return res.json({error: "game not found"})    
  res.json(data)
})

app.get("/apps", async (req, res) => {  
  // lookup steamid for category
  const cat = STEAM_CATEGORIES[req.query.cat]
  // if steamid is not found, return empty result
  if (cat == null) return res.json([])
  // create steam url
  const url = `https://store.steampowered.com/search/?category1=998&category2=${cat}`
  // scrape steam url
  console.log("fetching", url)
  res.json(await scrape(url))
})

// start express app
app.listen(port, () => {
  console.log(`Steam Search Server listening at http://localhost:${port}`)
})

// scrape utils
function handleParseError(html) {
  const s = prettier.format(html, {parser: "html"})
  const message = `Could not parse Steam App:\n\`\`\`html\n${s}\`\`\`\n`
  console.error(message)
}

async function scrape(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: "networkidle2" })
  await page.exposeFunction("handleParseError", handleParseError)
  const result = await page.$$eval("#search_resultsRows > a[data-ds-appid]", anchors =>
    Promise.all(Array.from(anchors, async a => {
      try {
        return {
          id: a.dataset.dsAppid,
          image_uri: a.querySelector("img").src,
          name: a.querySelector(".title").textContent,
          price: a.querySelector(".search_price").textContent,
          rating: a.querySelector(".search_review_summary").dataset.tooltipHtml
        }
      }
      catch (e) {
        await handleParseError(a.outerHTML)
        return null
      }
    }))
  )
  await browser.close()
  return result.filter(Boolean).slice(0, 10).map(formatAnchor)
}

function formatAnchor(a) {
  return Object.assign(a, {
    price: formatPrice(a.price),
    rating: formatRating(a.rating),
  })
}

function formatPrice(text) {
  const [_, match = "0.00"] = text.match(/CDN\$\s*(\d+\.\d+)\s*$/) ?? []
  return Number.parseFloat(match)
}

function formatRating(text) {
  const [_, match = "0"] = text.match(/(\d+)%/) ?? []
  return Number.parseInt(match)
}

const fs = require('fs')
const cheerio = require('cheerio')

const results = []
const files = fs.readdirSync('./content2')

files.forEach(function(file) {
  const data = fs.readFileSync(`./content2/${file}`, 'utf8')
  let html
  try {
    html = JSON.parse(data).text
  } catch (e) {
    console.error(`malformed json in ${file}`)
    return
  }
  const $ = cheerio.load(html)
  var link = $("h2:contains('Built With')").parent().find('ul li a').attr("href")
  console.log(JSON.stringify(link, null, 2))
  const appTitle = $("h1#app-title").text()
  if (link != null) {
    results.push({filename: file, tags: link, title: appTitle})
  }
})

// console.log(JSON.stringify(results, null, 2))

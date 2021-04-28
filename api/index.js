const express = require('express')
const fetch = require('node-fetch')
var Airtable = require('airtable')
fs = require('fs')
require('dotenv').config()

var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE_ID
)

const path = require('path')
const util = require('util')
const dirPath = path.join(__dirname, '/../lib/404.html')
const readFile = util.promisify(fs.readFile)
function getErr() {
	return readFile(dirPath, 'utf8')
}

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const username = process.env.GH_USERNAME

app.get('/gh/:repo', async (req, res, next) => {
	try {
		const repo = req.params.repo
		const { ok: yuh } = await fetch(
			`https://api.github.com/repos/${username}/${repo}`
		)

		if (yuh) {
			return res.redirect(302, `https://github.com/${username}/${repo}`)
		}

		getErr().then((data) => {
			return res.status(404).send(data)
		})
	} catch (e) {
		console.error(e)
	}
})

app.get('/*', async (req, res) => {
	const url = req.url.slice(1).toLowerCase()
	base('Links')
		.select({
			maxRecords: 1,
			filterByFormula: `resolvedUid = "${url}"`,
		})
		.eachPage(
			function page(records) {
				if (records.length > 0) {
					if (records[0].get('disabled') === true) {
						getErr().then((data) => {
							return res.status(404).send(data)
						})
					} else {
						var redirectUri = records[0].get('url')
						return res.status(302).redirect(redirectUri)
					}
				} else {
					getErr().then((data) => {
						return res.status(404).send(data)
					})
				}
			},
			function done(err) {
				if (err) {
					console.error(err)
					getErr().then((data) => {
						return res.status(404).send(data)
					})
				}
			}
		)
})

const port = process.env.PORT || 3000
app.listen(port, (err) => {
	if (err) throw err
})

'use strict'
const http = require('http')
const url = require('url')
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://hoppscotch.io')
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST'])

    let buffer = '' 

    req.on('data', chunk => {
        buffer += chunk
    })

    req.on('end', chunk => {
	console.log(buffer)
	res.end('received request')
    })

})

server.listen(port, () => console.log(`Listening on port ${port}`)) 

'use strict'
const http = require('http')
const https = require('https')
const url = require('url')
const fs = require('fs')
const config = require('./config')


const unifiedServer = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://hoppscotch.io')

    const reqUrl = url.parse(req.url)
    const path = reqUrl.pathname.replace(/^\/+|\/+$/g, '');
    const {query} = reqUrl
    const {method, headers} = req
    
    //parse payload
    let payload = '' 

    req.on('data', chunk => {
        payload += chunk
    })

    //handle request
    const data = {
        path,
        reqUrl,
        method,
        headers,
        payload
    }

    const handler = handlers[path] || handlers.notFound
 
    handler(data, function(statusCode = 200, payload = {}) {
        const payloadStr = JSON.stringify(payload)

        res.setHeader('Content-Type', 'application/json')    
        res.writeHead(statusCode)

        res.end(payloadStr) 
    })


    req.on('end', chunk => {
        res.end('request received')
    })
}

//instantiate servers

const httpServer = http.createServer((req, res) => {
    unifiedServer(req, res)
})

const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pen'),
    cert: fs.readFileSync('./https/cert.pen'),
}

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
    unifiedServer(req, res)
})


const handlers = {
    notFound: (data, callback) => {
        callback(404)
    },
    ping: (data, callback) => {
        callback(200)
    }
}

const router = {
    ping: handlers.ping
}

//listeners

httpServer.listen(config.httpPort, () => {
    console.log(`Listening on port ${config.httpPort}`) 
})

httpsServer.listen(config.httpsPort, () => {
    console.log(`Listening on port ${config.httpsPort}`) 
})

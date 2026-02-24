import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handlePriceUpdates } from './routeHandlers/handlePriceUpdates.js'
import { handlePost } from './routeHandlers/handlePost.js'

const PORT = 3000
const baseDir = import.meta.dirname
const server = http.createServer(async (req,res) => {
    console.log(req.url)
    if(req.url === '/invest' && req.method === 'POST'){
        await handlePost(req,res)
    }
    else if(!req.url.startsWith('/api') && req.method === 'GET'){
        serveStatic(req,res,baseDir)
    }
    else if(req.url === '/api/price-updates'){
        handlePriceUpdates(res)
    }
})

server.listen(PORT,() =>{console.log(`Listening on port ${PORT}`)})


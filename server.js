import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'

const PORT = 3000
const baseDir = import.meta.dirname
const server = http.createServer(async (req,res) => {
    serveStatic(req,res,baseDir)
})

server.listen(PORT,() =>{console.log(`Listening on port ${PORT}`)})


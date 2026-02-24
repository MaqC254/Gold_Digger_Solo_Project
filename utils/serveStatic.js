import path from 'node:path'
import fs from 'node:fs'
import { getContentType } from './getContentType.js'
import { sendResponse } from './sendResponse.js'

export function serveStatic(req,res,baseDir){
    let pathToResource = path.join(baseDir,'public',req.url === '/' ? 'index.html' : req.url)
    fs.readFile(pathToResource,(err,data) => {
        if(err){
            sendResponse(res,'text/html',501,err)
        }else{
            let ext = path.extname(pathToResource)
            let contentType = getContentType(ext)
            sendResponse(res,contentType,200,data)
        }
    })
}
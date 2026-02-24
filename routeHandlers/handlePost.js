import { sendResponse } from "../utils/sendResponse.js";
import fs from 'node:fs';
import path from "node:path";

export async function handlePost(req, res) {
    let body = '';

    req.on('data', chunk => body += chunk.toString());

    req.on('end', () => {
        const params = new URLSearchParams(body);
        const amount = params.get('investment-amount');
        const latestPrice = params.get('latestPrice')
        let newFileData = ''
        const pricePerOz = latestPrice;
        const ounces = (amount / pricePerOz).toFixed(2);
        sendResponse(res,'application/json',200,JSON.stringify({
            success: true,
            message: `You just bought ${ounces} ounces for £${amount}.`
        }))
        //timestamp:amount paid: price per oz, gold sold
        fs.readFile(path.join(process.cwd(),'files','logs.txt'),(err,data) => {
            if(err){
                console.log(err)
            }else{
                const now = new Date();
                const localTime = now.toLocaleTimeString();


                data += `\nlocal time: ${localTime}, amount paid: ${amount}, price per oz: ${latestPrice}, ounces: ${ounces}`
                newFileData = data
                fs.writeFile(path.join(process.cwd(),'files','logs.txt'),newFileData,(err) => {console.log(err)})
            }
        })
        
    });
}
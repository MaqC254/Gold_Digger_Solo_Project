export function sendResponse(res,header,statusCode,payLoad){
    res.setHeader('Content-Type',header)
    res.statusCode = statusCode
    res.end(payLoad)
}
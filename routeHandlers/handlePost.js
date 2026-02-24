import { sendResponse } from "../utils/sendResponse.js";

export function handlePost(req, res) {
    let body = '';

    req.on('data', chunk => body += chunk.toString());

    req.on('end', () => {
        const params = new URLSearchParams(body);
        const amount = params.get('investment-amount');
        const latestPrice = params.get('latestPrice')

        const pricePerOz = latestPrice; // example
        const ounces = (amount / pricePerOz).toFixed(2);
        sendResponse(res,'application/json',200,JSON.stringify({
            success: true,
            message: `You just bought ${ounces} ounces for £${amount}.`
        }))
    });
}
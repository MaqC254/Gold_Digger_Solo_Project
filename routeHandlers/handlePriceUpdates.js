import { getGoldPricePerOz } from "../api/goldPrice.js";

export function handlePriceUpdates(res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const intervalId = setInterval(() => {
    const currentPrice = getGoldPricePerOz();
    res.write(`event: price-updated\n`);
    res.write(`data: ${JSON.stringify({ price: currentPrice })}\n\n`);
  }, 2000);

  res.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
}
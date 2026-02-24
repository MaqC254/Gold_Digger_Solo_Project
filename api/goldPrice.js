let currentPrice = 2145.30;


export function getGoldPricePerOz() {
    const tickVolatility = 0.0002;
    const drift = 0.00001;
    const randomFactor = Math.random() * 2 - 1;
    const percentChange = (randomFactor * tickVolatility) + drift;
    currentPrice *= (1 + percentChange);
    currentPrice = parseFloat(currentPrice.toFixed(2));
    
    return currentPrice;
}
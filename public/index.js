const priceDisplay = document.getElementById("price-display")
const connectionStatus = document.getElementById("connection-status")
const form = document.querySelector('form')
const eventSource = new EventSource('/api/price-updates')
let latestPrice = 0

eventSource.addEventListener('price-updated', (e) => {
    const data = JSON.parse(e.data)
    latestPrice = data.price
    priceDisplay.innerText = data.price
    connectionStatus.innerText = 'Live Price 🟢'
})

eventSource.onerror = () => {
    console.log("Disconnected")
}

const dialog = document.querySelector('dialog.outputs');
const summary = document.getElementById('investment-summary');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // 🚨 prevents page reload

    const formData = new FormData(form);
    formData.append('latestPrice',latestPrice)

    const response = await fetch('/invest', {
        method: 'POST',
        body: new URLSearchParams(formData)
    });

    const result = await response.json();

    // Update dialog content
    summary.textContent = result.message;

    // Open dialog
    dialog.showModal();
});

const okButton = dialog.querySelector('button');

okButton.addEventListener('click', () => {
    dialog.close();
});
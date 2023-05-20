// selectors
const price = document.querySelector("#price");
const currencyInputs = document.querySelectorAll("input[type='radio']");
const refreshBtn = document.querySelector("#refresh");

// config
const url = "https://api.coindesk.com/v2/bpi/currentprice.json";
const refreshInterval = 30000; // 30 seconds

// state
let selectedCurrency = 0 // USD by default

// display default USD price on load
window.onload = refreshCryptoRate;

// get data evey 30 seconds
window.setInterval(function(){
	refreshCryptoRate();
}, refreshInterval);


// refresh when any radio button is clicked
currencyInputs.forEach(input => input.addEventListener("change", async () => {
	selectedCurrency = input.value;
	refreshCryptoRate()
}))


// refresh when refresh button is clicked
refreshBtn.addEventListener("click", refreshCryptoRate);


// logic
async function refreshCryptoRate() {
	try {
		const response = await fetch(url)
		const rateData = await response.json()
		showRate(rateData)
	} catch (err) {
		showError()
	}
}

function showRate(data) {

	// bitcoin price index
	const bpi = data.bpi

	inputToCurrencyMap = {
		0: `${bpi.USD.rate} $`,
		1: `${bpi.GBP.rate} £`,
		2: `${bpi.EUR.rate} €`,
	}

	price.innerText = inputToCurrencyMap[selectedCurrency]
}

function showError() {
	price.innerText = "An error occurred...";
}

// selectors
var price = document.querySelector("#price");
var currency = document.querySelectorAll("input[type='radio']");
var refresh = document.querySelector("#refresh");
var rate = 0;

// display price on load
window.onload = getData(checkRadios());

// get data evey 30 seconds
window.setInterval(function(){
	getData(checkRadios());
	console.log("data retrieved");
}, 30000);

// refresh data when changing currencies
for(var i=0; i<3; i++){
	currency[i].addEventListener("change", function(){
		getData(checkRadios());
	});
}

// refresh data when button is clicked
refresh.addEventListener("click", function() {
	getData(checkRadios());
});

function checkRadios() {
	for(var i=0; i<3; i++) 
		if (currency[i].checked) 
			return i;
}

function getData(value) {
	var XHR = new XMLHttpRequest();

	XHR.onreadystatechange = function () {
		if (XHR.readyState === 4 && XHR.status === 200) {
			var data = JSON.parse(XHR.responseText);

			if (value === 0) 
				rate = data.bpi.USD.rate + " $";// + data.bpi.USD.symbol;
			else if(value === 1)
				rate = data.bpi.GBP.rate + " £";// + data.bpi.GBP.symbol;
			else
				rate = data.bpi.EUR.rate + " €";// + data.bpi.EUR.symbol;

			// update the price element
			price.innerText = rate;
		}
	}

	XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");
	XHR.send();
}
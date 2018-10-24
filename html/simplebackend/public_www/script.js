addToList = (event) => {
	event.preventDefault();
	let typeInput = document.getElementById("type");
	let countInput = document.getElementById("count");
	let priceInput = document.getElementById("price");
	let item = {
		type:typeInput.value,
		count:countInput.value,
		price:priceInput.value
	}
	let postObject = {
		method:"POST",
		mode:"cors",
		headers: {"Content-Type":"application/json"},
		body:JSON.stringify(item)
	}
	fetch("/api/shoppinglist", postObject).then((response) => {
		if(response.ok) {
			response.json().then((data) => {
				console.log(data)
			}).catch((error) => {
				console.log(error);
			})
		}
	}).catch((error) => {
		console.log(error);	
	})
}
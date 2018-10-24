window.onload = function() {
	getShoppingList();
}

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
				getShoppingList();
			}).catch((error) => {
				console.log(error);
			})
		}
	}).catch((error) => {
		console.log(error);	
	})
}

getShoppingList = () => {
	let getObject = {
		method:"GET",
		mode:"cors",
		headers:{"Content-Type":"application/json"}		
	}
	fetch("/api/shoppinglist", getObject).then((response) => {
		if(response.ok) {
			response.json().then((data) => {
				console.log(data);
				populateTable(data);
			}).catch((error) => {
				console.log(error);
			})
		} else {
			console.log(response.statusText);
		}
	}).catch((error) => {
		console.log(error)
	});
}

removeFromList = (event) => {
	let id = event.target.id;
	let deleteObject = {
		method:"DELETE",
		mode:"cors",
		headers:{"Content-Type":"application/json"}
	}
	fetch("/api/shoppinglist/"+id,deleteObject).then((response) => {
		if(response.ok) {
			getShoppingList();
		} else {
			console.log("Not found");
		}	
	}).catch((error) => {
		console.log(error);
	})
}

populateTable = (data) => {
	let table = document.getElementById("shoppingtable");
	let container = document.getElementById("container");
	container.removeChild(table);
	let newTable = document.createElement("table");
	let header = document.createElement("tr");
	let countHeader = document.createElement("th");
	let countHeaderInfo = document.createTextNode("Count");
	let typeHeader = document.createElement("th");
	let typeHeaderInfo = document.createTextNode("Type");
	let priceHeader = document.createElement("th");
	let priceHeaderInfo = document.createTextNode("Price");	
	let removeHeader = document.createElement("th");
	let removeHeaderInfo = document.createTextNode("Remove");
	countHeader.appendChild(countHeaderInfo);
	typeHeader.appendChild(typeHeaderInfo);
	priceHeader.appendChild(priceHeaderInfo);
	removeHeader.appendChild(removeHeaderInfo);
	header.appendChild(countHeader);
	header.appendChild(typeHeader);
	header.appendChild(priceHeader);
	header.appendChild(removeHeader);
	newTable.appendChild(header);
	for(let i=0;i<data.length;i++) {
		let newRow = document.createElement("tr");
		let countColumn = document.createElement("td");
		let countColumnInfo = document.createTextNode(data[i].count);
		countColumn.appendChild(countColumnInfo)
		let typeColumn = document.createElement("td");
		let typeColumnInfo = document.createTextNode(data[i].type);
		typeColumn.appendChild(typeColumnInfo);
		let priceColumn = document.createElement("td");
		let priceColumnInfo = document.createTextNode(data[i].price);
		priceColumn.appendChild(priceColumnInfo);
		let removeColumn = document.createElement("td");
		let removeButton = document.createElement("button");
		let removeInfo = document.createTextNode("Remove");
		removeButton.setAttribute("id",data[i].id);
		removeButton.addEventListener("click",function(e) {
			removeFromList(e);
		})
		removeButton.appendChild(removeInfo);
		removeColumn.appendChild(removeButton);
		newRow.appendChild(countColumn);
		newRow.appendChild(typeColumn);
		newRow.appendChild(priceColumn);
		newRow.appendChild(removeColumn);
		newTable.appendChild(newRow);
	}
	newTable.setAttribute("id","shoppingtable");
	container.appendChild(newTable);
}
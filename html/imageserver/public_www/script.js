getImages = () => {
	let temp = {
		method:"GET",
		mode:"cors",
		headers:{"Content-Type":"application/json"}
	}
	fetch("/api/database", temp).then((response) => {
		if(response.ok) {
			response.json().then((data) => {
				populateGallery(data)
			}).catch((error) => {
				console.log(error)
			}); 
		}
	}).catch((error) => {
		console.log(error)
	})
}

populateGallery = (data) => {
	var myNode = document.getElementById("container");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	for(let i=0;i<data.length;i++) {
		let imgNode = document.createElement("img");
		imgNode.setAttribute("src",data[i].location);
		imgNode.setAttribute("alt",data[i].name);
		myNode.appendChild(imgNode);
	}
}
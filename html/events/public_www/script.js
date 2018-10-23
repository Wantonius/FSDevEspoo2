var isClicked = 0;

function myClick() {
	if(isClicked) {
		document.getElementById("header").className = "clicked"
		isClicked = 0;
	} else {
		document.getElementById("header").className = "normal"
		isClicked = 1;
	}
}

function onHover() {
	document.getElementById("header").className = "hover"	
}

function exitHover() {
	if(isClicked) {
		document.getElementById("header").className = "clicked"
	}else {
		document.getElementById("header").className = "normal"
	}
}
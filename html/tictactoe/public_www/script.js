var inputs = [];
var gameBoard = [0,0,0,0,0,0,0,0,0];
var turn = 0;
var lastWinner = "none";
var gamesPlayed = 0;
var round = 0;

window.onload = function() {
	for(let i=0;i<9;i++) {
		let tempId = "input"+i;
		let tempElement = document.getElementById(tempId);
		inputs.push(tempElement);
	}
	if(localStorage.getItem("lastWinner")) {
		lastWinner = localStorage.getItem("lastWinner");
		gamesPlayed = localStorage.getItem("gamesPlayed");
	}
	let message = document.getElementById("message");
	message.innerHTML = "Last Winner was:"+lastWinner+" Games played:"+gamesPlayed;
}

function onChangeEvent(event) {
	let tempkey = event.key;
	if(tempkey ==="x" || tempkey ==="o") {
		if(tempkey === "x" && turn === 1) {
			alert("O's turn");
			event.target.value="";
			return;
		}
		if(tempkey === "o" && turn === 0) {
			alert("X's turn");
			event.target.value="";
			return;
		}
		let currentPlayer;
		if(turn) {
			currentPlayer = "o";
			turn = 0;
		} else {
			currentPlayer = "x";
			turn = 1;
		}
		let targetId = parseInt(event.target.id[5],10);
		inputs[targetId].setAttribute("readonly",true);
		gameBoard[targetId] = tempkey;
		if(gameBoard[0] == tempkey && gameBoard[1] == tempkey && gameBoard[2] == tempkey) {
			winGame(currentPlayer);
		}
		if(gameBoard[3] == tempkey && gameBoard[4] == tempkey && gameBoard[5] == tempkey) {
			winGame(currentPlayer);
		}
		if(gameBoard[6] == tempkey && gameBoard[7] == tempkey && gameBoard[8] == tempkey) {
			winGame(currentPlayer);
		}
		if(gameBoard[0] == tempkey && gameBoard[3] == tempkey && gameBoard[6] == tempkey) {
			winGame(currentPlayer);
		}
		if(gameBoard[1] == tempkey && gameBoard[4] == tempkey && gameBoard[7] == tempkey) {
			winGame(currentPlayer);
		}
		if(gameBoard[2] == tempkey && gameBoard[5] == tempkey && gameBoard[8] == tempkey) {
			winGame(currentPlayer);
		}
		if(gameBoard[0] == tempkey && gameBoard[4] == tempkey && gameBoard[8] == tempkey) {
			winGame(currentPlayer);
		}
		if(gameBoard[2] == tempkey && gameBoard[4] == tempkey && gameBoard[6] == tempkey) {
			winGame(currentPlayer);
		}
		round++;
		if(round === 9) {
			winGame("0");
		}
	} else {
		event.target.value="";
		alert("Use only x or o keys");
	}
}

function winGame(winner) {
	if(winner === "x" || winner === "o") {
		alert("Winner "+winner);
		lastWinner = winner
	} else {
		alert("Draw!");
		lastWinner = "Draw";
	}
	gamesPlayed++;
	message.innerHTML = "Last Winner was:"+lastWinner+" Games played:"+gamesPlayed;
	localStorage.setItem("lastWinner", lastWinner);
	localStorage.setItem("gamesPlayed", gamesPlayed);
	clearGame();
}

function clearGame() {
	gameBoard = [0,0,0,0,0,0,0,0,0];
	turn = 0;
	round = 0;
	for(let i=0; i<9;i++){
		inputs[i].value = "";
		inputs[i].removeAttribute("readonly");		
	}
		
	}
const express = require('express');
const bodyParser = require('body-parser')
const apiRouter = require("./routes/apirouter");

let app = express();

app.use(bodyParser.json());

//user database
let registeredUsers = [];
let loggedUsers = [];

function isUserLogged(req,res,next) {
	let token = req.headers.token;
	for(let i=0;i<loggedUsers.length;i++) {
		if(token === loggedUsers[i].token) {
			req.user = loggedUsers[i].username;
			return next();
		}
	}
	res.status(403).json({"message":"not allowed"});
}

function createToken() {
	let token = "";
	let letters = "abcdefghijklmnABCDEFGHIJKLMN0123456789"
	for(let i=0;i<1024;i++) {
		let temp = Math.floor(Math.random()*38);
		token = token+letters[temp];
	}
	return token;
}

//LOGIN API

app.post("/register", function(req,res) {
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({"message":"username already in use"})
	}
	if(req.body.username.length===0 || req.body.password.length===0) {
		return res.status(409).json({"message":"username already in use"})			
	}
	let user = {
		username: req.body.username,
		password: req.body.password
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(user.username === registeredUsers[i].username) {
			return res.status(409).json({"message":"username already in use"})
		}
	}
	registeredUsers.push(user);
	res.status(200).json({"message":"success"})
});

app.post("/login", function(req,res) {
	if(!req.body.username || !req.body.password) {
		return res.status(403).json({"message":"Wrong username or password"})
	}
	if(req.body.username.length===0 || req.body.password.length===0) {
		return res.status(403).json({"message":"Wrong username or password"})			
	}
	let user = {
		username:req.body.username,
		password:req.body.password
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(user.username === registeredUsers[i].username) {
			if(user.password === registeredUsers[i].password) {
				let token = createToken();
				loggedUsers.push({"username":user.username,
								  "token":token})
				return res.status(200).json({"token":token})
			}
		}
	}
	res.status(403).json({"message":"Wrong username or password"});
});

app.post("/logout", function(req,res) {
	let token = req.headers.token;
	for(let i=0;i<loggedUsers.length;i++) {
		if(token === loggedUsers[i].token) {
			console.log("logout success:"+loggedUsers[i].username)
			loggedUsers.splice(i,1)
			return res.status(200).json({"message":"success"})
		}
	}
	res.status(404).json({"message":"not found"});
});

//GET USERS

app.get("/users", isUserLogged, function(req,res) {
	let tempList = [];
	for(let i=0;i<registeredUsers.length;i++) {
		tempList.push(registeredUsers[i].username);
	}
	res.status(200).json(tempList);
});

app.use("/api",isUserLogged,apiRouter);

app.listen(3001);

console.log("Running in port 3001");

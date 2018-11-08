const express = require('express');
const bodyParser = require('body-parser')
const apiRouter = require("./routes/apirouter");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const bcrypt = require("bcrypt-nodejs");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

let app = express();
app.use(session({
	name:"taskmaster-id",
	resave:false,
	secret:"myBestSecret",
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60*24},
/*	store: new mongoStore({
		collection:"session",
		url:"mongodb+srv://test:test@testcluster-ujjvo.mongodb.net/taskssessiondb",
		ttl:60*60*24
	})*/	
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use("local-login", new localStrategy({
	usernameField: "username",
	passwordField: "password",
	passReqToCallback:true	
},function(req, username, password, done) {
	if(!req.body.username || !req.body.password) {
		return done(null,false,"Wrong username or password");
	}
	if(req.body.username.length===0 || req.body.password.length===0) {
		return done(null,false,"Wrong username or password");			
	}
	userModel.findOne({"username":username}, function(err,user) {
		if(err) {
			return done(err);		
		}
		if(isPasswordValid(password,user.password)) {
			let token = createToken();
			req.session.token = token;
			req.session.username = username;
			return done(null,user);
		}
		return done(null,false,"Wrong username or password");
	});	
}));

passport.serializeUser(function(user,done) {
	console.log("Serialize user:"+JSON.stringify(user))
	done(null,user._id);
});

passport.deserializeUser(function(_id,done) {
	console.log("deserializeUser:"+_id);
	userModel.findById(_id,function(err,user) {
		if(err) {
			return done(err);
		}
		return done(null,user);
	});
});

mongourl = 'mongodb+srv://<username>:<password>@<clustername_from_mongoatlas_check_connecting>.mongodb.net/'

mongoose.connect(mongourl,{dbName:"tasksdatabase"}).then(
	() => {console.log("MongoDB connection success")},
	(error) => {console.log("MongoDB connection failure:"+error)}
)

app.use(bodyParser.json());

function isUserLogged(req,res,next) {
	let token = req.headers.token;
	if(req.isAuthenticated()) {
		if(token === req.session.token) {
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

function createHash(pw) {
	return bcrypt.hashSync(pw,bcrypt.genSaltSync(8),null);
}

function isPasswordValid(pw, hash) {
	return bcrypt.compareSync(pw,hash);
}

//LOGIN API

app.post("/register", function(req,res) {
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({"message":"username already in use"})
	}
	if(req.body.username.length===0 || req.body.password.length===0) {
		return res.status(409).json({"message":"username already in use"})			
	}
	let user = new userModel({
		username: req.body.username,
		password: createHash(req.body.password)
	})
	user.save(function(err,item) {
		if(err) {
			return res.status(409).json({"message":"Username already in use"})
		} else {
			console.log("register success:"+item.username)
			return res.status(200).json({"message":"success"})
		}
	})
});

app.post("/login",
passport.authenticate("local-login",{failureRedirect:"/"}), function(req,res) {
	return res.status(200).json({"message":"success","token":req.session.token})
});

app.post("/logout", function(req,res) {
	if(req.session) {
		req.logout();
		req.session.destroy();
		return res.status(200).json({"message":"success"})
	}
	return res.status(404).json({"message":"not found"});
});

//GET USERS

app.get("/users", isUserLogged, function(req,res) {
	console.log("Get users");
	userModel.find({},"username",function(err,users) {
		if(err) {
			return res.status(404).json({"message":"not found"})
		}
		let tempList = [];
		for(let i=0;i<users.length;i++) {
			tempList.push(users[i].username);
		}
		return res.status(200).json(tempList);
	});
});     

app.use("/api",isUserLogged,apiRouter);

app.listen(3001);

console.log("Running in port 3001");

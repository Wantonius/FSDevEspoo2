let express = require("express");
let bodyParser = require("body-parser");

let app = express();

//our "database"
let shoppingList = [];
let id = 100;

app.use(express.static(__dirname+"/public_www"));
app.use(bodyParser.json());

app.get("/api/shoppinglist",function(req,res) {
	res.status(200).json(shoppingList);
});

app.post("/api/shoppinglist", function(req,res) {
	let item = {
		id: id,
		type: req.body.type,
		price: req.body.price,
		count: req.body.count
	}
	id++;
	shoppingList.push(item);
	res.status(200).json({"message":"success"});
});

app.delete("/api/shoppinglist/:id", function(req,res) {
	let tempid = parseInt(req.params.id,10);
	for(let i = 0; i<shoppingList.length; i++) {
		if(shoppingList[i].id === tempid) {
			shoppingList.splice(i,1);
			return res.status(200).json({"message":"success"});
		}
	}
	return res.status(404).json({"message":"not found"});
});

app.listen(3000);

console.log("Running in port 3000");
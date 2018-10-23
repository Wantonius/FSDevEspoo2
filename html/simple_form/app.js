let express = require('express');
let bodyParser = require('body-parser');

let app = express();


app.use(express.static(__dirname+"/public_www"));
app.use(bodyParser.urlencoded(
	{extended:true}
));

app.post("/user_data", function(req,res) {
	console.log(req.body);
	res.status(200).send(
		"First name:"+req.body.firstname+"<br>Last name:"+req.body.lastname
	);
	
});

app.listen(8080);

console.log("Running in port 8080");
let express = require('express');
let bodyParser = require('body-parser');
let multer = require('multer');
let fs = require('fs');
let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname+"/public_www"));

let upload = multer({
	dest: __dirname+"/public_www/images"
})

let database = [
{
	name:"Flowers and Butterfly",
	location:"/images/flowers1.jpeg"
},
{
	name:"Red Flower",
	location:"/images/flowers2.jpg"
},
{
	name:"Daffodils",
	location:"/images/flowers3.jpg"
}
]

app.get("/api/database", function(req,res) {
	res.status(200).json(database);
});

app.post("/upload", upload.single("image"), function(req,res) {
	console.log(req.file);

	  var tmp_path = req.file.path;

	  var target_path = __dirname+'/public_www/images/' + req.file.originalname;

	  var src = fs.createReadStream(tmp_path);
	  var dest = fs.createWriteStream(target_path);
	  src.pipe(dest);
	  src.on('end', function() { 
		let temp = {
			name:req.file.originalname,
			location:"/images/"+req.file.originalname
		}
		database.push(temp);
		res.redirect("/");
	  
	  });
	  src.on('error', function(err) { res.status(404)({"message":"failed"}); });
	  
});

app.listen(8080);

console.log("Running in port 8080");
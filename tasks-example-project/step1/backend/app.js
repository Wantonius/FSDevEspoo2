const express = require('express');
const bodyParser = require('body-parser')

let app = express();
app.use(bodyParser.json());

// temporary database
let tasks_database = [];
let id = 100;
/*
{
	creator: <user>,
	assigned: [list of users],
	name: <task name>,
	description: <task description>,
	state: [created, assigned, in progress, done, reopened],
	startdate: <date>,
	enddate:<date>
}*/

//API

app.get("/api/tasks", function(req,res) {
	res.status(200).json(tasks_database);	
});

app.post("/api/tasks", function(req,res) {
	let task = {
		id:id,
		creator: req.body.username,
		assigned: req.body.assigned,
		name: req.body.name,
		description: req.body.description,
		state: req.body.state,
		startdate: req.body.start,
		enddate: req.body.end
	}
	id++;
	tasks_database.push(task);
	res.status(200).json({"message":"success"});
});

app.delete("/api/tasks/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	// TODO: check user permissions for delete. Only creator can delete
	for(let i=0;i<tasks_database.length;i++) {
		if(tempId === tasks_database[i].id) {
			tasks_database.splice(i,1);
			return res.status(200).json({"message":"success"})
		}
	}
	res.status(404).json({"message":"not found"});
});

app.post("/api/tasks/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	//TODO: check user permissions for edit. Only creator and assigned users can edit
	let task = {
		id:tempId,
		creator: req.body.username,
		assigned: req.body.assigned,
		name: req.body.name,
		description: req.body.description,
		state: req.body.state,
		startdate: req.body.start,
		enddate: req.body.end
	}
	for(let i=0;i<tasks_database.length;i++) {
		if(tempId === tasks_database[i].id) {
			tasks_database.splice(i,1,task);
			return res.status(200).json({"message":"success"})
		}
	}
	res.status(404).json({"message":"not found"});
});

app.listen(3001);

console.log("Running in port 3001");

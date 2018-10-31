const express = require("express");

let router = express.Router();

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

router.get("/tasks", function(req,res) {
	res.status(200).json(tasks_database);	
});

router.post("/tasks", function(req,res) {
	let task = {
		id:id,
		creator: req.user,
		assigned: req.body.assigned,
		name: req.body.name,
		description: req.body.description,
		state: req.body.state,
		startdate: req.body.startdate,
		enddate: req.body.enddate
	}
	id++;
	tasks_database.push(task);
	res.status(200).json({"message":"success"});
});

router.delete("/tasks/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<tasks_database.length;i++) {
		if(tempId === tasks_database[i].id) {
			if(req.user !== tasks_database[i].creator) {
				return res.status(403).json({"message":"not allowed"});
			}
			tasks_database.splice(i,1);
			return res.status(200).json({"message":"success"})
		}
	}
	res.status(404).json({"message":"not found"});
});

router.post("/tasks/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	//TODO: check user permissions for edit. Only creator and assigned users can edit
	let task = {
		id:tempId,
		assigned: req.body.assigned,
		name: req.body.name,
		description: req.body.description,
		state: req.body.state,
		startdate: req.body.startdate,
		enddate: req.body.enddate
	}
	for(let i=0;i<tasks_database.length;i++) {
		if(tempId === tasks_database[i].id) {
			let access = false;
			if(req.user ===  tasks_database[i].creator) {
				access = true;
			}
			for(let j = 0; j<tasks_database[i].assigned.length; j++) {
				if(req.user === tasks_database[i].assigned[j]) {
					access = true;
				}
			}
			if(!access) {
				return res.status(403).json({"message":"not allowed"});
			}
			task.creator = tasks_database[i].creator;
			tasks_database.splice(i,1,task);
			return res.status(200).json({"message":"success"})
		}
	}
	res.status(404).json({"message":"not found"});
});

module.exports = router;
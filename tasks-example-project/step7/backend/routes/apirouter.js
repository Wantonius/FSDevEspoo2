const express = require("express");
const mongoose = require("mongoose");
const taskModel = require("../models/task")

let router = express.Router();


/*{
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
	taskModel.find({},function(err,tasks) {
		if(err) {
			return res.status(404).json({"message":"not found"})
		}
		return res.status(200).json(tasks);
	});
});

router.post("/tasks", function(req,res) {
	let task = new taskModel({
		creator: req.user,
		assigned: req.body.assigned,
		name: req.body.name,
		description: req.body.description,
		state: req.body.state,
		startdate: req.body.startdate,
		enddate: req.body.enddate
	})
	task.save(function(err,item) {
		if(err) {
			return res.status(409).json({"message":err})
		}
		return res.status(200).json({"message":"success"});		
	});

});

router.delete("/tasks/:id", function(req,res) {
	taskModel.findById(req.params.id, function(err,task) {
			if(err) {
				return res.status(404).json({"message":"not found"})
			}
			if(task.creator == req.user) {
				taskModel.deleteOne({"_id":req.params.id}, function(err) {
					if(err) {
						return res.status(409).json({"message":err})
					}
					return res.status(200).json({"message":"success"})
				});
			} else {
				return res.status(403).json({"message":"not allowed"})
			}});
});
router.post("/tasks/:id", function(req,res) {
	/*let task = {
		id:tempId,
		assigned: req.body.assigned,
		name: req.body.name,
		description: req.body.description,
		state: req.body.state,
		startdate: req.body.startdate,
		enddate: req.body.enddate
	}*/
	taskModel.findById(req.params.id, function(err, task) {
			if(err) {
				return res.status(404).json({"message":"not found"})
			}
			let access = false;
			if(req.user ===  task.creator) {
				access = true;
			}
			for(let j = 0; j<task.assigned.length; j++) {
				if(req.user === task.assigned[j]) {
					access = true;
				}
			}
			if(!access) {
				return res.status(403).json({"message":"not allowed"});
			}
			taskModel.findOneAndUpdate({"_id":req.params.id},
				{$set:{"name":req.body.name,
					"assigned":req.body.assigned,
					"description":req.body.description,
					"state":req.body.state,
					"startdate":req.body.startdate,
					"enddate":req.body.enddate}		
				}, function(err) {
						if(err) {
							return res.status(409).json({"message":"conflict"})
						}
						return res.status(200).json({"message":"success"});
			});		
	});
});

module.exports = router;
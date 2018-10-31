const mongoose = require("mongoose")

let Schema = mongoose.Schema({
	"name":String,
	"creator":{type:String,indexed:true},
	"assigned":[String],
	"description":String,
	"state":String,
	"startdate":String,
	"enddate":String
})

module.exports = mongoose.model("Task",Schema);
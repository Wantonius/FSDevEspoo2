import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const state = {
	shoppingList:[]	
}

const mutations = {
	changeList(state,list) {
		state.shoppingList = list;
	}
}

const actions = {
	getList: function({commit}) {
		axios.get("/api/shoppinglist").then(function(res) {
			commit("changeList",res.data);
		}).catch(function(error) {
			console.log(error);
		});
	},
	addToList: function(context, item) {
		axios.post("/api/shoppinglist", item).then(function(res) {
			if(res.status === 200) {
				context.dispatch("getList");
			} else {
				console.log("addToList - HTTP status:"+res.status)
			}
		}).catch(function(error) {
			console.log(error)
		});
	},
	removeFromList: function(context, id) {
		axios.delete("/api/shoppinglist/"+id).then(function(res) {
			if(res.status === 200) {
				context.dispatch("getList");
			} else {
				console.log("removeFromList - HTTP status:"+res.status);
			}
		}).catch(function(error) {
			console.log(error);
		});
	}
	
}

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	mutations,
	actions
});
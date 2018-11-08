import {
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_REDIRECT
	}
from "../actions/loginActions";

function getStorage() {
	if(sessionStorage.getItem("isLogged")) {
		console.log("initial state - isLogged")
		let state = {};
		if(sessionStorage.getItem("isLogged") === "true") {
			state.isLogged = true
		} else {
			state.isLogged = false
		}
		state.token = sessionStorage.getItem("token")
		state.error = "";
		state.redirect = false
		return state
	} else {
		return {
		isLogged:false,
		token:"",
		error:"",
		redirect:false
	}
	}
		 
}

const initialState = getStorage();

const loginReducer = (state=initialState,action) => {
	let tempState = {};
	switch(action.type) {
		case LOGIN_SUCCESS:
			console.log("LoginReducer - LOGIN_SUCCESS");
			tempState = {
				...state,
				token:action.token,
				isLogged:true,
				error:"",
				redirect:true
			}

			return tempState;
		case LOGIN_FAILED: 
			tempState = {
				...state,				
				error:action.error,	
			}
			return tempState;
		case LOGOUT_SUCCESS: 
			tempState = {
				...state,
				isLogged:false,
				token:"",
				error:""
			}
			sessionStorage.setItem("isLogged",false);
			sessionStorage.setItem("token","");
			return tempState;
		case LOGOUT_FAILED: 
			tempState = {
				...state,
				error:action.error
			}
			return tempState;
		case REGISTER_SUCCESS: 
			tempState = {
				...state,
				error:""		
			}
			return tempState;
		case REGISTER_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			return tempState;
		case LOGIN_REDIRECT:
			tempState = {
				...state,
				redirect:false
			}
			return tempState;
		default:
			return state
	}	
}

export default loginReducer;
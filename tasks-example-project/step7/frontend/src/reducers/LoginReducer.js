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

const initialState = {
	isLogged:false,
	token:"",
	error:"",
	redirect:false
}

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
import {
	FETCH_LOADING,
    GET_TASKS_SUCCESS,
	GET_TASKS_FAILED,
	GET_USERLIST_SUCCESS,
	GET_USERLIST_FAILED,
	ADD_TASK_SUCCESS,
	ADD_TASK_FAILED,
	REMOVE_TASK_SUCCESS,
	REMOVE_TASK_FAILED,
	EDIT_TASK_SUCCESS,
	EDIT_TASK_FAILED
} from '../actions/taskActions';

const initialState = {
	  list:[],
	  mode:"Add",
	  userlist:[],
	  editTask:{},
	  loading:false,
	  error:""
}

const taskReducer = (state = initialState, action) => {
	let tempState = {}
	switch(action.type) {
		case FETCH_LOADING:
			tempState= {
				...state,
				loading:true
			}
			return tempState;
		case GET_USERLIST_SUCCESS:
			tempState = {
				...state,
				loading:false,
				userlist:action.data
			}
			return tempState;
		case GET_USERLIST_FAILED:
			tempState = {
				...state,
				loading:false,
				error: action.error
			}
			return tempState;
		case GET_TASKS_SUCCESS:
			tempState = {
				...state,
				list:action.data,
				loading:false
			}
			return tempState;
		case GET_TASKS_FAILED:
			tempState = {
				...state,
				error:action.error,
				loading:false
			}
			return tempState;
		default:
			return state;
	}

}

export default taskReducer
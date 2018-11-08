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
	EDIT_TASK_FAILED,
	CHANGE_EDIT_MODE
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
				loading:action.loading
			}
			return tempState;
		case GET_USERLIST_SUCCESS:
			tempState = {
				...state,
				userlist:action.data,
				error:""
			}
			return tempState;
		case GET_USERLIST_FAILED:
			tempState = {
				...state,
				error: action.error
			}
			return tempState;
		case GET_TASKS_SUCCESS:
			tempState = {
				...state,
				list:action.data,
				error:""
			}
			return tempState;
		case GET_TASKS_FAILED:
			tempState = {
				...state,
				error:action.error,
			}
			return tempState;
		case ADD_TASK_SUCCESS: 
			tempState = {
				...state,
				error: ""
			}
			return state
		case ADD_TASK_FAILED:
			tempState = {
				...state,
				error: action.error
			}
			return tempState;
		case REMOVE_TASK_SUCCESS:
			tempState = {
				...state,
				error: ""
			}
			return tempState;
		case REMOVE_TASK_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			return tempState;
		case CHANGE_EDIT_MODE:
			tempState = {
				...state,
				mode:action.mode,
				editTask:action.task
			}
			return tempState;
		case EDIT_TASK_SUCCESS: 
			tempState = {
				...state,
				error:""
			}
			return tempState
		case EDIT_TASK_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			return tempState
		default:
			return state;
	}

}

export default taskReducer
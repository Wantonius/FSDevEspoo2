export const FETCH_LOADING = "FETCH_LOADING"
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS"
export const GET_TASKS_FAILED = "GET_TASKS_FAILED"
export const GET_USERLIST_SUCCESS = "GET_USERLIST_SUCCESS"
export const GET_USERLIST_FAILED = "GET_USERLIST_FAILED"
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS"
export const ADD_TASK_FAILED = "ADD_TASK_FAILED"
export const REMOVE_TASK_SUCCESS = "REMOVE_TASK_SUCCESS"
export const REMOVE_TASK_FAILED = "REMOVE_TASK_FAILED"
export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS"
export const EDIT_TASK_FAILED = "EDIT_TASK_FAILED"
export const CHANGE_EDIT_MODE = "CHANGE_EDIT_MODE"

//Actions
export const getUserlist = (token) => {
	return dispatch => {
	 let userObject = {
		  method:"GET",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
		           "token":token}
	  }
	  dispatch(fetchLoading(true));
	  return fetch("/users", userObject).then((response) => {
		 if(response.ok) {
			 response.json().then((data) => {
				 dispatch(getUserlistSuccess(data))
				 dispatch(fetchLoading(false));
			 }).catch((error) => {
				 dispatch(getUserlistFailed(error))
				 dispatch(fetchLoading(false));
			 });
		 } else {
			 dispatch(getUserlistFailed("No user list"))
			 dispatch(fetchLoading(false));
		 }
	  }).catch((error) => {
		 dispatch(getUserlistFailed(error))
		 dispatch(fetchLoading(false));
	  });

}}

export const getTasks = (token,loading) => {
	return dispatch => {
	  let fetchObject = {
		  method:"GET",
		  mode:"cors",
		  headers:{
			  "Content-Type":"application/json",
			  "token":token
		  }		  
	  }
	  if(loading) {
		dispatch(fetchLoading(loading));
	  }
	  return fetch("/api/tasks",fetchObject).then((response) => {
		  if(response.ok) {
			  response.json().then((data) => {
				  dispatch(getTasksSuccess(data))
				  dispatch(fetchLoading(false));				  
			  }).catch((error) => {
				  dispatch(getTasksFailed(error));
				  dispatch(fetchLoading(false));
			  })
		  } else {
			  dispatch(getTasksFailed("Server responded with status:"+response.status));
			  dispatch(fetchLoading(false));
		  }
	  }).catch((error) => {
			dispatch(getTasksFailed(error));
			dispatch(fetchLoading(false));
	  });
}
}

export const addTask = (token, task) => {
	return dispatch => {
		let addObject = {
		  method:"POST",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
				   "token":token},
		  body:JSON.stringify(task)
		}
		dispatch(fetchLoading(true))
		return fetch("/api/tasks",addObject).then((response) => {
		  if(response.ok) {
			  dispatch(getTasks(token))
			  dispatch(addTaskSuccess())
		  } else {
			  dispatch(addTaskFailed("Server returned with status:"+response.status));
			  dispatch(fetchLoading(false));
		  }
	  }).catch((error) => {
		  dispatch(addTaskFailed(error));
		  dispatch(fetchLoading(false));
	  })
	}
}

export const removeTask = (token,id) => {
	return dispatch => {
	  let deleteTask = {
		  method:"DELETE",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
				   "token":token}
	  }
	  dispatch(fetchLoading(true));
	  return fetch("/api/tasks/"+id,deleteTask).then((response) => {
		 if(response.ok) {
			 dispatch(removeTaskSuccess());
			 dispatch(getTasks(token));
		 } else {
			 dispatch(removeTaskFailed("Server responded with status:"+response.status));
			 dispatch(fetchLoading(false));
		 }
	  }).catch((error) => {
		  dispatch(removeTaskFailed(error));
		  dispatch(fetchLoading(false));
	  })		
	}
}

export const editTask = (token,task) => {
	return dispatch => {
		let editObject = {
			  method:"POST",
			  mode:"cors",
			  headers:{"Content-Type":"application/json",
					   "token":token},
			  body:JSON.stringify(task)
		  }
		dispatch(fetchLoading(true));
		return fetch("/api/tasks/"+task._id,editObject).then((response) => {
			if(response.ok) {
				dispatch(editTaskSuccess());
				dispatch(getTasks(token))
				dispatch(changeEditMode("Add"))
			} else {
				dispatch(editTaskFailed("Server responded with status:"+response.status));
				dispatch(changeEditMode("Add"))				
			}
		  }).catch((error) => {
			  dispatch(editTaskFailed(error));
			  dispatch(changeEditMode("Add"))
		  })
	  }
	}

//Action creators

export const fetchLoading = (loading) => {
	return {
		type:FETCH_LOADING,
		loading:loading
	}
}

export const getUserlistSuccess = (data) => {
	return {
		type:GET_USERLIST_SUCCESS,
		data:data
	}
}

export const getUserlistFailed = (error) => {
	return {
		type:GET_USERLIST_FAILED,
		error:error
	}
}

export const getTasksSuccess = (data) => {
	return {
		type:GET_TASKS_SUCCESS,
		data:data
	}
}

export const getTasksFailed = (error) => {
	return {
		type:GET_TASKS_FAILED,
		error: error
	}
}

export const addTaskSuccess = () => {
	return {
		type:ADD_TASK_SUCCESS
	}
}

export const addTaskFailed = (error) => {
	return {
		type:ADD_TASK_FAILED,
		error:error
	}
}

export const removeTaskSuccess = () => {
	return {
		type:REMOVE_TASK_SUCCESS
	}
}

export const removeTaskFailed = (error) => {
	return {
		type:REMOVE_TASK_FAILED,
		error:error
	}
}

export const changeEditMode = (mode,task) => {
	if(!task) {
		task = {} 
	}
	return {
		type:CHANGE_EDIT_MODE,
		mode:mode,
		task:task
	}
}

export const editTaskSuccess = () => {
	return {
		type:EDIT_TASK_SUCCESS
	}
}

export const editTaskFailed = (error) => {
	return {
		type:EDIT_TASK_FAILED,
		error:error
	}
}
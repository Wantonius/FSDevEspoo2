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

//Actions
export const getUserlist = (token) => {
	return dispatch => {
	 let userObject = {
		  method:"GET",
		  mode:"cors",
		  headers:{"Content-Type":"application/json",
		           "token":token}
	  }
	  dispatch(fetchLoading());
	  return fetch("/users", userObject).then((response) => {
		 if(response.ok) {
			 response.json().then((data) => {
				 dispatch(getUserlistSuccess(data))
			 }).catch((error) => {
				 dispatch(getUserlistFailed(error))
			 });
		 } else {
			 dispatch(getUserlistFailed("No user list"))
		 }
	  }).catch((error) => {
		 dispatch(getUserlistFailed(error))
	  });

}}

export const getTasks = (token) => {
	return dispatch => {
	  let fetchObject = {
		  method:"GET",
		  mode:"cors",
		  headers:{
			  "Content-Type":"application/json",
			  "token":token
		  }		  
	  }
	  dispatch(fetchLoading());
	  return fetch("/api/tasks",fetchObject).then((response) => {
		  if(response.ok) {
			  response.json().then((data) => {
				  dispatch(getTasksSuccess(data))
			  }).catch((error) => {
				  dispatch(getTasksFailed(error));
			  })
		  } else {
			  dispatch(getTasksFailed("Server responded with status:"+response.status));
		  }
	  }).catch((error) => {
			dispatch(getTasksFailed(error));
	  });
}
}
//Action creators

export const fetchLoading = () => {
	return {
		type:FETCH_LOADING
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
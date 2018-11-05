export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOGIN_REDIRECT = "LOGIN_REDIRECT";

// Actions

export const onLogin = (user) => {
	return dispatch => {
	let loginObject= {
		method:"POST",
		mode:"cors",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(user)
	}	
	return fetch("/login",loginObject).then((response) => {
		if(response.ok) {
			response.json().then((data) => {
				console.log("Action onLogin - Login success");
				dispatch(loginSuccess(data.token))
			}).catch((error) => {
				console.log(error)
				dispatch(loginFailed("JSON Parse error"));
			})			
		} else {
			alert("Wrong username or password")
			dispatch(loginFailed("Wrong username or password"));
		}	
	}).catch((error) => {
		dispatch(loginFailed("Wrong username or password"));
	})			
  }		
}

//Action creators

export const loginSuccess = (token) => {
	console.log("Action creator - Login success");
	return {
		type:LOGIN_SUCCESS,
		token:token
	}
}	

export const loginFailed = (error) => {
	console.log("Action creator - login failed");
	return  {
		type:LOGIN_FAILED,
		error: error
	}
} 
		

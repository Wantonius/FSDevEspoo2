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
				sessionStorage.setItem("isLogged", "true");
				sessionStorage.setItem("token", data.token)
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

export const onLogout = (token) => {
	return dispatch => {
			let logoutObject ={
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json",
					 "token":token}
		}
		return fetch("/logout", logoutObject).then((response) => {
			sessionStorage.setItem("isLogged", "false");
			sessionStorage.setItem("token", "");			
			dispatch(logoutSuccess())
		}).catch((error) => {
			dispatch(logoutFailed(error))
		})	
	}
}

export const onRegister = (user) => {
	return dispatch => {
	let registerObject = {
		method:"POST",
		mode:"cors",
		headers:{"Content-Type":"application/json"},
		body:JSON.stringify(user)
	  }
	 return fetch("/register", registerObject).then((response) => {
		if(response.ok) {
			alert("Register successful")
			dispatch(registerSuccess());
		}
		if(response.status === 409) {
			alert("Username already in use")
			dispatch(registerFailed("Username already in use"));
		}
	  }).catch((error) => {
			dispatch(registerFailed(error));
	  })
	}
} 

//Action creators

export const loginRedirect = () => {
	return {
		type:LOGIN_REDIRECT
	}
}

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
	
export const logoutSuccess = () => {
	return {
		type:LOGOUT_SUCCESS
	}
}	

export const logoutFailed = (error) => {
	return {
		type:LOGOUT_FAILED,
		error:error
	}
}

export const registerSuccess = () => {
	return {
		type:REGISTER_SUCCESS
	}
}

export const registerFailed = (error) => {
	return {
		type:REGISTER_FAILED,
		error:error
	}
}
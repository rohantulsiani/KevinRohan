const AUTH_DONE = "AuthDone"

export const dispatchAuthDone = (snapshot) => {
	return {
		type: AUTH_DONE,
	}
}

export default function(state=false, action) {
	switch(action.type) { 			
		case AUTH_DONE:
			return true
		default:
			return state
	}	
}
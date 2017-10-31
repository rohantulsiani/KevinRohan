const ATTEMPT_LOGIN = 'AttemptLogin';
const ATTEMPT_REGISTER = 'AttemptRegister';

export const dispatchAttemptLogin = (user) => {
	return {
		type: ATTEMPT_LOGIN,
		payload: user
	};
};

export default function(state = '', action) {
	switch(action.type) { 
		case ATTEMPT_LOGIN:
//			console.log(action.payload);			
			return action.payload;
		default:
			return state;
	}	
}
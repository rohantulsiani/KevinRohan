const GET_CHATROOMS = "GetChatroomsFromFirebase"

export const dispatchGetChatrooms = (snapshotVal) => {
	return {
		type: GET_CHATROOMS,
		payload: snapshotVal
	}
}

export default function(state = [], action) {
	switch(action.type) { 			
		case GET_CHATROOMS:
			return action.payload
		default:
			return state
	}	
}
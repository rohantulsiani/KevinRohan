const GET_ENTITY = "GetEntityFromFirebase"

export const dispatchGetEntity = (snapshotVal) => {
	if(snapshotVal === null) {
		snapshotVal = [];
	}
	
	return {
		type: GET_ENTITY,
		payload: snapshotVal
	}
}

export default function(state = [], action) {
	switch(action.type) { 			
		case GET_ENTITY:
			return action.payload
		default:
			return state
	}	
}
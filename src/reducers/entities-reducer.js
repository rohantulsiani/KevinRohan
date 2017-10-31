const GET_ENTITIES = "GetEntitiesFromFirebase"

export const dispatchGetEntities = (snapshotVal) => {
	return {
		type: GET_ENTITIES,
		payload: snapshotVal
	}
}

export default function(state = [], action) {
	switch(action.type) { 			
		case GET_ENTITIES:
			return action.payload
		default:
			return state
	}	
}
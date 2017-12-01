const GET_REPORTS = "GetReportsFromFirebase"

export const dispatchGetReports = (snapshotVal) => {
	return {
		type: GET_REPORTS,
		payload: snapshotVal
	}
}

export default function(state = [], action) {
	switch(action.type) { 			
		case GET_REPORTS:
			return action.payload
		default:
			return state
	}	
}
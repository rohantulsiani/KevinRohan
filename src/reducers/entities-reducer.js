const GET_ENTITIES = "GetEntitiesFromFirebase"

export const GetEntitiesFromFirebase = () => {
	return (dispatch) => {
    	setTimeout(() => {
      	dispatch(() => {
      		console.log("b")
      		return {
      			type: "GetEntitiesFromFirebase",
      			payload: [1]
      		}
      	});
    }, 1000);
  }
}

export default function(state = [], action) {
	console.log("A")
	switch(action.type) { 			
		case "GetEntitiesFromFirebase":
			return action.payload
		default:
			return state
	}	
}
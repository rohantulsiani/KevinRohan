const GET_USERS = "GetUsersFromFirebase"

export const dispatchGetUsers = (snapshotVal) => {
  return {
    type: GET_USERS,
    payload: snapshotVal
  }
}

export default function(state = [], action) {
  switch(action.type) {
    case GET_USERS:
      return action.payload
    default:
      return state
  }
}
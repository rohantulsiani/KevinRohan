import { combineReducers } from 'redux'
import EntitiesReducer from './entities-reducer'
import EntityReducer from './entity-reducer'
import ChatroomsReducer from './chatrooms-reducer'
import ReportsReducer from './reports-reducer'
import LoginReducer from './login-reducer'
import UserReducer from './users-reducer'

const rootReducer = combineReducers({
  users: UserReducer,
  entities: EntitiesReducer,
  loginInfo: LoginReducer,
  entity: EntityReducer,
  chatrooms: ChatroomsReducer,
  reports: ReportsReducer
});

export default rootReducer;

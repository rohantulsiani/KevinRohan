import { combineReducers } from 'redux'
import EntitiesReducer from './entities-reducer'
import EntityReducer from './entity-reducer'
import LoginReducer from './login-reducer'
import onAuthReducer from './on-auth-reducer'

const rootReducer = combineReducers({
  entities: EntitiesReducer,
  loginInfo: LoginReducer,
  authDone: onAuthReducer,
  entity: EntityReducer,
  loginInfo: LoginReducer
});

export default rootReducer;

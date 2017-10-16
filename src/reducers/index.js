import { combineReducers } from 'redux';
import EntitiesReducer from './entities-reducer'
import LoginReducer from './login-reducer'
import onAuthReducer from './on-auth-reducer'

const rootReducer = combineReducers({
  entities: EntitiesReducer,
  loginInfo: LoginReducer,
  authDone: onAuthReducer
});

export default rootReducer;

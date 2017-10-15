import { combineReducers } from 'redux';
import EntitiesReducer from './entities-reducer'
import LoginReducer from './login-reducer'

const rootReducer = combineReducers({
  entities: EntitiesReducer,
  loginInfo: LoginReducer
});

export default rootReducer;

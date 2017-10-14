import { combineReducers } from 'redux';
import EntitiesReducer from './entities-reducer'

const rootReducer = combineReducers({
  entities: EntitiesReducer
});

export default rootReducer;

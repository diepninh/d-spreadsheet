import { combineReducers } from 'redux';
import excel from './excel';
import optionsFontFamily from './optionsFontFamily.js';

const myReducer = combineReducers({
  excel : excel,
  optionsFontFamily : optionsFontFamily,
});
export default myReducer ;
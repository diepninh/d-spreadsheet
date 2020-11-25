import { combineReducers } from 'redux';
import excel from './excel'

const myReducer = combineReducers({
    excel : excel
});
export default myReducer ;
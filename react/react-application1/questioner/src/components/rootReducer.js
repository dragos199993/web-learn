import { combineReducers } from 'redux';
import user from '../reducers/user';
import questions from '../reducers/questions';

export default combineReducers({
    user,
    questions
})
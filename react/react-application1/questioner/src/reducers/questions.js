import { createSelector } from 'reselect';

export default function questions( state={}, action={}){
    switch(action.type){

        default: return state;
    }
}



//SELECTOR

export const questionsSelector = state => state.questions;
export const allQuestionsSelector = createSelector(
    questionsSelector,
    questionsHash => Object.values(questionsHash)
);
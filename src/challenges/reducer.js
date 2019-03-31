import { createAction, handleActions } from 'redux-actions';

const initialState =  [];

const UPDATE_ALL_CHALLENGES = (state, { payload }) => {
    return payload;
};

export const setAllChallenges = createAction('UPDATE_ALL_CHALLENGES');

export default handleActions({
    UPDATE_ALL_CHALLENGES,
}, initialState);

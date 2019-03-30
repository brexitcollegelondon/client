import { createAction, handleActions } from 'redux-actions';

const initialState = {
    user_id: "gerald",
};

const UPDATE_USER_ID = (state, { payload }) => {
    return { ...state, user_id: payload };
};

export const setUserId = createAction('UPDATE_USER_ID');

export default handleActions({
    UPDATE_USER_ID,
}, initialState);

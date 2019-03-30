import { createAction, handleActions } from 'redux-actions';

const initialState = {
    user_id: "gerald",
    current_amount: 97.0,
};

const UPDATE_USER_INFO = (state, { payload }) => {
    return payload;
};

export const setUserInfo = createAction('UPDATE_USER_INFO');

export default handleActions({
    UPDATE_USER_INFO,
}, initialState);

import { createAction, handleActions } from 'redux-actions';

const initialState = {
    user_id: "gerald",
    user_info: {
        challenges: ["0","1"],
        current_amount: 100.0,
    },
};

const UPDATE_USER_ID = (state, { payload }) => {
    return { ...state, user_id: payload };
};

const UPDATE_USER_INFO = (state, { payload }) => {
    return { ...state, user_info: payload };
};

export const setUserId = createAction('UPDATE_USER_ID');
export const setUserInfo = createAction('UPDATE_USER_INFO');

export default handleActions({
    UPDATE_USER_ID,
    UPDATE_USER_INFO,
}, initialState);

import { createAction, handleActions } from 'redux-actions';

const initialState = {
    user_info: {
        challenges: ["0","1"],
        current_amount: 97.0,
    },
};

const UPDATE_USER_INFO = (state, { payload }) => {
    return { ...state, user_info: payload };
};

export const setUserInfo = createAction('UPDATE_USER_INFO');

export default handleActions({
    UPDATE_USER_INFO,
}, initialState);

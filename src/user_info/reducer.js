import { createAction, handleActions } from 'redux-actions';

const initialState = {
    user_id: "",
    is_logged_in: false,
    current_balance: 0,
};

const UPDATE_USER_INFO = (state, { payload }) => {
    return payload;
};

const LOG_IN = (state) => {
    return { ...state, is_logged_in: true};
};

export const setUserInfo = createAction('UPDATE_USER_INFO');
export const logIn = createAction('LOG_IN');

export default handleActions({
    UPDATE_USER_INFO, LOG_IN
}, initialState);

import { createAction, handleActions } from 'redux-actions';

const initialState = {
    challenge_type: "",
		target_quantity: "",
		duration: 0,
		start_time: "",
		pledge_amount: 0
};

const SET_CHALLENGE_TYPE = (state, { payload }) => {
	  return {...state, challenge_type: payload};
};

const SET_TARGET_QUANTITY = (state, { payload }) => {
	  return {...state, target_quantity: payload};
};

const SET_DURATION = (state, { payload }) => {
	  return {...state, duration: payload};
};

const SET_START_TIME = (state, { payload }) => {
	  return {...state, start_time: payload};
};

const SET_PLEDGE_AMOUNT = (state, { payload }) => {
	  return {...state, pledge_amount: payload};
};

const setChallengeType = createAction('SET_CHALLENGE_TYPE');

const setTargetQuantity = createAction('SET_TARGET_QUANTITY');

const setDuration = createAction('SET_DURATION');

const setStartTime = createAction('SET_START_TIME');

const setPledgeAmount = createAction('SET_PLEDGE_AMOUNT');

export {setChallengeType, setTargetQuantity, setDuration, setStartTime, setPledgeAmount}

export default handleActions({
    SET_CHALLENGE_TYPE,
		SET_TARGET_QUANTITY,
		SET_DURATION,
		SET_START_TIME,
		SET_PLEDGE_AMOUNT,
}, initialState);

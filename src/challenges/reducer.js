import { createAction, handleActions } from 'redux-actions';

const initialState = {
    challenges: [
        {
            challenge_id: "1",
            participants: [
                {
                    user_id: "gerald",
                    is_bystander: false,
                },
                {
                    user_id: "tiger",
                    is_bystander: false,
                },
            ],
            challenge_type: "STEPS",
            challenge_duration: 30, // (int) in seconds (for demo)
            start_time: "2019-03-31T00:05:32.000Z", // datetimestring
            pledge_amount: 15, // in DCT
            target_quantity: 20, // 20 steps for this challenge
        },
    ],
};

const UPDATE_ALL_CHALLENGES = (state, { payload }) => {
    return { ...state, challenges: payload };
};

export const setAllChallenges = createAction('UPDATE_ALL_CHALLENGES');

export default handleActions({
    UPDATE_ALL_CHALLENGES,
}, initialState);

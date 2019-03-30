import { createAction, handleActions } from 'redux-actions';

const initialState =  [
        {
            challenge_id: "1",
            creator_id: "gerald",
            creator_bystander: true,
            duration: 20,
            start_time: "2019-03-31T00:05:32.000Z", // datetimestring
            pledge_amount: 15, // in DCT
            bystanders: [
                "gerald",
            ],
            participants: [],
            challenge_type: "STEPS",
            target_quantity: 20, // 20 steps for this challenge
        },
    ];

const UPDATE_ALL_CHALLENGES = (state, { payload }) => {
    return payload;
};

export const setAllChallenges = createAction('UPDATE_ALL_CHALLENGES');

export default handleActions({
    UPDATE_ALL_CHALLENGES,
}, initialState);

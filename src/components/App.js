import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import { ChallengeTable } from "./ChallengeTable";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCard, MDBCardBody} from "mdbreact";

import { selectUserInfo, selectChallenges } from "../reduxStore/selectors";
import { setAllChallenges } from "../challenges/reducer";
import { setUserInfo } from "../user_info/reducer";
import * as PropTypes from "prop-types";

class App extends Component {
    constructor(props) {
        super(props);
        const postSampleChallenge = () => {
            axios.post('http://127.0.0.1:5000/challenge', {
                challenge_id: "1",
                creator_id: "gerald",
                creator_bystander: false,
                duration: 20,
                start_time: "2019-03-31T00:05:32.000Z", // datetimestring
                pledge_amount: 15, // in DCT
                bystanders: [],
                participants: [],
                challenge_type: "STEPS",
                target_quantity: 20, // 20 steps for this challenge
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        postSampleChallenge();

        this.getAllChallenges = this.getAllChallenges.bind(this);

        this.getAllChallenges();
    }

    getAllChallenges() {
        const {dispatch} = this.props;
        axios.get('http://127.0.0.1:5000/challenges')
            .then(function (response) {
                // list of challenge objects returned
                const res = response.data;
                dispatch(setAllChallenges(res));
            })
            .catch(function (error) {
                // handle error
                console.error(error);
            });
    }

    render() {
        let {challenges, user_info} = this.props;
        const ChallengeHeaders = ['Challenge Type', 'Quantity', 'Duration', 'Start Time', 'Pledge Amount', 'No. Participants'];
        const getOngoingChallenges = () => {
            let ongoing = [];
            challenges.forEach(challenge => {
                challenge.participants.forEach(participant => {
                    if (participant === user_info.user_id) {
                        ongoing.push(challenge);
                    }
                });
            });
            return ongoing;
        };
        return (
            <MDBContainer>
                <MDBRow>
                    {/* Decent Life Banner */}
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        {/* Ongoing Challenges Table */}
                        <ChallengeTable headers={ChallengeHeaders} challenges={getOngoingChallenges()}/>
                    </MDBCol>
                </MDBRow>
                {/* TODO: Create some spacing */}
                <MDBRow>
                    <MDBCol>
                        {/* Available Challenges Table  */}
                        <ChallengeTable headers={ChallengeHeaders} challenges={challenges}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        {/* Create a new challenge */}
                        <MDBBtn color="default" rounded floating>
                            Create Challenge
                        </MDBBtn>
                    </MDBCol>
                    <MDBCol>
                        {/* Display balance */}
                        <MDBCard>
                            <MDBCardBody>Balance: {user_info.current_amount} DCT</MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

App.propTypes = {
    challenges: PropTypes.any,
    user_info: PropTypes.any,
    dispatch: PropTypes.any
};

function mapStateToProps(state) {
  return {
    challenges: selectChallenges(state),
    user_info: selectUserInfo(state),
  };
}

export default connect(mapStateToProps)(App);

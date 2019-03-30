import React from 'react';
import {connect} from 'react-redux';

import { ChallengeTable } from "./ChallengeTable";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCard, MDBCardBody} from "mdbreact";

import { selectUserId, selectUserInfo, selectChallenges } from "../reduxStore/selectors";
import { setAllChallenges } from "../challenges/reducer";
import { setUserInfo } from "../user_info/reducer";
import { setUserId } from "../user_id/reducer";

function App({ challenges: { challenges }, user_id: { user_id }, user_info: { user_info } }) {
  setUserId();
  setUserInfo();
  setAllChallenges();
  const ChallengeHeaders = ['Challenge Type', 'Quantity', 'Duration', 'Start Time', 'Pledge Amount', 'No. Participants'];
  const getOngoingChallenges = () => {
    let ongoing = [];
    challenges.forEach(challenge => {
      user_info.challenges.forEach(challenge_id => {
          if (challenge_id === challenge.challenge_id) {
            ongoing.push(challenge);
          }
      })
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

function mapStateToProps(state) {
  return {
    challenges: selectChallenges(state),
    user_id: selectUserId(state),
    user_info: selectUserInfo(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserId() {
        dispatch(setUserId())
    },
    setUserInfo() {
        dispatch(setUserInfo())
    },
    setAllChallenges() {
        dispatch(setAllChallenges())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

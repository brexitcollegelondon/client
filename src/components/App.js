import React from 'react';
import {connect} from 'react-redux';

import { ChallengeTable } from "./ChallengeTable";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCard, MDBCardBody} from "mdbreact";

import { selectUserId, selectUserInfo, selectChallenges } from "../reduxStore/selectors";
import { setAllChallenges } from "../challenges/reducer";
import { setUserInfo } from "../user_info/reducer";
import { setUserId } from "../user_id/reducer";

function App({ challenges: { challenges }, user_id: { user_id }, user_info: { user_info } }) {
  return (
    <MDBContainer>
        <MDBRow>
          {/* Decent Life Banner */}
        </MDBRow>
        <MDBRow>
          <MDBCol>
           {/* Ongoing Challenges Table */}
           <ChallengeTable headers={ChallengeHeaders} />
          </MDBCol>
        </MDBRow>
        {/* TODO: Create some spacing */}
        <MDBRow>
          <MDBCol>
          {/* Available Challenges Table  */}
          <ChallengeTable headers={ChallengeHeaders} />
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
              <MDBCardBody>Balance: {Balance} DCT</MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
  );
}

const ChallengeHeaders = ['Challenge Type', 'Quantity', 'Duration', 'Start Time', 'Pledge Amount'];

const Balance = 100;

function mapStateToProps(state) {
  return {
    challenges: selectChallenges(state),
    user_id: selectUserId(state),
    user_info: selectUserInfo(state),
  };
}

export default connect(mapStateToProps)(App);

import React from 'react';
import {connect} from 'react-redux';

import { ChallengeTable } from "./ChallengeTable";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCard, MDBCardBody} from "mdbreact";

import { selectBar, selectFoo } from "../reduxStore/selectors";
import { incrementCounter, decrementCounter } from "../foo/reducer";
import { getBarData } from '../bar/reducer';

// TODO: rename this file
function App({ foo: { counter }, bar: { data }, increment, decrement, getBarData }) {
  getBarData();
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

const ChallengeHeaders = ['Challenge Type', 'Quantity', 'Duration', 'Start Time', 'Pledge Amount']

const Balance = 100

function mapStateToProps(state) {
  return {
    foo: selectFoo(state),
    bar: selectBar(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increment() {
      dispatch(incrementCounter())
    },
    decrement() {
      dispatch(decrementCounter())
    },
    getBarData() {
      dispatch(getBarData())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

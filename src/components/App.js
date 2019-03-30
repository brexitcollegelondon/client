import React from 'react';
import {connect} from 'react-redux';

import { ChallengeTable } from "./ChallengeTable";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

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
           <ChallengeTable headers={OngoingChallengeHeaders} />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
          {/* Available Challenges Table  */}
          </MDBCol>
        </MDBRow>
        <MDBRow>
        {/* Create some spacing */}
        </MDBRow>

      </MDBContainer>
  );
}

const OngoingChallengeHeaders = ['Challenge Type', 'Quantity', 'Duration', 'Start Time']

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

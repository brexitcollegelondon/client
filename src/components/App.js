import React from 'react';
import {connect} from 'react-redux';

import { BasicTable } from "./ChallengeTable";
import { selectBar, selectFoo } from "../reduxStore/selectors";
import { incrementCounter, decrementCounter } from "../foo/reducer";
import { getBarData } from '../bar/reducer';

// TODO: rename this file
function App({ foo: { counter }, bar: { data }, increment, decrement, getBarData }) {
  getBarData();
  return (
    <BasicTable />
  );
}

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

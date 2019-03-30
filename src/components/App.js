import React from 'react';
import {connect} from 'react-redux';

import { BasicTable } from "./ChallengeTable";
import { selectUserId, selectUserInfo, selectChallenges } from "../reduxStore/selectors";
import { setAllChallenges } from "../challenges/reducer";
import { setUserInfo } from "../user_info/reducer";
import { setUserId } from "../user_id/reducer";

function App({ challenges: { challenges }, user_id: { user_id }, user_info: { user_info } }) {
  return (
    <BasicTable />
  );
}

function mapStateToProps(state) {
  return {
    challenges: selectChallenges(state),
    user_id: selectUserId(state),
    user_info: selectUserInfo(state),
  };
}

export default connect(mapStateToProps)(App);

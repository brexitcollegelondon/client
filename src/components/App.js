import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DecentLifeAppBar from "./AppBar"
import ChallengeDialog from "./ChallengeDialog"
import ChallengeTable from "./ChallengeTable";

import { selectUserId, selectUserInfo, selectChallenges } from "../reduxStore/selectors";
import { setAllChallenges } from "../challenges/reducer";
import { setUserInfo } from "../user_info/reducer";
import { setUserId } from "../user_id/reducer";

function App({ challenges: { challenges }, user_id: { user_id }, user_info: { user_info } }) {
  setUserId();
  setUserInfo();
  setAllChallenges();

  const getOngoingChallenges = () => {
    let ongoing = [];
    challenges.forEach(challenge => {
      user_info.challenges.forEach(challenge_id => {
          if (challenge_id === challenge.challenge_id) {
            ongoing.push(challenge);
          }
      });
    });
    return ongoing;
  };

  return (
    <Fragment>
    <Fragment>
      <DecentLifeAppBar />
    </Fragment>
    <Fragment>
    {/* Current Challenges Table  */}
    <ChallengeTable challenges={getOngoingChallenges()} />

    {/* Available Challenges Table  */}
    <ChallengeTable challenges={challenges} />
    </Fragment>
    <Fragment>
    {/* Create a new challenge */}
    <ChallengeDialog />

    {/* Display balance */}
    <Paper elevation={1}>
        <Typography variant="h5" component="h3">
          Balance
        </Typography>
        <Typography component="p">
          100
        </Typography>
      </Paper>
    </Fragment>
    </Fragment>
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

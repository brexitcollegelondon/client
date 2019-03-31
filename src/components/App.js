import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DecentLifeAppBar from "./AppBar"
import ChallengeDialog from "./ChallengeDialog"
import ChallengeTable from "./ChallengeTable";
import MyChallengeTable from "./MyChallengeTable";

import { selectUserInfo, selectChallenges } from "../reduxStore/selectors";
import { setAllChallenges } from "../challenges/reducer";
import * as PropTypes from "prop-types";

class App extends Component {
    constructor(props) {
        super(props);

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
          <Grid container spacing={Number(8)}>
            <DecentLifeAppBar />
            <Grid container justify="space-evenly" spacing={Number(24)}>
              {/* Current Challenges Table  */}
              <Grid item xs={12}>
                <MyChallengeTable challenges={getOngoingChallenges()} title='Your Challenges'/>
              </Grid>
              <Divider variant="middle" />
              <Grid item xs={12}>
                {/* Available Challenges Table  */}
                <ChallengeTable challenges={challenges} title='All Challenges'/>
              </Grid>
              <Divider variant="middle" />
              <Grid item xs={3}>
                {/* Create a new challenge */}
                <ChallengeDialog />
              </Grid>
              <Grid item xs={3}>
                {/* Display balance */}
                <Paper elevation={1}>
                  <Typography variant="h5" component="h3">
                    Balance
                    <Typography component="">
                    {user_info.current_amount} DCT
                    </Typography>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
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

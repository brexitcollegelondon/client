import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import { selectChallenges, selectUserInfo } from "../reduxStore/selectors";
import connect from "react-redux/es/connect/connect";
import {setAllChallenges} from "../challenges/reducer";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "primary",
    color: theme.palette.common.black,
		fontSize: 14,
  },
  body: {
    fontSize: 10,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
});


const challengeHeaders = ['Challenge Type', 'Quantity', 'Duration', 'Start Time', 'Pledge Amount', 'No. Participants'];

class ChallengeTable extends React.Component {
  state = {
      open: false,
      id: -1,
  };
  getAllChallenges = () => {
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
  };
  handleClick = (challenge_id) => {
      this.setState({ open: true, id: challenge_id });
      console.log("clicked");
  };
  handleClose = () => {
      this.setState({ open: false });
  };
  handleJoin = () => {
    const { user_info } = this.props;
    axios.post('http://127.0.0.1:5000/join_challenge', {
        challenge_id: this.state.id,
        user_id: user_info.user_id,
        is_bystander: false,
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(this.getAllChallenges);
    this.setState({ open: false });
  };
  render() {
      const {classes, challenges, title} = this.props;
      return (
          <Paper className={classes.root}>
              <Toolbar className={classNames(classes.root)}>
                  <div className={classes.title}>
                      <Typography variant="h3" id="tableTitle">
                          {title}
                      </Typography>
                  </div>
                  <div className={classes.spacer}/>
              </Toolbar>
              <div className={classes.tableWrapper}>
                  <Table className={classes.table}>
                      <TableHead>
                          <TableRow>
                              {challengeHeaders.map(header => <CustomTableCell>{header}</CustomTableCell>)}
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {
                              challenges.map(challenge => (
                                  <TableRow className={classes.row} key={challenge.challenge_id}
                                            onClick={() => this.handleClick(challenge.challenge_id)}>
                                      <CustomTableCell>{challenge.challenge_type}</CustomTableCell>
                                      <CustomTableCell>{challenge.target_quantity}</CustomTableCell>
                                      <CustomTableCell>{challenge.duration}</CustomTableCell>
                                      <CustomTableCell>{challenge.start_time}</CustomTableCell>
                                      <CustomTableCell>{challenge.pledge_amount}</CustomTableCell>
                                      <CustomTableCell>{challenge.participants.length}</CustomTableCell>
                                  </TableRow>
                              ))
                          }
                      </TableBody>
                  </Table>
              </div>
              <Dialog
                  fullWidth={true}
                  maxWidth='lg'
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
              >
                  <DialogTitle id="form-dialog-title">Join Challenge</DialogTitle>
                  <DialogContent>
                      <DialogContentText>
                          Join this challenge to try and gain your friend's Decent!
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                      <Button size='large' onClick={this.handleClose} color="primary">
                          Cancel
                      </Button>
                      <Button size='large' onClick={this.handleJoin} color="primary">
                          Join
                      </Button>
                  </DialogActions>
              </Dialog>
          </Paper>
      );
  }
}

ChallengeTable.propTypes = {
  classes: PropTypes.object.isRequired,
  user_info: PropTypes.any,
  challenges: PropTypes.any,
  dispatch: PropTypes.any
};

function mapStateToProps(state) {
    return {
        challenges: selectChallenges(state),
        user_info: selectUserInfo(state),
    };
}

export default connect(mapStateToProps)(withStyles(styles)(ChallengeTable));

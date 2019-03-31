import React from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import { selectCreate } from '../reduxStore/selectors';
import CreateChallengeForm from './CreateChallengeForm'

class ChallengeDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCreate = () => {
    const { create } = this.props;
    console.log(create);
    this.setState({ open: false });
  };

  render() {
    return (
      <Grid container spacing={24}>
			  <Button color="primary" variant="contained" aria-label="create" size='large'onClick={this.handleClickOpen}>
          <AddIcon />
          <Typography color='inherit' variant="h5" component="h3">
            Create Challenge
          </Typography>
	      </Button>
        <Dialog
          maxWidth='xs'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container alignItems='center' spacing={16}>
            <Grid item xs={12}>
              <DialogTitle id="form-dialog-title">Create a new challenge</DialogTitle>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>
              Create a new challenge to try and gain your friend's Decent!
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <CreateChallengeForm />
            </Grid>
          </Grid>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button size='large' onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button size='large' onClick={this.handleCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
	return {
		create: selectCreate(state),
	};
}

export default connect(mapStateToProps)(ChallengeDialog)

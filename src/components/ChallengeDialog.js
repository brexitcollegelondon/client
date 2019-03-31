import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import { selectCreate } from '../reduxStore/selectors';
import CreateChallengeForm from './CreateChallengeForm'

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

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

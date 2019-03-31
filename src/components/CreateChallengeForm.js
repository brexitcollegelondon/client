import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import * as PropTypes from "prop-types";

import { selectCreate } from '../reduxStore/selectors';
import {setChallengeType, setTargetQuantity, setDuration, setStartTime, setPledgeAmount} from '../create/reducer'

const styles = theme => ({
	root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
		flexBasis: 200,
  },
});

class ChallengeTypes extends React.Component {
  handleChange = event => {
		const { dispatch } = this.props;
		console.log(event.target.value);
    dispatch(setChallengeType(event.target.value))
  };

  render() {
		const { create } = this.props;
    return (
      <div>
			  <FormControl component="fieldset" >
				  <FormLabel component="legend">Challenge Type</FormLabel>
					  <RadioGroup
						row
						aria-label="Types"
						name="type"
						value={create.challenge_type}
						onChange={this.handleChange}
					  >
							<FormControlLabel value="steps" control={<Radio />} label="Steps" />
							<FormControlLabel value="sleep" control={<Radio />} label="Sleep" />
							<FormControlLabel value="exercise" control={<Radio />} label="Exercise" />
				    </RadioGroup>
			   </FormControl>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		create: selectCreate(state),
	};
}

ChallengeTypes.propTypes = {
	dispatch: PropTypes.any,
	create: PropTypes.any
}

const ChallengeSelection = withStyles(styles)(connect(mapStateToProps)(ChallengeTypes))

class InputQuantity extends React.Component {

	handleChange = event => {
		const { dispatch, type } = this.props;
		console.log(event.target.value);
		if (type === 'pledge') {
			dispatch(setPledgeAmount(event.target.value))
		} else if (type === 'quantity') {
			dispatch(setTargetQuantity(event.target.value))
		} else if (type === 'duration') {
			dispatch(setDuration(event.target.value))
		} else {
			dispatch(setStartTime(event.target.value))
		}
  };

	render() {
		const { classes, type, label, create } = this.props;
		let value;
		if (type === 'pledge') {
			value = create.pledge_amount;
		} else if (type === 'quantity') {
			value = create.target_quantity;
		} else if (type === 'duration') {
			value = create.duration;
		} else {
			value = create.start_time;
		}
	  return (
			<div className={classes.root}>
				<TextField
		          id="filled-adornment-amount"
		          className={classNames(classes.margin, classes.textField)}
		          variant="filled"
		          label={label}
		          value={value}
		          onChange={this.handleChange}
		          InputProps={{
		            endAdornment: <InputAdornment position="end">{type === 'pledge' ? "DCT" : ""}</InputAdornment>,
		          }}
		        />
			</div>
		)
	}
}

InputQuantity.propTypes = {
	classes: PropTypes.object.isRequired,
	dispatch: PropTypes.any,
	create: PropTypes.any
}

const QuantityPicker = withStyles(styles)(connect(mapStateToProps)(InputQuantity))

export default class CreateChallengeForm extends React.Component {
	render() {
		return (
			<Grid container spacing={24}>
			  <Grid item xs={12}>
			    <ChallengeSelection />
				</Grid>
				<Grid item xs={12}>
			    <QuantityPicker type='quantity' label='Quantity'/>
				</Grid>
				<Grid item xs={12}>
			    <QuantityPicker type='duration' label='Duration'/>
				</Grid>
				<Grid item xs={12}>
			    <QuantityPicker type='start_time' label='Start Time'/>
				</Grid>
				<Grid item xs={12}>
			    <QuantityPicker type='pledge' label='Pledge Amount'/>
				</Grid>
			</Grid>
		);
	}
}

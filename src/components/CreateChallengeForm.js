import React, { Fragment } from 'react';
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
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
		const divStyle = {
   		paddingLeft: "5em",
			paddingRight: "5em"
			};
    return (
      <div style={divStyle} >
			  <FormControl component="container" style={{width: "100%", textAlign: "center"}}>
				  <FormLabel component="legend" style={{paddingTop: '2rem', paddingBottom: '0.4rem', marginBottom: 0}}>
						<span style={{ fontSize: '2rem'}}>Challenge Type</span>
					</FormLabel>
					  <RadioGroup
						row
						aria-label="Types"
						name="type"
						value={create.challenge_type}
						onChange={this.handleChange}
						style={{margin: '0 auto 2rem'}}
					  >
							<FormControlLabel value="steps" control={<Radio />} label={<span style={{fontSize: '1.7rem'}}>Steps</span>}/>
							<FormControlLabel value="sleep" control={<Radio />} label={<span style={{fontSize: '1.7rem'}}>Sleep</span>} />
							<FormControlLabel value="exercise" control={<Radio />} label={<span style={{fontSize: '1.7rem'}}>Exercise</span>} />
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

const ChallengeSelection = withStyles(styles)(connect(mapStateToProps)(ChallengeTypes));

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
							defaultValue={0}
		          label={label}
		          value={value}
		          onChange={this.handleChange}
		          InputProps={{
								endAdornment: <InputAdornment position="end">{type === 'pledge' ? <span style={{fontSize: "1.5rem"}}>DCT</span> : ""}</InputAdornment>,
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

const QuantityPicker = withStyles(styles)(connect(mapStateToProps)(InputQuantity));

function QuantityPickerLabel({ text }) {
	return <span style={{fontSize: '1.7rem'}}>{text}</span>;
}

export default class CreateChallengeForm extends React.Component {
	render() {
		return (
			<Fragment>
				<Grid container spacing={12} style={{margin: '3rem auto'}}>
          <Grid item xs={12}>
            <ChallengeSelection style={{width: "100%"}} />
          </Grid>
				</Grid>
			<Grid container spacing={12} style={{justifyContent: "space-evenly"}}>
				<Grid item xl={6}>
					<QuantityPicker type='quantity' label={<QuantityPickerLabel text="Quantity" />}/>
				</Grid>
				<Grid item xl={6}>
			    <QuantityPicker type='duration' label={<QuantityPickerLabel text="Duration" />}/>
				</Grid>
				<Grid item xl={6}>
			    <QuantityPicker type='start_time' label={<QuantityPickerLabel text="Start Time" />}/>
				</Grid>
				<Grid item xl={6}>
			    <QuantityPicker type='pledge' label={<QuantityPickerLabel text="Pledge Amount" />}/>
				</Grid>
			</Grid>
			</Fragment>
		);
	}
}

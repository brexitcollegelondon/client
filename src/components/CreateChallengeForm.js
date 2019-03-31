import React from 'react';
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
  state = {
    selectedValue: 'steps',
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };

  render() {
    return (
      <div>
			  <FormControl component="fieldset" >
				  <FormLabel component="legend">Challenge Type</FormLabel>
					  <RadioGroup
						row
						aria-label="Types"
						name="type"
						value={this.state.value}
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

const ChallengeSelection = withStyles(styles)(ChallengeTypes)

class InputQuantity extends React.Component {
	state = {
    amount: '',
	}

	handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

	render() {
		const { classes, pledge } = this.props;

	  return (
			<div className={classes.root}>
				<TextField
		          id="filled-adornment-amount"
		          className={classNames(classes.margin, classes.textField)}
		          variant="filled"
		          label={pledge ? "Pledge Amount" : "Quantity"}
		          value={this.state.amount}
		          onChange={this.handleChange('amount')}
		          InputProps={{
		            endAdornment: <InputAdornment position="end">{pledge ? "DCT" : ""}</InputAdornment>,
		          }}
		        />
			</div>
		)
	}
}

const QuantityPicker = withStyles(styles)(InputQuantity)

function TimePicker(props) {
  const { classes, type, label, defaultValue } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
			  id={type}
        label={label}
        type={type}
        defaultValue={defaultValue}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
    </form>
  );
}

const DurationPicker = withStyles(styles)(TimePicker)

export default class CreateChallengeForm extends React.Component {
	render() {
		return (
			<Grid container spacing={24}>
			  <Grid item xs={12}>
			    <ChallengeSelection />
				</Grid>
				<Grid item xs={12}>
			    <QuantityPicker pledge={false}/>
				</Grid>
				<Grid item xs={12}>
			    <DurationPicker type='time' label='Duration' defaultValue='00:00'/>
				</Grid>
				<Grid item xs={12}>
			    <DurationPicker type='date' label='Start Date' defaultValue='Now'/>
				</Grid>
				<Grid item xs={12}>
			    <QuantityPicker pledge={true}/>
				</Grid>
			</Grid>
		);
	}
}

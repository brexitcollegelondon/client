import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class LoginTextField extends React.Component {
  state = {
    login: '',
  };

  handleChange = login => event => {
    this.setState({
      [login]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-login"
          label="Login"
          className={classes.textField}
          value={this.state.login}
          onChange={this.handleChange('login')}
          margin="normal"
          variant="outlined"
        />
      </form>
    );
  }
}

LoginTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginTextField);

import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';


import { setUserInfo } from "../user_info/reducer";
import { selectChallenges, selectUserInfo } from "../reduxStore/selectors";
import { SERVER_ENDPOINT } from "../urlEndpoints";

const styles = theme => ({
  cssFocused: {},
  cssLabel: {
    '&$cssFocused': {
      color: "black",
      fontSize: 16
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    '&$cssFocused': {
      color: "black",
      fontSize: 16
    },
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    position: 'relative',
    top: theme.spacing.unit * 10,
    display: 'inline-block',
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

  handleSubmit = () => {
    console.log(this.state.login);
    const { dispatch } = this.props;
    const user_id = this.state.login;
    axios.get(`${SERVER_ENDPOINT}/users/${user_id}`)
        .then(function (response) {
            // user_info object returned
            const res = response.data;
            console.log(res);
            dispatch(setUserInfo(res));
        })
        .catch(function (error) {
            // handle error
            console.error(error);
            dispatch(setUserInfo({ user_id: '', current_amount: 0 }));
        });
    return false;
  };

  render() {
    const { classes } = this.props;

    return (
        <form className={classes.container} noValidate autoComplete="off">
          <div>
          <TextField
          className={classes.textField}
          value={this.state.login}
          id="input-with-icon-textfield"
          label="Login"
          onChange={this.handleChange('login')}
          InputLabelProps={{
            /* Css to make label text darker on focus */
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Fab size='medium' color="secondary" variant="fab" aria-label="login" type='button' onClick={this.handleSubmit}>
                  <AccountCircle />
                </Fab>
              </InputAdornment>
            ),
            classes: {
              focused: classes.cssFocused
            },
          }}
          />
          </div>
        </form>
    );
  }
}

LoginTextField.propTypes = {
    classes: PropTypes.object.isRequired,
    challenges: PropTypes.any,
    user_info: PropTypes.any,
    dispatch: PropTypes.any,
};

function mapStateToProps(state) {
    return {
        challenges: selectChallenges(state),
        user_info: selectUserInfo(state),
    };
}

export default connect(mapStateToProps)(withStyles(styles)(LoginTextField));

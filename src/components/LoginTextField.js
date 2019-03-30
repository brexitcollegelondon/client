import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button/Button";
import { setUserInfo } from "../user_info/reducer";
import { selectChallenges, selectUserInfo } from "../reduxStore/selectors";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
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
    axios.get(`http://127.0.0.1:5000/users/${user_id}`)
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
            id="outlined-login"
            label="Login"
            className={classes.textField}
            value={this.state.login}
            onChange={this.handleChange('login')}
            margin="normal"
            variant="outlined"
          />
            <Button size='large' color="primary" variant="fab" aria-label="create" type='button' onClick={this.handleSubmit}>
                Login
            </Button>
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

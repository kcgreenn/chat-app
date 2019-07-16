import React from "react";
import { Link } from "react-router-dom";

import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import firebase from "firebase/app";
import "firebase/auth";

class LoginComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: ""
    };
  }
  // handle login form submission
  onSubmitHandler = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(credential => {
        // save credential
        console.log(credential);
        // redirect to dashboard on login
        this.props.history.push("/dashboard");
      })
      .catch(signinError => {
        this.setState({
          loginError: this.formatLoginError(signinError.code)
        });
      });
  };
  // Make the auth error look nicer for UI
  formatLoginError = signinError => {
    let regex = /^auth\/[a-z]/;
    return signinError.replace(regex, signinError.charAt(5).toUpperCase());
  };
  // record user input in login form
  onChangeHandler = (type, e) => {
    switch (type) {
      case "email":
        this.setState({
          email: e.target.value
        });
        break;
      case "password":
        this.setState({
          password: e.target.value
        });
        break;
      default:
        break;
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form
            className={classes.form}
            onSubmit={e => this.onSubmitHandler(e)}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                type="email"
                autoComplete="email"
                autoFocus
                id="login-email-input"
                onChange={e => this.onChangeHandler("email", e)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-password-input">Password</InputLabel>
              <Input
                type="password"
                id="login-password-input"
                onChange={e => this.onChangeHandler("password", e)}
              />
            </FormControl>
            <Button
              type="submit"
              className={classes.submit}
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </form>
          {this.state.loginError ? (
            <Typography
              component="h5"
              variant="h6"
              className={classes.errorText}
            >
              {this.state.loginError}
            </Typography>
          ) : null}
          <Typography
            component="h5"
            variant="h6"
            className={classes.noAccountHeader}
          >
            Don't Have An Account?
          </Typography>
          <Link className={classes.signUpLink} to="/signup">
            Sign Up
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(LoginComponent);

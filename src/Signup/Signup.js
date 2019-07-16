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
import "firebase/firestore";
import "firebase/auth";

class SignupComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: ""
    };
  }
  onSubmitHandler = e => {
    e.preventDefault();

    if (this.formIsValid()) {
      //   call firebase
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(authRes => {
          const userObj = {
            email: authRes.user.email
          };
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email)
            .set(userObj)
            .then(() => {
              this.props.history.push("/dashboard");
            })
            .catch(dbErr => {
              this.setState({
                signupError: "Failed To Add User"
              });
            });
        })
        .catch(authErr => {
          this.setState({
            signupError: "Failed To Add User"
          });
        });
    }
  };
  formIsValid = () => {
    //   Check if passwords are long enough
    if (this.state.password.length < 6) {
      this.setState({ signupError: "Password Must Be At Least 6 Characters" });
      return false;
    }
    //   Check if passwords match
    if (this.state.password !== this.state.passwordConfirmation) {
      this.setState({ signupError: "Passwords Do Not Match" });
      return false;
    }
    this.setState({ signupError: "" });
    return true;
  };
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
      case "password-confirm":
        this.setState({
          passwordConfirmation: e.target.value
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
            Sign Up!
          </Typography>
          <form
            className={classes.form}
            onSubmit={e => this.onSubmitHandler(e)}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email-input">
                Enter Your Email Address
              </InputLabel>
              <Input
                type="email"
                autoComplete="email"
                autoFocus
                id="signup-email-input"
                onChange={e => this.onChangeHandler("email", e)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">
                Create a Password
              </InputLabel>
              <Input
                type="password"
                id="signup-password-input"
                onChange={e => this.onChangeHandler("password", e)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirm-input">
                Confirm Password
              </InputLabel>
              <Input
                type="password"
                id="signup-password-confirm-input"
                onChange={e => this.onChangeHandler("password-confirm", e)}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
          {this.state.signupError ? (
            <Typography
              className={classes.errorText}
              component="h5"
              variant="h6"
            >
              {this.state.signupError}
            </Typography>
          ) : null}
          <Typography
            component="h5"
            variant="h6"
            className={classes.hasAccountHeader}
          >
            Already Have An Account?
          </Typography>
          <Link className={classes.logInLink} to="/login">
            Log In!
          </Link>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(SignupComponent);

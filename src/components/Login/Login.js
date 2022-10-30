import React, { useState, useReducer } from 'react';
// import { useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailHandler = (state, action) => {

  if(action.type === 'USER_INPUT'){
    return {value: action.value, valid: action.value.includes('@')};
  } else if (action.type === 'INPUT_BLUR') {
    return {value: state.value, valid: state.value.includes('@')};
  }

  return {value: '', valid: false};
}

const passwordHandler = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.value, valid: action.value.includes('@')};
  } else if (action.type === 'INPUT_BLUR') {
    return {value: state.value, valid: state.value.includes('@')};
  }

  return {value: '', valid: false};
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, emailPatch] = useReducer(emailHandler, {value: '', valid: null});
  const [passwordState, passwordPatch] = useReducer(passwordHandler, {value: '', valid: null});

  // useEffect(() => {
  //   const timerID = setTimeout(() =>  {
  //     setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.length > 6
  //    );
  //   }, 500);
  //   return () => {
  //     clearTimeout(timerID);
  //   }
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    emailPatch({type: 'USER_INPUT', value: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passwordPatch({type: 'USER_INPUT', value: event.target.value});
    setFormIsValid(emailState.valid && event.target.value.length > 3);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    emailPatch({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 3);
    passwordPatch({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.valid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.valid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

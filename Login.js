import React, { useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { useEffect } from "react";

const emailReducer=(state,action)=>
{
  if(action.type==="USER_INPUT")
  {
    return{value:action.val,isvalid:action.val.trim().length>6};
  }
  if(action.type==="USER_BLUR")
  {
    return{value:state.value,isvalid:state.value.trim().length>6};
  }
  return{value:"",isvalid:false};
    
}

const passwordReducer=(state,action)=>
{
  if(action.type==="USER_INPUT")
  {
  return{value:action.val,isvalid:action.val.trim().length>6};
  }
 
  if(action.type==="USER_BLUR")
  {
    return{value:state.value,isvalid:state.value.trim().length>6};
  }
  return{value:"",isvalid:false};
}

const Login = (props) => {
 // const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
   const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]= useReducer(emailReducer,{value:"",isvalid:null});
  const[passwordState,dispatchPassword]=useReducer(passwordReducer,{value:"",isvalid:null});

  useEffect(()=>
  {
    let t1=setTimeout(()=>
    {
      console.log("Input has changed");
      setFormIsValid(
        emailState.isvalid &&
         passwordState.isvalid
      );
    },500)

    return  ()=>
    {
      clearTimeout(t1);
      console.log("Clean up Code");
    }
   

  },[emailState.isvalid,passwordState.isvalid])
  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({type:"USER_INPUT",val:event.target.value})
    // setFormIsValid(
    //   event.target.value.includes('@') && 
    //   enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
   // setEnteredPassword(event.target.value);
   dispatchPassword({type:"USER_INPUT",val:event.target.value})
    
    // setFormIsValid(
    //   event.target.value.trim().length > 6 &&
    //    enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.value.includes('@'));
    dispatchEmail({type:"USER_BLUR"});
  };

  const validatePasswordHandler = () => {
   // setPasswordIsValid(PasswordState.value.trim().length > 6);
    dispatchPassword({type:"USER_BLUR"})

   
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value,passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ''
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
            passwordState.isvalid === false ? classes.invalid : ''
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
          <Button type="submit" className={classes.btn} 
          disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;
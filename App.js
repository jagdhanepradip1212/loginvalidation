// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState (false);

  useEffect(()=>{
  const storedInfo=localStorage.getItem("isLoggedIn");
  if(storedInfo==='1')
  {
    setIsLoggedIn(true);
  }
},[])

const LoginHandler = (email, password)=>{
  setIsLoggedIn(true);
  localStorage.setItem("isLoggedIn","1");
};

const LogoutHandler = ()=>{
  setIsLoggedIn(false);
  localStorage.setItem("isLoggedIn","0");
};
  return (
   <React.Fragment> 
    <MainHeader isAuthenticated={isLoggedIn}
   onLogout={LogoutHandler}/>
   <main>
    {!isLoggedIn && <Login onLogin={LoginHandler}/>}
    {isLoggedIn && <Home onLogout={LogoutHandler}/>}
   </main>
   </React.Fragment>
  );
}

export default App;

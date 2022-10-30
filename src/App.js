import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './Context/authContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect (()=>{
  const storedUserLoggedInInformation = localStorage.getItem('logged');
  
  if(storedUserLoggedInInformation === 'true'){
    setIsLoggedIn(true);
  }
}, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('logged', true);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler
    }}>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;

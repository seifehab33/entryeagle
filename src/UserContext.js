import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(localStorage.getItem('userType') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' || false);
  // const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    localStorage.setItem('userType', userType);
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [userType, isLoggedIn]); // if app is not working , here is token

  const login = ( newUserType) => {
    setUserType(newUserType);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserType(null);
    setIsLoggedIn(false);
  };
//if app is not working , here is token in UserContext
  return (
    <UserContext.Provider value={{ userType, setUserType, isLoggedIn, setIsLoggedIn, login, logout }}> ; 
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;

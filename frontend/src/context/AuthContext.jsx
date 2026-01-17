import React, {createContext, useState, useEffect, useContext} from 'react';
import { Navigate } from 'react-router-dom';

//create the context
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //1. on initial load check localsoteage forexisting user
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if(storedUser){
      try{
        setUser(JSON.parse(storedUser));
      }catch(error){
        console.error("Failed to parse store user", error);
        localStorage.removeItem('userInfo');
      }
    }
   setLoading(false);
  },[]);


  //2. login function
  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);  
    alert(`Login Successful! \nWelcome, ${userData?.fname} \n\nClick ok to access your account!`);
    window.location.href = "/home";
  }


  //3. Logout Function
  const logout =()=>{
    localStorage.removeItem('userInfo');
    setUser(null);
    window.location.href = '/login';
  };


  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return(
    <AuthContext.Provider value ={value}>
      {children}
    </AuthContext.Provider>
  )
};


// 4. Create the Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error('useAuth must be used with in and AuthProvider');
  }
  return context;
}
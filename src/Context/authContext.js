import React from 'react'

const authContext = React.createContext({
    isLoggedIn: false,
    
});

export default authContext;
import React, { createContext, useState } from 'react'

export const loginContext = createContext("")

const Context = ({children}) => {

    const [loginData,setLoginData] = useState("");
  return (
    <loginContext.Provider value={{loginData,setLoginData}}>
    {children}
      
    </loginContext.Provider>
  )
}

export default Context

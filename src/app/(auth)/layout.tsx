import React, { ReactNode } from 'react'

//this is the basic layout which will be followed by all the pages present inside the (auth) folder

const AuthLayout = ({children}: {children : ReactNode}) => {
  return (
    <div className="auth-layout">
        {children}
    </div>
  )
}

export default AuthLayout


import React from 'react'
import { Redirect } from 'react-router-dom'
import { AuthCheck } from 'reactfire'


const ProtectedRoute = (props) => {
  return (
    <AuthCheck fallback={<Redirect to={{ pathname: '/' }} />}>
      {props.children}
    </AuthCheck>
  )
}

export default ProtectedRoute

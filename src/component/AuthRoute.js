import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

function AuthRoute({ ...rest }) {
  const { keycloak } = useKeycloak()

  return (
    keycloak?.authenticated ?
      (
        <Route {...rest} />
      ) :
      (
        <Route>
          <Redirect to='/' />
        </Route>
      )
  )
}

export default AuthRoute
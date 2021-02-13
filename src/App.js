import { useContext } from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { AxiosProvider } from 'react-axios'

import 'semantic-ui-css/semantic.min.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import keycloack from './keycloak'
import Loading from './component/Loading'
import { SessionContext, SessionHook, useAxios } from './utils/hooks'
import { AxiosConfig } from './axios'
import Header from './component/Header'
import AuthRoute from './component/AuthRoute'
import Profile from './pages/Profile'
import { Container } from 'semantic-ui-react'
import Viewer from './pages/Viewer'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function WithRouter() {
    const { user } = useContext(SessionContext)

    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path='/'>
                    Main Page
                </Route>
                <AuthRoute exact path={`/${user?.username || '*'}/:tab?`} component={Profile} />
                <AuthRoute exact path={`/${user?.username || '*'}/projects/:project`} component={Viewer} />
            </Switch>
        </BrowserRouter>
    )
}

function WithDnd() {
    return (
        <DndProvider backend={HTML5Backend}>
            <WithRouter />
        </DndProvider>
    )
}

function WithSession() {
    return (
        <SessionHook>
            <WithDnd />
        </SessionHook>
    )
}

function WithAxios() {
    const axios = useAxios(AxiosConfig)

    return (
        <AxiosProvider instance={axios}>
            <WithSession />
        </AxiosProvider>
    )
}

function App() {
    return (
        <ReactKeycloakProvider authClient={keycloack} LoadingComponent={<Loading />}>
            <div className='rooter'>
                <WithAxios />
                <Container className='footer'>
                    @ 2021 Cinnamon, Inc.
                </Container>
            </div>
        </ReactKeycloakProvider>
    )
}

export default App
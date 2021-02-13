import React, { useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Get } from 'react-axios'

import { useKeycloak } from '@react-keycloak/web'

import ImageAvatar from './ImageAvatar'
import { SessionContext } from '../utils/hooks'

function HeaderPieceLogOut() {
  const { user, setUser } = useContext(SessionContext)
  const { keycloak } = useKeycloak()

  return (
    <>
      <Menu.Item name='profile' as={Link} to={`/${user?.username}`}>
        <Get url='/profile' onSuccess={response => {
          setUser(response.data)
        }} />
        {user && <ImageAvatar
          username={user.displayName}
          src={user.pictureUrl}
        />}
      </Menu.Item>
      <Menu.Item
        position='right'
        name='logout'
        content='Sign Out'
        onClick={keycloak?.logout}
      />
    </>
  )
}

function HeaderPieceLogIn() {
  const { keycloak } = useKeycloak()

  return (
    <Menu.Item
      position='right'
      name='login'
      content='Sign In'
      onClick={keycloak?.login} />
  )
}

function Header() {
  const { keycloak } = useKeycloak()

  return (
    <Menu borderless size="large" className='fixed-bar'>
      <Menu.Item header>
        <img
          src='https://react.semantic-ui.com/logo.png'
          alt='logo'
          as={Link}
          to='/'
        />
      </Menu.Item>
      <Menu.Item>KANBAN</Menu.Item>
      <Menu.Menu position='right'>
        {keycloak?.authenticated ? <HeaderPieceLogOut /> : <HeaderPieceLogIn />}
      </Menu.Menu>
    </Menu>
  )
}

export default Header
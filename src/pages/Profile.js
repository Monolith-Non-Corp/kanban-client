import React, { useContext, useEffect, useState } from 'react'
import { Get } from 'react-axios'
import { Link } from 'react-router-dom'
import { Icon, Label, Menu, Tab } from 'semantic-ui-react'
import Overview from '../component/profile/Overview'
import Projects from '../component/profile/Projects'
import { ProjectsContext, SessionContext, withProjectsHook } from '../utils/hooks'

const Profile = withProjectsHook((props) => {
    const { user } = useContext(SessionContext)
    const { projects, setProjects } = useContext(ProjectsContext)
    const [items, setItems] = useState([])
    const [index, setIndex] = useState(0)
    useEffect(() => {
        setItems([
            {
                menuItem: (
                    <Menu.Item key={0} as={Link} to={`/${user.username}`}>
                        <Icon name='book' />Overview
                    </Menu.Item>
                ),
                render: () => <Overview />
            },
            {
                menuItem: (
                    <Menu.Item key={1} as={Link} to={`/${user.username}/projects`}>
                        <Icon name='code branch' />Projects<Label>{projects.length}</Label>
                    </Menu.Item>
                ),
                render: () => <Projects />
            }
        ])
    }, [user, projects, projects.length])

    function onGetSuccess(response) {
        setProjects(response.data)
    }
    useEffect(() => {
        const location = props.match.params?.tab
        switch (location) {
            case 'projects':
                document.title = 'Your Projects'
                setIndex(1)
                break
            default:
                document.title = `${user.displayName} (${user.username})`
                setIndex(0)
                break
        }
    }, [props.match.params?.tab, user])

    return (
        <>
            <Get url='/projects' onSuccess={onGetSuccess} />
            <Tab
                activeIndex={index}
                renderActiveOnly={true}
                menu={{ secondary: true, pointing: true }}
                panes={items}
            />
        </>
    )
})

export default Profile
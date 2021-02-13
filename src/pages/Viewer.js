import React, { useContext, useEffect, useState } from 'react'
import { Delete, Get } from 'react-axios'
import { Link, Redirect } from 'react-router-dom'
import { Breadcrumb, Button, Container, Icon, List, Popup, Segment } from 'semantic-ui-react'
import Boards from '../component/viewer/Boards'
import { ProjectContext, SessionContext, withProjectHook } from '../utils/hooks'

const Viewer = withProjectHook((props) => {
    const { user } = useContext(SessionContext)
    const { project, setProject } = useContext(ProjectContext)
    const [submit, setSubmit] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const id = props.match.params.project
    useEffect(() => {
        document.title = `${project.title || 'Unnamed Project'}`
    }, [project])

    function acceptCallback() {
        setSubmit(true)
    }

    function onSubmitSuccess(response) {
        setSubmit(false)
        setRedirect(true)
    }

    function onGetSuccess(response) {
        setProject(response.data)
    }

    return (
        <Container className='viewer'>
            <Segment>
                <Get
                    url={`projects/${id}`}
                    onSuccess={onGetSuccess}
                />
                <Delete
                    url={`projects/${id}`}
                    isReady={submit}
                    onSuccess={onSubmitSuccess}
                />
                {redirect && <Redirect to='./' />}
                <div style={{ position: 'absolute', right: '1em' }}>
                    <Popup
                        trigger={(
                            <Icon
                                name='ellipsis horizontal'
                                size='large'
                                link
                            />
                        )}
                        on='click'
                        size='mini'
                        content={
                            <List divided size='big'>
                                <List.Item key='delete' as='a' onClick={acceptCallback}>
                                    Delete project
                                </List.Item>
                            </List>
                        }
                        position='left center'
                    />
                </div>
                <Breadcrumb size='big'>
                    <Breadcrumb.Section>
                        <Icon name='code branch' />
                        <Link to={`../projects`}>
                            {user.displayName}
                        </Link>
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>{project.title}</Breadcrumb.Section>
                </Breadcrumb>
            </Segment>
            <Segment basic>
                {project.boards && <Boards />}
            </Segment>
        </Container>
    )
})

export default Viewer
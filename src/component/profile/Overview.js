import React, { useContext } from 'react'
import { Container } from 'semantic-ui-react'
import { ProjectsContext, SessionContext } from '../../utils/hooks'

function Overview() {
    const { user } = useContext(SessionContext)
    const { projects, setProjects } = useContext(ProjectsContext)

    return (
        <Container className='centered'>
        </Container>
    )
}

export default Overview
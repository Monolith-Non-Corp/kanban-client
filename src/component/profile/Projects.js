import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react'
import _ from 'lodash'
import { Button, Container, Header, Icon, Image, List, Search, Segment } from 'semantic-ui-react'
import { ProjectsContext, SessionContext } from '../../utils/hooks'
import ProjectForm from './ProjectForm'
import Project from './Project'

function Projects() {
    const [showForm, setShowForm] = useState(false)
    const { user } = useContext(SessionContext)
    const { projects } = useContext(ProjectsContext)
    const reducer = useCallback((state, action) => {
        switch (action.type) {
            case 'CLEAN_QUERY':
                return { loading: false, value: '', results: projects }
            case 'START_SEARCH':
                return { ...state, loading: true, value: action.query }
            case 'FINISH_SEARCH':
                return { ...state, loading: false, results: action.results }

            default:
                throw new Error()
        }
    }, [projects])
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        results: projects,
        value: ''
    })
    const { loading, results, value } = state

    const timeoutRef = useRef()
    const handleSearchChange = useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({
            type: 'START_SEARCH',
            query: data.value
        })

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({
                    type: 'CLEAN_QUERY'
                })
                return
            }

            const re = new RegExp(_.escapeRegExp(data.value), 'i')
            const isMatch = (result) => re.test(result.title)

            dispatch({
                type: 'FINISH_SEARCH',
                results: _.filter(projects, isMatch),
            })
        }, 300)
    }, [projects])
    useEffect(() => {
        handleSearchChange(null, state)
        return () => clearTimeout(timeoutRef.current)
    }, [projects.length])

    function toggleFormOn() {
        setShowForm(true)
    }

    function toggleFormOff() {
        setShowForm(false)
    }

    return (
        <Container className='centered-flex-container'>
            <Segment basic>
                <Container>
                    <Image src={user.pictureUrl} circular />
                    <Header size='large'>
                        <Header.Content>
                            {user.displayName}
                            <Header.Subheader>{user.username}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Container>
            </Segment>
            <Segment basic>
                <List divided relaxed>
                    <List.Item key='search' className='search'>
                        <List.Content className='flex'>
                            <Search placeholder='Find a project...'
                                showNoResults={false}
                                onSearchChange={handleSearchChange}
                                value={value}
                                loading={loading}
                            />
                            <Button positive disabled={showForm} onClick={toggleFormOn}>
                                <Icon name='code branch' />New
                            </Button>
                        </List.Content>
                    </List.Item>
                    {showForm && <ProjectForm callback={toggleFormOff} />}
                    {results.map(data => <Project key={data.id} data={data} />)}
                    {results[0] && (
                        <List.Item key='end'>
                        </List.Item>
                    )}
                    {value && !results[0] && (
                        <List.Item key='none'>
                            <Header size='medium' textAlign='center' style={{ marginTop: '2em' }} icon>
                                <Icon name='code branch' style={{ marginBottom: '0.5em' }} />
                                {user.displayName} doesn’t have any projects that match.
                            </Header>
                        </List.Item>
                    )}
                    {!value && !projects[0] && (
                        <List.Item key='empty'>
                            <Header size='medium' textAlign='center' style={{ marginTop: '2em' }} icon>
                                <Icon name='code branch' style={{ marginBottom: '0.5em' }} />
                                {user.displayName} doesn’t have any projects.
                            </Header>
                        </List.Item>
                    )}
                </List>
            </Segment>
        </Container>
    )
}

export default Projects
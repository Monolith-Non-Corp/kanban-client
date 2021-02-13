import React, { useContext, useRef, useState } from 'react'
import _ from 'lodash'
import { Post } from 'react-axios'
import { Button, Dropdown, Form, Header, List } from 'semantic-ui-react'
import { ProjectsContext, SessionContext, useForm } from '../../utils/hooks'

function ProjectForm({ callback }) {
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useContext(SessionContext)
    const { addProject } = useContext(ProjectsContext)

    const { onChange, onSubmit, setValues, values } = useForm(acceptCallback, {
        title: '',
        description: ''
    })

    function acceptCallback() {
        setSubmit(true)
    }

    function cancelCallback() {
        setValues({
            title: '',
            description: ''
        })
        callback()
    }

    function onSubmitSuccess(response) {
        addProject({ ...response.data, isNew: true })
        setSubmit(false)
        setValues({
            title: '',
            description: ''
        })
        callback()
    }

    function onSubmitLoading(loading) {
        setLoading(loading)
    }

    function onSubmitError(error) {
        setSubmit(false)
    }

    const dropdownOptions = useRef([
        {
            key: user.id,
            text: user.displayName,
            value: user.username,
            image: {
                avatar: true,
                src: user.pictureUrl
            }
        }
    ])

    return (
        <>
            <Post
                url='/projects'
                data={values}
                isReady={submit}
                onSuccess={onSubmitSuccess}
                onLoading={onSubmitLoading}
                onError={onSubmitError}
            />
            <List.Item key='new' as={Form} onSubmit={onSubmit}>
                <List.Header className='new'>
                    <Header>
                        {values.title || 'Empty Project'}
                    </Header>
                </List.Header>
                <List.Content >
                    <Form.Group>
                        <Form.Field
                            control={Dropdown}
                            label='Owner'
                            selection options={dropdownOptions.current}
                            defaultValue={dropdownOptions.current[0].value}
                            required
                        />
                        <Form.Input
                            value={values.title}
                            onChange={onChange}
                            placeholder='Title'
                            name='title'
                            label='Project name'
                            required />
                    </Form.Group>
                    <Form.Input
                        value={values.description}
                        onChange={onChange}
                        placeholder='Description'
                        name='description'
                        label='Description'
                    />
                    <Form as={Button} positive type='sumbit' disabled={values.title.trim() === '' || loading}>Create Project</Form>
                    <Form as={Button} onClick={cancelCallback}>Cancel</Form>
                </List.Content>
            </List.Item>
        </>
    )
}

export default ProjectForm
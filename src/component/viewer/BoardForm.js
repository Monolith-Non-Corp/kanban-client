import React, { useContext, useState } from 'react'
import { Post } from 'react-axios'
import { Button, Card, Form } from 'semantic-ui-react'
import { BoardsContext, ProjectContext, useForm } from '../../utils/hooks'

function BoardForm({ callback }) {
    const { project } = useContext(ProjectContext)
    const { addBoard } = useContext(BoardsContext)
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)

    const { onChange, onSubmit, setValues, values } = useForm(acceptCallback, {
        title: ''
    })

    function acceptCallback() {
        setSubmit(true)
    }

    function cancelCallback() {
        setValues({
            title: ''
        })
        callback()
    }

    function onSubmitSuccess(response) {
        addBoard(response.data)
        setSubmit(false)
        setValues({
            title: ''
        })
        callback()
    }

    function onSubmitLoading(loading) {
        setLoading(loading)
    }

    function onSubmitError(error) {
        setSubmit(false)
    }

    return (
        <>
            <Post
                url={`/projects/${project.id}/boards`}
                data={values}
                isReady={submit}
                onSuccess={onSubmitSuccess}
                onLoading={onSubmitLoading}
                onError={onSubmitError}
            />
            <Card className='form-card' as={Form} onSubmit={onSubmit}>
                <Card.Content>
                    <Card.Description>
                        <Form.Input
                            value={values.title}
                            onChange={onChange}
                            placeholder='Enter a column name'
                            name='title'
                            label='Column name'
                            required
                        />
                        <Form as={Button} positive type='sumbit' disabled={values.title.trim() === '' || loading}>Create Column</Form>
                        <Form as={Button} onClick={cancelCallback}>Cancel</Form>
                    </Card.Description>
                </Card.Content>
            </Card>
        </>
    )
}

export default BoardForm
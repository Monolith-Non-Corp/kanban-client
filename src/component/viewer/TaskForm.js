import React, { useContext, useState } from 'react'
import { Post } from 'react-axios'
import { Button, Form, List } from 'semantic-ui-react'
import { BoardContext, ProjectContext, TasksContext, useForm } from '../../utils/hooks'

function TaskForm({ callback }) {
    const { project } = useContext(ProjectContext)
    const { board } = useContext(BoardContext)
    const { addTask } = useContext(TasksContext)
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)

    const { onChange, onSubmit, setValues, values } = useForm(acceptCallback, {
        body: ''
    })

    function acceptCallback() {
        setSubmit(true)
    }

    function cancelCallback() {
        setValues({
            body: ''
        })
        callback()
    }

    function onSubmitSuccess(response) {
        addTask(response.data)
        setSubmit(false)
        setValues({
            body: ''
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
                url={`/projects/${project.id}/boards/${board.id}/tasks`}
                data={values}
                isReady={submit}
                onSuccess={onSubmitSuccess}
                onLoading={onSubmitLoading}
                onError={onSubmitError}
            />
            <List.Item as={Form} onSubmit={onSubmit}>
                <List.Content>
                    <Form.TextArea
                        value={values.body}
                        onChange={onChange}
                        placeholder='Enter a note'
                        name='body'
                        required
                    />
                    <div>
                        <Form as={Button} positive type='sumbit' disabled={values.body.trim() === '' || loading}>Add</Form>
                        <Form as={Button} onClick={cancelCallback}>Cancel</Form>
                    </div>
                </List.Content>
            </List.Item>
        </>
    )
}

export default TaskForm
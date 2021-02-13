import React, { useContext, useState } from 'react'
import { Post } from 'react-axios'
import { Button, Form, Label } from 'semantic-ui-react'
import ColorPicker from 'rc-color-picker'
import 'rc-color-picker/assets/index.css';
import { BoardContext, ProjectContext, PropertiesContext, TaskContext, useForm } from '../../utils/hooks'

function PropertyForm({ callback }) {
    const { project } = useContext(ProjectContext)
    const { board } = useContext(BoardContext)
    const { task } = useContext(TaskContext)
    const { addProperty } = useContext(PropertiesContext)
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)

    const { onChange, onSubmit, setValues, values } = useForm(acceptCallback, {
        title: '',
        color: '#10b3d3'
    })

    function acceptCallback() {
        setSubmit(true)
    }

    function cancelCallback() {
        setValues({
            title: '',
            color: '#10b3d3'
        })
        callback()
    }

    function onSubmitSuccess(response) {
        addProperty(response.data)
        setSubmit(false)
        setValues({
            title: '',
            color: '#10b3d3'
        })
        callback()
    }

    function onSubmitLoading(loading) {
        setLoading(loading)
    }

    function onSubmitError(error) {
        setSubmit(false)
    }

    // This is what happens when you don't make your component Form friendly
    function onChangeColorPicker({color}) {
        onChange({
            target: {
                name: 'color',
                value: color
            }
        })
    }

    return (
        <>
            <Post
                url={`/projects/${project.id}/boards/${board.id}/tasks/${task.id}/properties`}
                data={values}
                isReady={submit}
                onSuccess={onSubmitSuccess}
                onLoading={onSubmitLoading}
                onError={onSubmitError}
            />
            <Label size='mini' style={{ width: '100%' }}>
                <Form onSubmit={onSubmit}>
                    <Form.Group unstackable>
                        <Form.Input
                            value={values.title}
                            onChange={onChange}
                            placeholder='Enter a tag'
                            name='title'
                            required
                            size='mini'
                            width={14}
                        />
                        <Form.Field width={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ColorPicker color={values.color} onChange={onChangeColorPicker} defaultColor={'#10b3d3'} enableAlpha={false} placement='bottomLeft' />
                        </Form.Field>
                    </Form.Group>
                    <Button positive size='mini' type='sumbit' disabled={values.title.trim() === '' || loading}>Add</Button>
                    <Button size='mini' onClick={cancelCallback}>Cancel</Button>
                </Form>
            </Label>
        </>
    )
}

export default PropertyForm
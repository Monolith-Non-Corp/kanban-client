import React, { useContext, useState } from 'react'
import { Delete } from 'react-axios'
import { Icon, Label } from 'semantic-ui-react'
import { BoardContext, ProjectContext, PropertiesContext, TaskContext } from '../../utils/hooks'

function Property({ data }) {
    const { project } = useContext(ProjectContext)
    const { board } = useContext(BoardContext)
    const { task } = useContext(TaskContext)
    const { removeProperty } = useContext(PropertiesContext)
    const [submit, setSubmit] = useState(false)

    function acceptCallback() {
        setSubmit(true)
    }

    function onSubmitSuccess(response) {
        setSubmit(false)
        removeProperty(data)
    }

    return (
        <>
            <Delete
                url={`/projects/${project.id}/boards/${board.id}/tasks/${task.id}/properties/${data.id}`}
                isReady={submit}
                onSuccess={onSubmitSuccess}
            />
            <Label as='a' style={{ backgroundColor: data.color, color: 'rgba(0, 0, 0, 1)', wordBreak: 'break-all' }}>
                {data.title}
                <Icon name='delete' onClick={acceptCallback} />
            </Label>
        </>
    )
}

export default Property
import React, { useContext, useEffect, useState } from 'react'
import { Delete } from 'react-axios'
import { useDrag } from 'react-dnd'
import { Icon, List, Popup } from 'semantic-ui-react'
import { ItemTypes } from '../../utils/drags'
import { BoardContext, ProjectContext, PropertiesContext, TaskContext, TasksContext, withPropertiesHook } from '../../utils/hooks'
import Properties from './Properties'

const Task = withPropertiesHook((props) => {
    const { project } = useContext(ProjectContext)
    const { board } = useContext(BoardContext)
    const { task } = useContext(TaskContext)
    const { setProperties } = useContext(PropertiesContext)
    const { removeTask } = useContext(TasksContext)
    const [submit, setSubmit] = useState(false)
    useEffect(() => {
        setProperties(task.properties)

        return () => {
            setProperties([])
        }
    }, [task, task.properties])

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.TASK,
            data: task
        },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                removeTask(item.data)
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    })

    function acceptCallback() {
        setSubmit(true)
    }

    function onSubmitSuccess(response) {
        setSubmit(false)
        removeTask(task)
    }

    return isDragging ? <></> : (
        <List.Item>
            <Delete
                url={`/projects/${project.id}/boards/${board.id}/tasks/${task.id}`}
                isReady={submit}
                onSuccess={onSubmitSuccess}
            />
            <div ref={drag} className='ui card'>
                <div>
                    <div style={{ cursor: 'move' }}>
                        <Icon name='bars' />
                    </div>
                    <div>
                        <pre>
                            <kbd>{task.body}</kbd>
                        </pre>
                        <div>
                            <Properties />
                        </div>
                    </div>
                    <div>
                        <Popup
                            trigger={(
                                <Icon
                                    name='ellipsis horizontal'
                                    size='small'
                                    link
                                />
                            )}
                            on='click'
                            size='mini'
                            content={
                                <List divided size='big'>
                                    <List.Item key='delete' as='a' onClick={acceptCallback}>
                                        Delete note
                                    </List.Item>
                                </List>
                            }
                            position='left center'
                        />
                    </div>
                </div>
            </div>
        </List.Item>
    )
})

export default Task
import React, { useContext, useState } from 'react'
import { Delete, Patch } from 'react-axios'
import { useDrop } from 'react-dnd'
import { Card, Icon, Label, List, Popup } from 'semantic-ui-react'
import { ItemTypes } from '../../utils/drags'
import { BoardContext, BoardsContext, ProjectContext, TaskContext, TasksContext } from '../../utils/hooks'
import Task from './Task'
import TaskForm from './TaskForm'

function Tasks(props) {
    const { project } = useContext(ProjectContext)
    const { removeBoard } = useContext(BoardsContext)
    const { board } = useContext(BoardContext)
    const { tasks, addTask } = useContext(TasksContext)
    const [formShow, setFormShow] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [patch, setPatch] = useState()
    const [{ isOver, canDrop, dragItem }, drop] = useDrop({
        accept: ItemTypes.TASK,
        canDrop: (item) => {
            return !tasks.includes(item.data)
        },
        drop: (item) => {
            setPatch(item.data.id)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            dragItem: monitor.getItem()
        })
    })

    function acceptSubmit() {
        setSubmit(true)
    }

    function onSubmitSuccess(response) {
        setSubmit(false)
        removeBoard(board)
    }

    function onPatchSuccess(response) {
        setPatch()
        addTask(response.data)
    }

    function toggleFormOn() {
        setFormShow(true)
    }

    function toggleFormOff() {
        setFormShow(false)
    }

    return (
        <Card className='item-card'>
            <Delete
                url={`/projects/${project.id}/boards/${board.id}`}
                isReady={submit}
                onSuccess={onSubmitSuccess}
            />
            <Patch
                url={`/projects/${project.id}/boards/${board.id}/tasks/${patch}`}
                isReady={!!patch}
                onSuccess={onPatchSuccess}
            />
            <Card.Content>
                <Card.Header>
                    <div className='floating-card' >
                        <Popup
                            trigger={(
                                <Icon
                                    onClick={toggleFormOn}
                                    name='plus'
                                    size='small'
                                    link
                                />
                            )}
                            size='mini'
                            content='Add a task to this column'
                            position='left center'
                        />
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
                                    <List.Item key='delete' as='a' onClick={acceptSubmit}>
                                        Delete column
                                    </List.Item>
                                </List>
                            }
                            position='left center'
                        />
                    </div>
                    <Label horizontal>
                        {tasks.length}
                    </Label>
                    {board.title}
                </Card.Header>
                <div ref={drop} className='description'>
                    <List relaxed>
                        {formShow && (
                            <TaskForm key='form' callback={toggleFormOff} />
                        )}
                        {tasks.map(data => (
                            <TaskContext.Provider key={data.id} value={{ task: data }}>
                                <Task />
                            </TaskContext.Provider>
                        ))}
                        {isOver && canDrop && dragItem && (
                            <TaskContext.Provider key={dragItem.data.id} value={{ task: dragItem.data }}>
                                <Task />
                            </TaskContext.Provider>
                        )}
                    </List>
                </div>
            </Card.Content>
        </Card>
    )
}

export default Tasks
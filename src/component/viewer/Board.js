import React, { useContext, useEffect } from 'react'
import { BoardContext, TasksContext, withTasksHook } from '../../utils/hooks'
import Tasks from './Tasks'

const Board = withTasksHook((props) => {
    const { board } = useContext(BoardContext)
    const { setTasks } = useContext(TasksContext)
    useEffect(() => {
        setTasks(board.tasks)

        return () => {
            setTasks([])
        }
    }, [board, board.tasks])
    return (
        <Tasks />
    )
})

export default Board
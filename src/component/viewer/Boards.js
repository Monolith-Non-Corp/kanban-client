import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'semantic-ui-react'
import { BoardContext, BoardsContext, ProjectContext, withBoardsHook } from '../../utils/hooks'
import BoardForm from './BoardForm'
import Board from './Board'
import BoardDotted from './BoardDotted'

const Boards = withBoardsHook((props) => {
    const { project } = useContext(ProjectContext)
    const { boards, setBoards } = useContext(BoardsContext)
    const [formShow, setFormShow] = useState(false)
    useEffect(() => {
        setBoards(project.boards)

        return () => {
            setBoards([])
        }
    }, [project, project.boards])

    function toggleFormOn() {
        setFormShow(true)
    }

    function toggleFormOff() {
        setFormShow(false)
    }

    return (
        <Card.Group stackable>
            {boards.map(data => (
                <BoardContext.Provider key={data.id} value={{ board: data }}>
                    <Board />
                </BoardContext.Provider>
            ))}
            {formShow && (
                <BoardForm key='form' callback={toggleFormOff} />
            )}
            {!formShow && (
                <BoardDotted key='end' callback={toggleFormOn} />
            )}
        </Card.Group>
    )
})

export default Boards
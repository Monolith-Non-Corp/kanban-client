import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Icon, Label, List } from 'semantic-ui-react'

function Project({ data }) {
    return (
        <List.Item>
            <List.Content>
                <List.Header>
                    <div className='ribbon'>
                        {!data.isNew ? <Label basic ribbon='right'>
                            Created on {new Date(data.dateCreated).toLocaleDateString('en-gb', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </Label> : <></>}
                        {data.isNew ? <Label basic color='green' ribbon='right'>
                            New
                        </Label> : <></>}
                    </div>
                    <Header size='medium'>
                        <Link to={`/${data.account.username}/projects/${data.id}`}>{data.title}</Link>
                    </Header>
                </List.Header>
                <List.Description>
                    {data.description}
                </List.Description>
            </List.Content>
            <div>
                {data.boards.map((board) => (
                    <Label>
                        <Icon name='clipboard' /> {board.tasks.length} - {board.title}
                    </Label>
                ))}
                {!data.boards[0] && (
                    <Label>
                        <Icon name='clipboard' /> No boards
                    </Label>
                )}
            </div>
        </List.Item>
    )
}

export default Project
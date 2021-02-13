import React from 'react'
import { Button, Card } from 'semantic-ui-react'

function BoardDotted({ callback }) {
    return (
        <Card className='dotted-card' as={Button} onClick={callback}>
            <h4>+ Add column</h4>
        </Card>
    )
}

export default BoardDotted
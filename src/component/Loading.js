import * as React from 'react'
import { Loader } from 'semantic-ui-react'

function Loading() {
    return (
        <div>
            <Loader active size='huge' inline='centered' />
        </div>
    )
}

export default Loading
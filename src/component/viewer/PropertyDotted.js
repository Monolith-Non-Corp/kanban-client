import React from 'react'
import { Button, Icon, Label, Popup } from 'semantic-ui-react'

function PropertyDotted({ callback }) {
    return (
        <Popup
            trigger={(
                <Label as={Button} onClick={callback}>
                    <Icon name='plus' />
                </Label>
            )}
            size='mini'
            content='Add a tag to this note'
            position='left center'
        />

    )
}

export default PropertyDotted
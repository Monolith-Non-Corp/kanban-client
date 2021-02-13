import React, { useContext, useState } from 'react'
import { Label } from 'semantic-ui-react'
import { PropertiesContext, TaskContext } from '../../utils/hooks'
import Property from './Property'
import PropertyDotted from './PropertyDotted'
import PropertyForm from './PropertyForm'

function Properties() {
    const { task } = useContext(TaskContext)
    const { properties } = useContext(PropertiesContext)
    const [formShow, setFormShow] = useState(false)

    function toggleFormOn() {
        setFormShow(true)
    }

    function toggleFormOff() {
        setFormShow(false)
    }

    return (
        <>
            <div style={{ marginBottom: '0.5em', width: '100%' }}>
                {formShow && (
                    <PropertyForm callback={toggleFormOff} />
                )}
            </div>
            <Label.Group tag size='tiny' style={{ marginBottom: '5px' }}>
                {formShow || (
                    <PropertyDotted callback={toggleFormOn} />
                )}
                {properties.map((data) => (
                    <Property data={data} />
                ))}
            </Label.Group>
            <p>
                Added by <a>{task.account.displayName}</a> on {new Date(task.lastUpdated).toLocaleDateString('en-gb', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </>
    )
}

export default Properties
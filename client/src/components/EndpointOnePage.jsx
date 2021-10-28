import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'

const EndpointPage = ({ comboData }) => {

    return (
        <>

            <LinkContainer to="/" style={{ margin: "10px" }}>
                <Button variant='primary'>Go Back</Button>
            </LinkContainer>


            <pre>
                {JSON.stringify(comboData, null, 2)}
            </pre>
        </>
    )
}

export default EndpointPage

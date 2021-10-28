import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router'

const EndpointTwoPage = () => {

    const history = useHistory();

    const jsonData = history.location.state;

    return (


        <>
            <LinkContainer to="/" style={{ margin: "10px" }}>
                <Button variant='primary'>Go Back</Button>
            </LinkContainer>
            <pre>
                {JSON.stringify(jsonData, null, 2)}
            </pre>
        </>
    )
}

export default EndpointTwoPage

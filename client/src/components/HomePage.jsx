import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './HomePage.css'

const HomePage = () => {

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div className='center'>
                            Welcome to the Combination Generator
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4}>
                    </Col>
                    <Col xs={6} md={4}>
                        <LinkContainer to="/endpointOne">
                            <Button variant='primary'>Endpoint One</Button>
                        </LinkContainer>
                        <LinkContainer to="/form">
                            <Button variant='primary'>Endpoint Two</Button>
                        </LinkContainer>


                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HomePage;

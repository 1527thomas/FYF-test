import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import { useForm, useFieldArray } from 'react-hook-form'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import { useHistory } from 'react-router'

const EndpointTwoPage = () => {

    const { register, control, handleSubmit } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "currency"
    })


    const fetchAnarchyData = async (currency) => {
        try {

            const body = {}
            // currency.map((item) => (

            //     body[item.name] = item.value
            // ))
            currency.map((item) => {
                if (item.name in body) {
                    throw new Error("Input parameters include a duplicate coin name");
                }
                else {
                    body[item.name] = item.value
                }
            })

            const { data } = await axios.get('http://localhost:5000/flowersAPI/anarchy', {
                headers: {
                    "Access-Control-Allow-Origin": true,
                    "Content-Type": "text/plain"
                },
                params: body
            })

            history.push('/endpointTwo', data);
        }
        catch (err) {
            console.error(err);
        }
    }

    const history = useHistory();

    const onSubmit = (data) => {
        const { currency } = data
        // console.log(currency)
        // send currency as body to API and return the response and push it up to endpointTwo
        fetchAnarchyData(currency);
    };

    return (
        <>
            <LinkContainer to="/" style={{ margin: "10px" }}>
                <Button variant='primary'>Go Back</Button>
            </LinkContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>

                {fields.map(({ id, name, amount }, index) => {
                    return (
                        <div key={id}>
                            <Row>
                                <Col>

                                    <Form.Control {...register(`currency[${index}].name`, { required: true })} placeholder="Coin Name" defaultValue={name} />
                                </Col>
                                <Col>
                                    <Form.Control {...register(`currency[${index}].value`, { required: true })} placeholder="Coin Denomination" defaultValue={amount} />
                                </Col>
                                <Col>
                                    <Button type="button" onClick={() => remove(index)}>Remove</Button>
                                </Col>
                            </Row>

                        </div>
                    )
                })}
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={() => append({})}>
                    Append
                </Button>

            </Form>

        </>
    )
}

export default EndpointTwoPage

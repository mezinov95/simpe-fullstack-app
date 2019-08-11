import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const API = 'http://localhost:3001'; // TODO - switch to env-variable

class AddContactPage extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            phone: '',
            error: null
        };
    }

    handleChange = field => event => {
        this.setState({
            [field]: event.target.value
        });
    }

    handleSubmit = (event) => {
        const { name, phone } = this.state;

        event.preventDefault();

        if (!name || !phone) {
            this.setState({ error: 'Fields can not be empty. Fill them.' });
        } else {
            this.setState({
                name: '',
                phone: '',
                error: null
            });

            return fetch(`${API}/v1/contact`, {
                method: 'POST',
                body: JSON.stringify({ name, phone }),
                headers: new Headers({
                  'Content-Type': 'application/json'
                }),
            });
        }
    };

    render() {
        const { name, phone, error } = this.state;

        return <Form onSubmit={this.handleSubmit}>
            <Form.Group>
                <Form.Control placeholder='Name' onChange={this.handleChange('name')} value={name} />
            </Form.Group>

            <Form.Group>
                <Form.Control placeholder='Phone' onChange={this.handleChange('phone')} value={phone} />
            </Form.Group>

            {error && <Alert variant='danger'>
                {error}
            </Alert>}
            <Button variant='primary' type='submit'>Add</Button>
        </Form>
    }
}

export default AddContactPage;

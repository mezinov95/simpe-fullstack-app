import React from 'react';
import { Table } from 'react-bootstrap';

const API = 'http://localhost:3001'; // TODO - switch to env-variable

class ContactsPage extends React.Component {
    constructor() {
        super();

        this.state = {
            contacts: []
        };
    };

    componentDidMount() {
        fetch(`${API}/v1/contacts`)
            .then(res => res.json())
            .then(contacts => {
                this.setState({ contacts });
            });
    }

    render() {
        const { contacts } = this.state;
        
        if (contacts.length) {
            return <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.phone}</td>
                    </tr>)}
                </tbody>
            </Table>
        }

        return null;
    }
}

export default ContactsPage;
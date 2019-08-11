import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink, BrowserRouter, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import ContactsPage from './pages/ContactsPage.jsx';
import AddContactPage from './pages/AddContactPage.jsx';

class App extends React.Component {
  render() {
    return <div>
        <BrowserRouter>
            <Navbar bg='dark' variant='dark'>
                <Nav className='mr-auto'>
                    <Nav.Link>
                        <li><NavLink exact to='/' activeClassName='selected'>Contacts</NavLink></li>
                    </Nav.Link>
                    <Nav.Link>
                        <li><NavLink exact to='/contacts/add' activeClassName='selected'>Add contact</NavLink></li>
                    </Nav.Link>
                </Nav>
            </Navbar>

            <Route exact path='/' component={ContactsPage}/>
            <Route path='/contacts/add' component={AddContactPage}/>

        </BrowserRouter>

      </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
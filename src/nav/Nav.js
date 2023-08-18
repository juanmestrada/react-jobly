import { useContext } from "react";
import UserContext from "../auth/UserContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Nav.css';
import { NavLink } from 'react-router-dom';

const CollapsibleNav= ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="Nav-brand">React Jobly</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            {currentUser ? (
              <Nav className="ms-auto">
                <NavLink to="/companies" className="Nav-link" type="button" aria-controls="responsive-navbar-nav" data-bs-toggle="collapse" data-bs-target="#responsive-navbar-nav">Companies</NavLink>
                <NavLink to="/jobs" className="Nav-link">Jobs</NavLink>
                <NavLink to="/profile" className="Nav-link">Profile</NavLink>
                <NavLink to="/" className="Nav-link" onClick={logout}>Log out {currentUser.first_name || currentUser.username}</NavLink>
              </Nav>
            ) : (<Nav className="ms-auto"><NavLink to="/login" className="Nav-link">Log In</NavLink></Nav>)}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleNav;
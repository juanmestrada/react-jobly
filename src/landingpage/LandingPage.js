import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import UserContext from "../auth/UserContext";
import './LandingPage.css';

const LandingPage = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <div className="LandingPage">
            <Container>
                <h1 className='hero-color'>React Jobly</h1>
                <p>Your career platform.</p>
                {currentUser ? <h2>
                    Welcome Back, {currentUser.firstName || currentUser.username}!
                </h2> : (<button className="LandingPage-start-btn"><NavLink to="/react-jobly/login">Get Started</NavLink></button>)}
            </Container>
        </div>
    )
}

export default LandingPage;
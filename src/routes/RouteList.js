import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from '../landingpage/LandingPage';
import LogIn from '../auth/LogIn';
import SignUp from '../auth/SignUp';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import Profile from "../profile/Profile";
import UserContext from "../auth/UserContext";

const RouteList = ({login, signup}) => {
    const { currentUser } = useContext(UserContext);
    return (
        <Routes>
            <Route path="/react-jobly/" element={<LandingPage />} />
            <Route path="/react-jobly/login" element={<LogIn login={login} />} />
            <Route path="/react-jobly/signup" element={<SignUp signup={signup} />} />
            <Route path="/react-jobly/companies" element={!currentUser ? <Navigate to="/react-jobly/login" replace /> : <CompanyList />} />
            <Route path="/react-jobly/companies/:handle" element={!currentUser ? <Navigate to="/react-jobly/login" replace /> : <CompanyDetail />} />
            <Route path="/react-jobly/jobs" element={!currentUser ? <Navigate to="/react-jobly/login" replace /> : <JobList />} />
            <Route path="/react-jobly/profile" element={!currentUser ? <Navigate to="/react-jobly/login" replace /> : <Profile />} /> 
        </Routes>
    )
}

export default RouteList;
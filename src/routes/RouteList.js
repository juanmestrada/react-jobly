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
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LogIn login={login} />} />
            <Route path="/signup" element={<SignUp signup={signup} />} />
            <Route path="/companies" element={!currentUser ? <Navigate to="/login" replace /> : <CompanyList />} />
            <Route path="/companies/:handle" element={!currentUser ? <Navigate to="/login" replace /> : <CompanyDetail />} />
            <Route path="/jobs" element={!currentUser ? <Navigate to="/login" replace /> : <JobList />} />
            <Route path="/profile" element={!currentUser ? <Navigate to="/login" replace /> : <Profile />} /> 
        </Routes>
    )
}

export default RouteList;
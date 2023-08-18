import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Nav from './nav/Nav';
import RouteList from "./routes/RouteList";
import JoblyApi from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./auth/UserContext";
import jwt_decode from "jwt-decode";
import Loading from "./common/Loading";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          
          JoblyApi.token = token;
          
          let currentUser = await JoblyApi.getCurrentUser(username);

          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setIsLoading(true);
    }

    setIsLoading(false);
    getCurrentUser();
  }, [token]);

  const signup = async (signupData) => {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  const login = async (loginData) => {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);

      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }

  const hasAppliedToJob = (id) => {
    return applicationIds.has(id);
  }

  const applyToJob = (id) => {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if(!isLoading) return <Loading />;

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <BrowserRouter >
          {currentUser && <Nav logout={logout} />}
          <RouteList login={login} signup={signup} />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;

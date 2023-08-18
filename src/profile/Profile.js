import { useState, useContext} from 'react';
import '../auth/Sessions.css';
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";

const Profile = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: currentUser.email,
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await JoblyApi.saveProfile(formData.username, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });

            setCurrentUser(response);
        } catch (error) {
            console.log("error updating profile, ", error);
            return;
        }
        
        setFormData(f => ({ ...f, password: "" }));
    }
    return (
        <div className="Sessions Profile">
            <div className="mb-5">
                <h5 className="mb-2 text-center">Edit Profile</h5>
            </div>

            <form className="Profile-form" onSubmit={handleSubmit}>
            <div className="form-group mb-4">
                    <div className="form-floating">
                        <input type="email" readOnly className="form-control border-0 bg-white user-select-none shadow-none" id="floatingPlaintextInput" placeholder="username" name="username" defaultValue={formData.username} />
                        <label htmlFor="floatingPlaintextInput">Username</label>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input placeholder="Email" autoComplete="email" type="email" className="form-control shadow-sm bg-white rounded" id="floatingInput" value={formData.email} name="email" onChange={handleChange} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input placeholder="firstname" autoComplete="firstname" type="firstName" className="form-control shadow-sm bg-white rounded" value={formData.firstName} name="firstName" onChange={handleChange} />
                        <label htmlFor="floatingInput">First name</label>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input placeholder="lastname" autoComplete="lastname" type="lastName" className="form-control shadow-sm bg-white rounded" value={formData.lastName} name="lastName" onChange={handleChange} />
                        <label htmlFor="floatingInput">Last name</label>
                    </div>
                </div>

                <div className="htmlF-group mb-4">
                    <div className="form-floating mb-2">
                        <input placeholder="Password" autoComplete="off" type="password" className="form-control shadow-sm bg-white rounded" id="floatingPassword" value={formData.password} name="password" onChange={handleChange} />
                        <label htmlFor="floatingPassword">Password</label> 
                    </div>
                
                    <span className="text-secondary"><small>(6 characters minimum)</small></span>
                </div>

                <div className="row mb-2" id="error-div">
                
                </div>

                <div className="form-group mb-4">
                    <button name="button" type="submit" className="form-btn-next rounded-pill w-100" data-disable-with="<i class='fas fa-spinner fa-spin'></i>">Edit</button>
                </div>
            </form>
        </div>
    )
}

export default Profile;
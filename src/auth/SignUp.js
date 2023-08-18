import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import './Sessions.css';

const SignUp = ({ signup }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
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

        let result = await signup(formData);

        if (result.success) {
            navigate("/companies");
        } else {
            console.log(result.errors);
        }

        setFormData({
            email: "",
            username: "",
            firstName: "",
            lastName: "",
            password: ""
        });
    }
    return (
        <div className="Sessions">
            <div className="mb-5">
                <h5 className="mb-2">Welcome to <span className="hero-color"><strong>Jobly</strong></span></h5>
                <h3>Let's start with the basics</h3>
            </div>

            <form className="new_user" id="new_user" onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input placeholder="Email" autoComplete="email" type="email" className="form-control shadow-sm bg-white rounded" id="floatingInput" value={formData.email} name="email" onChange={handleChange} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input placeholder="username" autoComplete="username" type="username" className="form-control shadow-sm bg-white rounded" value={formData.username} name="username" onChange={handleChange} />
                        <label htmlFor="floatingInput">Username</label>
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
                    <button name="button" type="submit" className="form-btn-next rounded-pill w-100" data-disable-with="<i class='fas fa-spinner fa-spin'></i>">Sign Up</button>
                </div>

                <div className="form-group" align="center">
                    <div>
                    Already have an account? <span><a href="/login">Log in</a></span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
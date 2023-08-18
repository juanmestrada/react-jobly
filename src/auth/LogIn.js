import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Sessions.css';

const LogIn = ({login}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(l => ({ ...l, [name]: value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        let result = await login(formData);
        if (result.success) {
          navigate("/react-jobly/companies");
        } else {
          console.log(result.errors);
        }
    }
    return (
        <div className="Sessions">
            <div className="mb-5" align="center">
                <h2 className="hero-color mb-0"><strong> React Jobly</strong></h2>
                <h6>Your career platform</h6>
            </div>

            <form className="new_user" onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <div className="form-floating">
                        <input placeholder="Email" autoComplete="email" type="email" className="form-control shadow-sm bg-white rounded" id="floatingInput" required="required" name="email" value={formData.email} onChange={handleChange} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                </div>

                <div className="form-group mb-4">
                    <div className="form-floating mb-2">
                        <input placeholder="Password" autoComplete="off" type="password" className="form-control shadow-sm bg-white rounded" id="floatingPassword" name="password" value={formData.password} onChange={handleChange} />
                        <label htmlFor="floatingPassword">Password</label> 
                    </div>
                </div>

                <div className="row mb-2" id="error-div">
                
                </div>

                <div className="form-group mb-5" align="center">
                    <button name="button" type="submit" className="form-btn-next rounded-pill w-100" data-disable-with="<i className='fas fa-spinner fa-spin'></i>">Log In</button>
                </div>

                <div className="form-group" align="center">
                    <div>
                    Don't have an account? <span className="tr-pri-c"><a href="/react-jobly/signup">Sign up</a></span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LogIn;
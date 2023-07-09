import {useState} from "react";
import Store from "../store/store";
import User from "../store/entities/User";
import {useNavigate} from "react-router-dom";

export default () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(new User('', ''));
    const [error, setError] = useState(false);
    return <>
        <div className='text-center mt-5 fs-1'>Login</div>
        <form className='login w-25 mt-5 m-auto'>
            <div className='username mb-3'>
                <div className='form-label'>Username</div>
                <input type="text"
                       className='form-control'
                       value={user.username}
                       onChange={event => setUser({...user, username: event.target.value})}/>
            </div>
            <div className='password mb-3'>
                <div className='form-label'>Password</div>
                <input type="password"
                       className={error ? "form-control is-invalid" : "form-control"}
                       id="validationServer03"
                       aria-describedby="validationServer03Feedback"
                       value={user.password}
                       onChange={event => setUser({...user, password: event.target.value})}/>
                <div id="validationServer03Feedback" className="invalid-feedback">
                    Invalid password
                </div>
            </div>
            <div className='btn btn-primary' onClick={() => {
               try {
                   Store.login(user);
                   setError(false);
                   navigate('/');
               } catch (exception) {
                   setError(true);
               }
            }}>Login
            </div>
        </form>

    </>
}
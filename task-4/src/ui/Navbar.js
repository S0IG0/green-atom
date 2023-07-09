import {NavLink, useNavigate} from "react-router-dom";
import Store from "../store/store";
import {observer} from "mobx-react-lite";

export default observer(() => {
    const navigate = useNavigate();
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-body-tertiary">
                <div className="container-fluid">
                    <div className='navbar-brand' style={{textTransform: 'uppercase'}}>Blog</div>
                    <div className="">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/'}>Home</NavLink>
                            </li>
                            {Store.isAuth ?
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to={'/article-create'}>Create article</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <div className="btn btn-outline-danger" onClick={() => {
                                            Store.logout();
                                            navigate('/');
                                        }}>Logout</div>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <NavLink className="btn btn-outline-success" to={'/login'}>Login</NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
});
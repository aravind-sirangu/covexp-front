import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'
import Logo from '../images/logo.PNG'
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#33FF46" }
    else return { color: "#F9F9F8" }
}

const Nav = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark  justify-content-center">
                <li className="nav-item ">
                    <Link to="https://blacklivesmatter.com/" className=" text-light nav-link" >
                        <span className="font-weight-bold">BLACK LIVES MATTER</span>
                    </Link>
                </li>

            </ul>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link to="/" className="navbar-brand" style={isActive(history, "/")}>
                        <img src={Logo} alt="Logo" style={{ width: "40px" }} />
                    </Link>
                </li>

                <br />
                <li className="nav-item">
                    <Link to="/" className="nav-link" style={isActive(history, "/")}>
                        <span className="font-weight-bold">Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className="nav-link" style={isActive(history, "/users")}>
                        <span className="font-weight-bold">Users</span>
                    </Link>
                </li>

                {!isAuthenticated() ? (
                    <>

                        <li className="nav-item">
                            <Link to="/signin" className="nav-link" style={isActive(history, "/signin")} >
                                <span className="font-weight-bold">Signin</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link" style={isActive(history, "/signup")} >
                                <span className="font-weight-bold">Signup</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signin" className="nav-link" style={isActive(history, "/post/create")} >
                                <span className="font-weight-bold">Create Post</span>
                            </Link>
                        </li>

                    </>
                ) :
                    (
                        <>
                            <li className="nav-item">
                                <span className="nav-link" style={isActive(history, "/signup"), { cursor: "pointer", color: "#fff" }} onClick={() => { signout(() => history.push('/')) }}>
                                    <span className="font-weight-bold">Signout</span>

                                </span>
                            </li>
                            <li className="nav-item">
                                <Link to={`/user/${isAuthenticated().user._id}`} className="nav-link" style={isActive(history, `user/${isAuthenticated()._id}`)}>
                                    <span className="font-weight-bold">{`${isAuthenticated().user.name}'s profile`}</span>

                                </Link>

                            </li>

                            <li className="nav-item">
                                <Link to="/findpeople" className="nav-link" style={isActive(history, "/findpeople")} >
                                    <span className="font-weight-bold">Find People</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/post/create" className="nav-link" style={isActive(history, "/post/create")} >
                                    <span className="font-weight-bold">Create Post</span>
                                </Link>
                            </li>
                        </>
                    )
                }


            </ul>
        </div>
    )
}

export default withRouter(Nav)





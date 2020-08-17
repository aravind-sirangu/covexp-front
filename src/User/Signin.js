import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            buttonActive: false,
            emailErrorMsg: "",
            passwordErrorMsg: ""
        };
    }

    handleChange = name => event => {
        this.setState({ error: "", passwordErrorMsg: "", emailErrorMsg: "", buttonActive: false });
        this.setState({ [name]: event.target.value });
        let emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        let passwordRegex = /^(?=.*[0-9])(?=.*[a-z]).{8,32}$/

        if (!emailRegex.test(this.state.email)) {
            this.setState({ emailErrorMsg: "invalid email" })
        }
        else if (!passwordRegex.test(this.state.password)) {
            this.setState({ passwordErrorMsg: "Password should contain atleast one number and length 8" })
        }
        else if (this.state.passwordErrorMsg == "" && this.state.emailErrorMsg == "") {
            this.setState({ buttonActive: true })
        }
    };


    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        // console.log(user);

        // console.log(user, "user")
        signin(user).then(data => {
            if (data.error) {
                console.log(data.error, "haahah")
                this.setState({ error: data.error, loading: false });
            } else {
                // authenticate
                authenticate(data, () => {
                    this.setState({ redirectToReferer: true });
                });
            }
        });

    };

    signinForm = (email, password, emailErrorMsg, passwordErrorMsg, buttonActive) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
                <span className="text-danger">{emailErrorMsg}</span>
            </div>


            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
                <span className="text-danger">{passwordErrorMsg}</span>
            </div>



            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
                disabled={!buttonActive}
            >
                Submit
            </button>
        </form>
    );

    render() {
        const {
            email,
            password,
            error,
            redirectToReferer,
            loading,
            emailErrorMsg,
            passwordErrorMsg,
            buttonActive,

        } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>
                <hr />
                <SocialLogin />

                <hr />
                <br />

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        ""
                    )}

                {this.signinForm(email, password, emailErrorMsg, passwordErrorMsg, buttonActive)}

                <p>
                    <Link
                        to="/forgot-password"
                        className="btn btn-raised btn-danger"
                    >
                        {" "}
                        Forgot Password
                    </Link>
                </p>
            </div>
        );
    }
}

export default Signin;

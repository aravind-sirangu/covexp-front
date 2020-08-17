import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
// import SocialLogin from "./SocialLogin";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            recaptcha: false,
            buttonActive: false,
            emailErrorMsg: "",
            passwordErrorMsg: "",
            nameErrorMsg: ""
        };
    }

    handleChange = name => event => {
        this.setState({ error: "", nameErrorMsg: "", passwordErrorMsg: "", emailErrorMsg: "", buttonActive: false });
        this.setState({ [name]: event.target.value });

        let emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        let passwordRegex = /^(?=.*[0-9])(?=.*[a-z]).{8,32}$/
        let nameRegex = /^([A-z]+\s)*[A-z]+$/

        if (!emailRegex.test(this.state.email)) {
            this.setState({ emailErrorMsg: "invalid email" })
        }
        else if (!passwordRegex.test(this.state.password)) {
            this.setState({ passwordErrorMsg: "Password should contain atleast one number and length 8" })
        }
        else if (!nameRegex.test(this.state.name) || this.state.name == "") {
            this.setState({ nameErrorMsg: "Invalid name" })
        }
        if (this.state.nameErrorMsg == "" && this.state.passwordErrorMsg == "" && this.state.emailErrorMsg == "") {
            this.setState({ buttonActive: true })
        }



    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        // console.log(user);

        signup(user).then(data => {
            if (data.error) this.setState({ error: data.error });
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                });
        });

    };

    signupForm = (name, email, password, nameErrorMsg, emailErrorMsg, passwordErrorMsg, buttonActive) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
                <span className="text-danger">{nameErrorMsg}</span>
            </div>


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
        const { name, email, password, error, open, nameErrorMsg, emailErrorMsg, passwordErrorMsg, buttonActive } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <hr />
                {/* <SocialLogin /> */}

                <hr />
                <br />

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/signin">Sign In</Link>.
                </div>

                {this.signupForm(name, email, password, nameErrorMsg, emailErrorMsg, passwordErrorMsg, buttonActive)}
            </div>
        );
    }
}

export default Signup;

import React, { Component } from "react";
import { usersList } from "./apiUser";
import defaultProfilePic from "../images/avatar.png";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    usersList().then((data) => {
      if (data.error) {
        console.log("error");
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = (users) => {
    return (
      <div className="row">
        {users.map((user, index) => (
          <div className="card col-md-4" key={index}>
            <img
              className="card-img-top"
              src={`${process.env.REACT_APP_URL}/user/photo/${user._id}`}
              alt={user.name}
              onError={(i) => (i.target.src = `${defaultProfilePic}`)}
              style={{ width: "100%", height: "15vw", objectFit: "cover" }}
            />

            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link
                to={`user/${user._id}`}
                className="btn raised btn-small btn-primary"
              >
                View Profile{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5 font-weight-bold">Users</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;

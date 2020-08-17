import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import defaultProfilePic from "../images/avatar.png";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { postsListByUser } from "../Post/apiPost";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        following: [],
        followers: [],
      },
      redirectToSignin: false,
      following: false,
      error: "",
      posts: []
    };
  }

  // init = (userId) => {
  //   const token = isAuthenticated().token;
  //   read(userId, token).then((data) => {
  //     if (data.error) {
  //       this.setState({ redirectToSignin: true });
  //     } else {
  //       this.setState({ user: data });
  //     }
  //   });
  // };

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
        this.loadPosts(data._id)
      }
    });
  };

  loadPosts = (userId) => {
    const token = isAuthenticated().token
    postsListByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error)
      }
      else {
        this.setState({ posts: data })
      }
    })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  checkFollow = (user) => {
    const jwt = isAuthenticated();
    const match = user.followers.find((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = (callApi) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  render() {
    const { user, redirectToSignin, posts } = this.state;
    // console.log(user._id, "hihih")
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    const photoUrl = user._id
      ? `${process.env.REACT_APP_URL}/user/photo/${
      user._id
      }?${new Date().getTime()}`
      : defaultProfilePic;

    return (
      <div className="container">
        <h3 className="mt-5 mb-5 font-weight-bold">Profile</h3>
        <div className="row">
          <div className="col-md-4">
            <img
              style={{ height: "200px", width: "auto" }}
              className="img-thumbnail"
              src={photoUrl}
              onError={(i) => (i.target.src = `${defaultProfilePic}`)}
              alt={user.name}
            />
          </div>

          <div className="col-md-8">
            <div className="card mb-2">
              <div className="card-body">
                <h6 className="mt-5 mb-5 font-weight-bold">Name: {user.name}</h6>
                <h6 className="mt-5 mb-5 font-weight-bold">Email:{user.email}</h6>
                <h6 className="mt-5 mb-5 font-weight-bold">{`Joined on: ${new Date(
                  user.created
                ).toDateString()}`}</h6>
              </div>
            </div>

            {isAuthenticated().user._id === user._id ? (
              <div className="btn-group">
                <Link
                  className="btn btn-raised btn-info mr-5"
                  to={`/post/create`}
                >
                  Create Post
                </Link>
                <Link
                  className="btn btn-raised btn-success mr-5"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>


                <DeleteUser userId={user._id} />
              </div>
            ) : (
                <FollowProfileButton
                  following={this.state.following}
                  onButtonClick={this.clickFollowButton}
                />
                //   <p>{this.state.following ? `following` : `notfollowing`}</p>
              )}

            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
            <hr />
            <p className="lead">{user.about}</p>
            <hr />
            <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

// const userId = this.props.match.params.userId
// fetch(`${process.env.REACT_APP_API}/user/${userId}`,
//     {
//         method: "GET",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${isAuthenticated().token}`
//         }

//     })
//     .then(response => {
//         return response.json()
//     })
//     .then(data => {
//         if (data.error) {
//             console.log("ERROr ")
//         }
//         else {
//             this.setState({ user: data })
//         }
//     })

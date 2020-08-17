import React, { Component } from "react";
import { postsList } from "./apiPost";
import defaultPostPic from "../images/corona.jpg";
import { Link } from "react-router-dom";

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        postsList().then((data) => {
            if (data.error) {
                console.log("error");
            } else {
                // console.log(data)
                this.setState({ posts: data });
            }
        });
    }

    renderPosts = posts => {
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const posterId = post.postedBy
                        ? `/user/${post.postedBy._id}`
                        : "";
                    const posterName = post.postedBy
                        ? post.postedBy.name
                        : " Unknown";

                    return (
                        <div className="card col-md-4" key={i}>
                            <div className="card-body">
                                <img
                                    src={`${
                                        process.env.REACT_APP_URL
                                        }/post/photo/${post._id}`}
                                    alt={post.title}
                                    onError={i =>
                                        (i.target.src = `${defaultPostPic}`)
                                    }
                                    className="img-thunbnail mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                />
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">
                                    {post.body.substring(0, 100)}
                                </p>
                                <br />
                                <p className=" mark">
                                    Author{" "}
                                    <Link to={`${posterId}`}>
                                        {posterName}{" "}
                                    </Link>
                                    <br />
                                    Posted on {new Date(post.created).toDateString()}
                                </p>
                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-raised btn-primary btn-sm"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };


    render() {
        const { posts } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5 font-weight-bold">
                    {!posts.length ? 'Loading...' : "Recent Posts"}
                </h2>
                {this.renderPosts(posts)}
            </div>
        );
    }
}

export default Posts;

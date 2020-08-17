import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './main/Home'
import Nav from './main/Nav'
import Signup from './User/Signup'
import Signin from './User/Signin'
import Profile from './User/Profile'
import Users from './User/Users'
import EditProfile from './User/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import FindPeople from './User/FindPeople'
import CreatePost from './Post/CreatePost'
import SinglePost from './Post/SinglePost'
import EditPost from './Post/EditPost'
import ForgotPassword from './User/ForgotPassword'
import ResetPassword from './User/ResetPassword'

const AllRoutes = () => {
    return (<div >
        <Nav />
        <Switch >
            <Route exact path="/" component={Home} />
            {/* <PrivateRoute exact path="/admin" component={Admin} /> */}
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
            <PrivateRoute exact path="/post/create" component={CreatePost} />
            <Route exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
        </Switch>
    </div >
    )
}



export default AllRoutes
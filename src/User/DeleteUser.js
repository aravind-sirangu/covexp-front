import React, { Component } from 'react'
import { isAuthenticated, signout } from '../auth/index'
import { remove } from './apiUser'
import { Redirect } from 'react-router-dom'

class DeleteUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            reDirect: false
        }
    }


    deleteAccount = () => {
        const token = isAuthenticated().token
        const userId = this.props.userId
        remove(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    //signout user
                    signout(() => { console.log("acc is deleted") })
                    //redirect
                    this.setState({ reDirect: true })


                }
            })
    }

    deleteConfirm = () => {
        let alert = window.confirm("Are you Sure? Your Account will be deleted on a Click!!")
        if (alert) {
            this.deleteAccount()
        }
    }


    render() {

        if (this.state.reDirect) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <button className="btn btn-danger btn-raised mr-5" onClick={this.deleteConfirm}>
                    Delete Account
                </button>
            </div>
        )
    }
}


export default DeleteUser
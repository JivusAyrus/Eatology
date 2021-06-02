import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../Css/Login.css'
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import Signup from './Signup';
import $ from "jquery"
import { Redirect } from 'react-router-dom'
export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false
        }
    }
    componentDidMount() {
        $("form").submit(function (event) {
            $.get(process.env.REACT_APP_SERVER + "/users/by-email/" + $('input[name="email"]').val(),
                function (data) {
                    if (data.length == 0) {
                        alert("Invalid email")
                        $('input[name="password"]').val('')
                        $('input[name="email"]').val('')
                        return
                    }
                    if (data[0].password != $('input[name="password"]').val()) {
                        alert("Wrong password !")
                        $('input[name="password"]').val('')
                        return
                    }
                    //Add login functionality
                    sessionStorage.setItem('user', JSON.stringify(data[0]))
                    this.setState({
                        isLoggedIn: true
                    })

                    console.log("LOGGED INN!!")
                }.bind(this)
            )

            event.preventDefault()
        }.bind(this));
    }
    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to={{
                pathname: '/',
            }} />
        }
        else {
            return (
                <div class="body" id="root">
                    <div class="card">
                        <div class="card-body">
                            <form>
                                <p class="card-title">Login</p>
                                <input class="logininp" type="email" name="email" placeholder="Email" pattern="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)" required title="eg. abc@gmail.com, abc@dr-ait.org" /><br />
                                <input class="logininp" type="password" name="password" placeholder="Password" required /><br />
                                <button type="submit" class="btn btn-outline-danger">Log In</button>
                            </form>
                            <p class="link"><Link to="/forgotpassword" style={{ color: "red" }}>Forgot Password?</Link>
                                <p>New User?<Link to="/signup" style={{ color: "red" }}>Sign Up</Link></p></p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Login;

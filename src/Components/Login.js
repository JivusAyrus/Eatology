import React, { Component } from 'react'
import '../Css/Login.css'
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Signup from './Signup';
export class Login extends Component {
    render() {
        return (
            <div class="body">
                <div class="card">
                    <div class="card-body">
                        <form action="">
                            <p class="card-title">Login</p>
                            <input type="email" name="email" placeholder="Email" required title="Please enter the Email"/><br/>
                            <input type="password" name="password" placeholder="Password" required/><br/>
                            <button type="submit" class="btn btn-outline-danger">Log In</button>
                        </form> 
                        <p class="link"><Link to="" style={{color:"red"}}>Forgot Password?</Link>
                        <p>New User?<Link to="/signup" style={{color:"red"}}>Sign In</Link></p></p>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default Login;


import React, { Component } from 'react'
import "../Css/Signup.css"
export class Signup extends Component {
    render() {
        return (
            <div class="body">
                <div class="card" style={{marginTop:"90px"}}>
                    <div class="card-body">
                    <form action="">
                        <p class="card-title">Signup</p>
                        <input type="text" name="fname" placeholder="First Name" required/>
                        <input type="text" name="sname" placeholder="Second Name" required/>
                        <input type="email" name="email" placeholder="Email" required title="Please enter the Email"/><br/>
                        <input type="password" name="password" placeholder="Password" required/><br/>
                        <input type="password" name="password" placeholder="Confirm Password" required/><br/>
                        <button type="submit" class="btn btn-outline-danger">Sign Up</button>
                    </form> 
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup

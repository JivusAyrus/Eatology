import React, { Component } from 'react'
import '../Css/NewPassword.css'
class NewPassword extends Component {
    render() {
        return (
            <div class="newpass">
                <div class="card" style={{ marginTop: "160px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">New Password</p><br/>
                            <input type="password" name="newpassword" placeholder="Password" required minlength="8" /><br />
                            <input type="password" name="newcpass" placeholder="Confirm Password" required minlength="8"/><br />
                            <button type="submit" class="btn btn-outline-danger">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewPassword

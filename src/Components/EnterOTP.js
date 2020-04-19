import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../Css/EnterOTP.css'
class EnterOTP extends Component {
    timehandler(){
        var timeLimit = this.props.location.state.time
        var timeClicked = new Date();

    }
    render() {
        return (
            <div class="otppage">
                <div class="card" style={{ marginTop: "190px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">Enter OTP</p><br/>
                            <input type="text" placeholder="Enter OTP" name="otp" /><br/>
                            <button type="submit" onClick={this.timehandler} class="btn btn-outline-danger">Submit</button>
                            <p>Didn't recieve?<Link  style={{ color: "red" }}>Resend</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EnterOTP

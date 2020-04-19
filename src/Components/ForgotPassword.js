import React, { Component } from 'react'
import '../Css/ForgotPassword.css'
import { Redirect } from 'react-router-dom'
class ForgotPassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             sent:false
        }
    }
    otphandler(){
        var time = new Date();
        var timeLimit = new Date(time.getDate+(15*60000))
    }
    render() {
        if(this.state.sent){
            return <Redirect to={{
                pathname: '/enterotp',
                state:{
                    time:this.timeLimit
                }
            }} />
        }
        return (
            <div class="fullpage">
                <div class="card" style={{ marginTop: "170px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">Forgot Password</p><br/>
                            <input type="email" name="email" placeholder="Email" pattern="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)" required title="eg. abc@gmail.com, abc@dr-ait.org"/>
                            <p style={{color:"red"}}>The OTP will be sent to the above mentioned email</p>
                            <button type="submit" onClick={this.otphandler} class="btn btn-outline-danger">Generate OTP</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword

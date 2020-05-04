import React, { Component } from 'react'
import '../Css/ForgotPassword.css'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
             sent:false
        }
    }
    otphandler(){
        var timeLimit = new Date();
        timeLimit.setMinutes(timeLimit.getMinutes() + 15)
        sessionStorage.setItem('timeLimit', timeLimit.toString())
    }
    componentDidMount(){
        var that = this;
        $('form').on('submit',function(event){
            $.ajax({
                type: "post",
                url: "http://localhost:5000/users/send-otp/" + $('#email').val() ,
                dataType: "json",
                contentType: false,
                cache: false,
                processData: false,                     //Assigns the data to post request body and not url
                success: (response, status, jqXHR) => {
                    if(response.success){
                        sessionStorage.setItem('otp',response.otp)
                        sessionStorage.setItem('email',$('#email').val())
                        that.setState({
                            sent:true
                        })
                    }
                    else{
                        alert(response.msg)
                        $('input[name="email"]').val('')
                    }
                },
                error: (jqXHR, status, err) => {
                    console.log(jqXHR);
                },
            });
            event.preventDefault()
        })
    }
    render() {
        if(this.state.sent){
            return <Redirect to={{
                pathname: '/enterotp',
            }} />
        }
        else{
        return (
            <div class="fullpage">
                <div class="card" style={{ marginTop: "170px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">Forgot Password</p><br/>
                            <input type="email" name="email" id="email" placeholder="Email" pattern="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)" required title="eg. abc@gmail.com, abc@dr-ait.org"/>
                            <p style={{color:"red"}}>The OTP will be sent to the above mentioned email</p>
                            <button type="submit" onClick={this.otphandler} class="btn btn-outline-danger">Generate OTP</button>
                        </form>
                    </div>
                </div>
            </div>
        )
        }
    }
}
export default ForgotPassword

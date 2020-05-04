import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../Css/EnterOTP.css'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
class EnterOTP extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCorrect: false
        }
    }
    componentDidMount() {
        var that = this;
        $('form').on('submit', function (event) {
            var timeLimit = Date.parse(sessionStorage.getItem('timeLimit'))
            var timeClicked = new Date();
            if (timeClicked.getTime() > timeLimit) {
                alert("Timelimit exceeded.Try Again!")
                $('input[name="otp"]').val('')
            }
            else if (sessionStorage.getItem('otp') == $('#otp').val()) {
                that.setState({
                    isCorrect: true
                })
            }
            else {
                alert('Invalid OTP')
                $('input[name="otp"]').val('')
            }
            event.preventDefault()
        })
    }
    otphandler() {
        var timeLimit = new Date();
        timeLimit.setMinutes(timeLimit.getMinutes() + 15)
        sessionStorage.setItem('timeLimit', timeLimit.toString())
        resendOtp();
    }
    render() {
        if (this.state.isCorrect) {
            return <Redirect to={{
                pathname: '/newpassword',
            }} />
        }
        else {
            return (
                <div class="otppage">
                    <div class="card" style={{ marginTop: "190px" }}>
                        <div class="card-body">
                            <form>
                                <p class="card-title">Enter OTP</p><br />
                                <input type="text" placeholder="Enter OTP" name="otp" id="otp" /><br />
                                <button type="submit" class="btn btn-outline-danger">Submit</button>
                                <p>Didn't recieve?<Link onClick={this.otphandler} style={{ color: "red" }}>Resend OTP</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
    
}
function resendOtp() {
    $.ajax({
        type: "post",
        url: "http://localhost:5000/users/send-otp/" + sessionStorage.getItem('email') ,
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,                     //Assigns the data to post request body and not url
        success: (response, status, jqXHR) => {
            if(response.success){
                sessionStorage.setItem('otp',response.otp)
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
}
export default EnterOTP

import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../Css/EnterOTP.css'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
class EnterOTP extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isCorrect:false
        }
    }
    
    componentDidMount(){
        var that = this;
        $('form').on('submit',function(event){
            var timeLimit = Date.parse(sessionStorage.getItem('timeLimit'))
            var timeClicked = new Date();
            if(timeClicked.getTime()>timeLimit.getItem()){
                alert("Timelimit exceeded.Try Again!")
                $('input[name="otp"]').val('') 
            }
            if(sessionStorage.getItem('otp') == $('#otp').val()){
                that.setState({
                    isCorrect:true
                }) 
                alert(that.state.isCorrect)
            }
            else{
                alert('Invalid OTP')
                $('input[name="otp"]').val('')   
            }
            event.preventDefault()
        })
    }
    otphandler(){
        var time = new Date();
        var timeLimit = new Date(time.getDate+(15*60000))
        sessionStorage.setItem('timeLimit',timeLimit.toString())
    }
    render() {
        if(this.state.isCorrect){
            return <Redirect to={{
                pathname: '/newpassword',
            }} />
        }
        else{
        return (
            <div class="otppage">
                <div class="card" style={{ marginTop: "190px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">Enter OTP</p><br/>
                            <input type="text" placeholder="Enter OTP" name="otp" id="otp" /><br/>
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

export default EnterOTP

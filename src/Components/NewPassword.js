import React, { Component } from 'react'
import '../Css/NewPassword.css'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
class NewPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isChanged: false
        }
    }
    componentDidMount() {
        var email = sessionStorage.getItem('email')
        var that = this;
        $('form').on('submit', function (event) {
            if ($('#newpass').val() == $('#newcpass').val()) {
                fetch("http://localhost:5000/users/update-by-email/" + email, {
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": JSON.stringify({
                        "password": $('#newpass').val()
                    })
                })
                    .then(response => {
                        alert('Password updated successfully')
                        that.setState({
                            isChanged : true
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else {
                alert('Passwords do not match')
                $('input[name="newcpass"]').val('')
            }
            event.preventDefault()
        })
    }
    render() {
        if (this.state.isChanged) {
            return <Redirect to={{
                pathname: '/login',
            }} />
        }
        else {
            return (
                <div class="newpass">
                    <div class="card" style={{ marginTop: "160px" }}>
                        <div class="card-body">
                            <form>
                                <p class="card-title">New Password</p><br />
                                <input type="password" id="newpass" name="newpassword" placeholder="Password" required minlength="8" /><br />
                                <input type="password" id="newcpass" name="newcpass" placeholder="Confirm Password" required minlength="8" /><br />
                                <button type="submit" class="btn btn-outline-danger">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default NewPassword

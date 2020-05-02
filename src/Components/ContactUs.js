import React, { Component } from 'react'
import '../Css/ContactUs.css'
import $ from 'jquery'
export class ContactUs extends Component {
    componentDidMount(){
        $('form').on('submit',function(event){
            $.ajax({
                type: "post",
                url: "http://localhost:5000/users/contact-us",
                dataType: "json",
                data: JSON.stringify({ username:$('#contactname').val(),
                                       email_id:$('#contactemail').val(),
                                       email_body:$('#msg').val()
                                    }),
                processData: false,                     //Assigns the data to post request body and not url
                contentType: "application/json",
                success: (data, status, jqXHR) => {
                    alert('Your feedback has been sent')
                    $('#contactname').val('')
                    $('#contactemail').val('')
                    $('#msg').val('')
                },
                error: (jqXHR, status, err) => {
                    console.log(jqXHR);
                },
    
            });
            event.preventDefault()
        })
    }
    render() {
        return (
            <div class="contactus">
                <div class="card" style={{ marginTop: "100px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">Contact Us</p><br/>
                            <input type="text" placeholder="Name" name="name" id="contactname" required/><br/>
                            <input type="email" name="email" placeholder="Email" id="contactemail" pattern="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)" required title="eg. abc@gmail.com, abc@dr-ait.org"/><br/>
                            <textarea name="message" rows="5" cols="48" id="msg" placeholder="Message" required/><br/><br/>
                            <button type="submit" class="btn btn-outline-danger">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactUs

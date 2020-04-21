import React, { Component } from 'react'
import '../Css/ContactUs.css'
export class ContactUs extends Component {
    render() {
        return (
            <div class="contactus">
                <div class="card" style={{ marginTop: "100px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">Contact Us</p><br/>
                            <input type="text" placeholder="Name" name="name" required/><br/>
                            <input type="email" name="email" placeholder="Email" pattern="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)" required title="eg. abc@gmail.com, abc@dr-ait.org"/><br/>
                            <textarea name="message" rows="5" cols="48" placeholder="Message" required/><br/><br/>
                            <button type="submit" class="btn btn-outline-danger">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactUs

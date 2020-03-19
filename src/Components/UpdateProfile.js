import React, { Component } from 'react'
import "../Css/UpdateProfile.css"
import $ from "jquery"
export class UpdateProfile extends Component {
    componentDidMount(){
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
        
                reader.onload = function (e) {
                    $('#image').attr('src', e.target.result);
                }
        
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#propic").change(function(){
            readURL(this);
        });
    }
    render() {
        return (
            <div class="body">
                <div class="card" style={{ marginTop: "65px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">UpdateProfile</p>
                            <div class="profile">
                                <img id="image" src=""/>
                                <i class="fa fa-edit" onClick={this.handleClick}><input hidden id="propic" type="file" ref={imageref => this.imageHandler=imageref} attach="image/*"/></i>
                            </div><br/>
                            <input type="text" name="fullname" placeholder="Full Name" defaultValue="" required />
                            <input type="text" name="username" placeholder="Public User Name (max 6 characters)" defaultValue="" required maxlength="6"/>
                            <input type="email" name="email" pattern = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)" placeholder="Email" required title="eg. abc@gmail.com, abc@dr-ait.org" value="" disabled/>
                            <input type="text" name="phone" placeholder="Phone No"  pattern="^[0-9]{10}" title="The number should be of 10 digits" maxlength="10" minlength="10"/><br />
                            <button type="submit" class="btn btn-outline-danger">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    handleClick=(e) => {this.imageHandler.click()}
}

export default UpdateProfile

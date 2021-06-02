import React, { Component } from 'react'
import "../Css/UpdateProfile.css"
import $ from "jquery"
import { Redirect } from 'react-router-dom'

export class UpdateProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isUpdated: false
        }
    }

    componentDidMount() {
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#image').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#propic").change(function () {
            readURL(this);
        });

        var that = this;
        $("form").submit(function (event) {
            var updateObject = new FormData()
            var user = JSON.parse(sessionStorage.getItem('user'))
            var form_values = $(this).serializeArray();
            $.each(form_values, function (i, field) {
                if (field.name == 'email') return
                updateObject.append(field.name, field.value)
            })
            if (!(document.getElementById('propic').files[0] == undefined || document.getElementById('propic').files[0] == null))
                updateObject.append("profile_img", document.getElementById('propic').files[0])


            $.ajax({
                type: "post",
                url: process.env.REACT_APP_SERVER + "/users/update/" + user._id,
                dataType: "json",
                data: updateObject,
                contentType: false,
                cache: false,
                processData: false,                     //Assigns the data to post request body and not url
                success: (data, status, jqXHR) => {
                    console.log("Update success !")
                    console.log(data)
                    sessionStorage.clear()
                    sessionStorage.setItem('user', JSON.stringify(data))
                    that.setState({
                        isUpdated: true
                    })
                },
                error: (jqXHR, status, err) => {
                    console.log(jqXHR);

                },

            });

            event.preventDefault();
        })
    }
    render() {
        if (sessionStorage.getItem('user') == null) {
            return (
                <>
                    <h1>YOU MUST LOGIN FIRST !</h1>
                </>
            )
        }

        else if (this.state.isUpdated) {
            return (
                <Redirect to={{
                    pathname: '/',
                }} />)
        }
        else {
            var user = JSON.parse(sessionStorage.getItem('user'))
            return (
                <div class="body">
                    <div class="card" style={{ marginTop: "65px" }}>
                        <div class="card-body">
                            <form>
                                <p class="card-title">UpdateProfile</p>
                                <div class="profile">
                                    <img id="image" src={user.profile_img != undefined ?"data:image/jpeg;base64," + this.arrayBufferToBase64(user.profile_img.data): require("./default profile.png")} />
                                    <i class="fa fa-edit" onClick={this.handleClick}><input hidden id="propic" type="file" ref={imageref => this.imageHandler = imageref} attach="image/*" /></i>
                                </div><br />
                                <input type="text" name="fullname" placeholder="Full Name" defaultValue={user.fullname} required />
                                <input type="text" name="username" placeholder="Public User Name (max 6 characters)" defaultValue={user.username} required maxlength="6" />
                                <input type="email" name="email" pattern="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)" placeholder="Email" required title="eg. abc@gmail.com, abc@dr-ait.org" value={user.email} disabled />
                                <input type="text" name="phone_number" placeholder="Phone No" defaultValue={user.phone_number == undefined ? "" : user.phone_number} pattern="^[0-9]{10}" title="The number should be of 10 digits" maxlength="10" minlength="10" /><br />
                                <button type="submit" class="btn btn-outline-danger">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
    handleClick = (e) => { this.imageHandler.click() }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
}

export default UpdateProfile

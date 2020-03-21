import React, { Component } from 'react'
import "../Css/Signup.css"
import $ from "jquery"
import { Redirect } from 'react-router-dom'
export class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedUp: false
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
        
        $("#propic").change(function(){
            readURL(this);
        });
        var that = this;
        $("form").submit(function (event) {
            var input_values = $(this).serializeArray();
            if ($('input[name="password"]').val() == $('input[name="cpass"]').val()) {
                var post_JSON = new FormData();
                $.each(input_values, function (i, field) {
                    if (field.name == 'cpass') return
                    post_JSON.append(field.name,field.value);
                });
                post_JSON.append("userImage",document.getElementById('propic').files[0])
                $.ajax({
                    type: "post",
                    url: "http://localhost:5000/users/add",
                    dataType: "json",
                    data: post_JSON,
                    contentType:false,
                    cache:false,
                    processData: false,                     //Assigns the data to post request body and not url
                    success: (data, status, jqXHR) => {
                        var jsonObject = {};
                        jsonObject["favourites"]=[]
                        jsonObject["search_history"]=[]
                        for (const [key, value]  of post_JSON.entries()) {
                            jsonObject[key] = value;
                        }
                        sessionStorage.setItem("user", JSON.stringify(jsonObject))
                        that.setState({
                            isSignedUp:true 
                        })
                    },
                    error: (jqXHR, status, err) => {
                        console.log(jqXHR);
                        alert('A user with this email already exists !')
                        $('input[name="email"]').val('')
                        $('input[name="cpass"]').val('')
                        $('input[name="password"]').val('')
                    },

                });
            }
            else {
                console.log("Passwords do not match")
                alert('Passwords do not match')
                $('input[name="cpass"]').val('')
            }
            
            event.preventDefault();

        });




    }

    render() {
        if (this.state.isSignedUp) {
            return <Redirect to={{
                pathname: '/cusinefavs'
            }}/>
        }
        else{
        return (
            <div class="body">
                <div class="card" style={{ marginTop: "40px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">Signup</p>
                            <div class="profile">
                                <img id="image" src={require("./default profile.png")}/>
                                <i class="fa fa-edit" onClick={this.handleClick}></i><input hidden id="propic" name="userImage" type="file" ref={imageref => this.imageHandler=imageref} attach="image/*"/>
                            </div><br/>
                            <input class="signupinp" type="text" name="fullname" placeholder="Full Name" required />
                            <input class="signupinp" type="text" name="username" placeholder="Public User Name (max 6 characters)" required maxlength="6"/>
                            <input class="signupinp" type="email" name="email" pattern = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)" placeholder="Email" required title="eg. abc@gmail.com, abc@dr-ait.org" /><br />
                            <input class="signupinp" type="password" name="password" placeholder="Password" required minlength="8"/><br />
                            <input class="signupinp" type="password" name="cpass" placeholder="Confirm Password" required minlength="8"/><br />
                            <button type="submit" class="btn btn-outline-danger">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        )
        }
    }
    handleClick=(e) => {this.imageHandler.click()}
    
}

export default Signup

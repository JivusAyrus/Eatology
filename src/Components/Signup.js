import React, { Component } from 'react'
import "../Css/Signup.css"
import $ from "jquery"
export class Signup extends Component {
    componentDidMount() {
        $("form").submit(function (event) {
            var input_values = $(this).serializeArray();
            if ($('input[name="password"]').val() == $('input[name="cpass"]').val()) {


                var post_JSON = {};
                $.each(input_values, function (i, field) {
                    if (field.name == 'cpass') return
                    post_JSON[field.name] = field.value;
                });
                // console.log(post_JSON)

                $.ajax({
                    type: "post",
                    url: "http://localhost:5000/users/add",
                    dataType: "json",
                    data: JSON.stringify(post_JSON),
                    processData: false,                     //Assigns the data to post request body and not url
                    contentType: "application/json",
                    success: (data, status, jqXHR) => {
                        console.log(data);
                    },
                    error: (jqXHR, status, err) => {
                        console.log(jqXHR.responseText);
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
        return (
            <div class="body">
                <div class="card" style={{ marginTop: "90px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">Signup</p>
                            <input type="text" name="fullname" placeholder="Full Name" required />
                            <input type="text" name="username" placeholder="Public User Name (max 6 characters)" required pattern="(^.{6})"/>
                            <input type="email" name="email" pattern = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)" placeholder="Email" required title="eg. abc@gmail.com, abc@dr-ait.org" /><br />
                            <input type="password" name="password" placeholder="Password" required minlength="8"/><br />
                            <input type="password" name="cpass" placeholder="Confirm Password" required minlength="8"/><br />
                            <button type="submit" class="btn btn-outline-danger">Sign Up</button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default Signup

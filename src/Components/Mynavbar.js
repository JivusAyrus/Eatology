import React, { Component } from 'react'
import '../Css/Mynavbar.scss'
import $ from "jquery";
import HomePage from './HomePage';
import MyParticles from './MyParticles'
import Login from './Login'
import Signup from './Signup'
import Footer from './Footer'
import Favorite from './Favorite'
import UpdateProfile from './UpdateProfile'
import { createBrowserHistory } from 'history'
import {
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";

export class Mynavbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // user: JSON.parse(sessionStorage.getItem('user'))
        }
    }




    componentDidMount() {

        $(document).ready(function () {
            $('#sidebar').toggleClass('active');

            $('#dismiss').on('click', function () {
                $('#sidebar').toggleClass('active');
                $('.overlay').removeClass('active');
            });

            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $('.overlay').addClass('active');

            });
            $('.anchors').on('click', function () {
                $('#sidebar').toggleClass('active');
                $('.overlay').removeClass('active');
            });
            $('.Home').on('click', function () {
                $('.home').addClass('active');
                $('.login').removeClass('active');
                $('.favorites').removeClass('active');
                $('.settings').removeClass('active');
                $('.logout').removeClass('active');
            });
            $('.Login').on('click', function () {
                $('.login').addClass('active');
                $('.home').removeClass('active');
                $('.favorites').removeClass('active');
                $('.settings').removeClass('active');
                $('.logout').removeClass('active');
            });
            $('.Favorites').on('click', function () {
                $('.favorites').addClass('active');
                $('.login').removeClass('active');
                $('.home').removeClass('active');
                $('.settings').removeClass('active');
                $('.logout').removeClass('active');
            });
            $('.Settings').on('click', function () {
                $('.settings').addClass('active');
                $('.login').removeClass('active');
                $('.favorites').removeClass('active');
                $('.home').removeClass('active');
                $('.logout').removeClass('active');
            });
            $('.Logout').on('click', function () {
                $('.logout').addClass('active');
                $('.login').removeClass('active');
                $('.favorites').removeClass('active');
                $('.home').removeClass('active');
                $('.settings').removeClass('active');
            });
        });
    }

    render() {
        const { router, params, location, routes } = this.props
        var user = JSON.parse(sessionStorage.getItem('user'))
        if(user != null)
            console.log(this.arrayBufferToBase64(user.profile_img.data))
        return (
            <div>
                <div className="wrapper" >
                    <nav id="sidebar">
                        <div id="dismiss">
                            <i class="fas fa-arrow-left"></i>
                        </div>
                        <div className="sidebar-header">
                            <h1>Eatology!</h1>
                            {
                                user == null ? <img src={require('./default profile.png')} /> :
                                    <img src={"data:image/jpeg;base64," + this.arrayBufferToBase64(user.profile_img.data)} />
                            }
                        </div>
                        <ul className="list-unstyled components sidelinks" >
                            <li className="home">
                                <Link to="/" className="anchors Home" style={{ color: "white" }}>Home</Link>
                            </li>
                            <li className="login">
                                <Link to="/login" className="anchors Login" style={{ color: "white" }}>Login</Link>
                            </li>
                            <li className="favorites">
                                <Link to="/favorite" className="anchors Favorites" style={{ color: "white" }}>Favorites</Link>
                            </li>
                            <li className="settings">
                                <Link to="/updateprofile" className="anchors Settings" style={{ color: "white" }}>Update Profile</Link>
                            </li>
                            <li className="logout">
                                <Link onClick={() => {
                                    sessionStorage.clear()
                                    location.state = null
                                    window.history.pushState(null, null, '/')
                                }} className="anchors Logout" style={{ color: "white" }}>Logout</Link>
                            </li>
                        </ul>
                        <ul class="list-unstyled list-inline" style={{ fontSize: "28px", marginTop: "280px" }}>
                            <li class="list-inline-item"><a href="https://www.facebook.com/suvij.surya"><i class='fab fa-facebook-square'></i></a></li>
                            <li class="list-inline-item"><a href="..."><i class='fab fa-twitter'></i></a></li>
                            <li class="list-inline-item"><a href="https://www.instagram.com/vineetkgb"><i class='fab fa-instagram'></i></a></li>
                            <li class="list-inline-item"><a href="..."><i class="fa fa-info-circle"></i></a></li>
                        </ul>
                    </nav>
                    <div id="content">
                        <nav className="navbar navbar-light bg-light navbar mynav">
                            <div id="sidebarCollapse">
                                <img src="https://www.transparentpng.com/thumb/food/Ha2HDD-food-cut-out-png.png" alt="logo" width="40px" height="40px" />
                            </div>
                            <Link to="/" style={{ textDecoration: "none" }}><h4 id="font">Eatology!</h4></Link>
                            <div class="tag">
                                <p>Welcome {

                                    user == null ? "User!" : user.username
                                }
                                    <Link to="/favorite" style={{ fontSize: "26px", color: "red" }}><i class="fa fa-heart" aria-hidden="true"></i></Link></p>
                            </div>
                        </nav>
                        <Switch>
                            <Route path="/signup"><Signup /></Route>
                            <Route path="/favorite"><Favorite /></Route>
                            <Route path="/login"><Login /></Route>
                            <Route path="/updateprofile"><UpdateProfile /></Route>
                            <Route path="/"><HomePage /></Route>
                        </Switch>
                    </div>
                    <div class="overlay"></div>
                </div>
                <div class="foot">
                    <Footer />
                </div>
            </div>
        )
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };


}


export default withRouter(Mynavbar)


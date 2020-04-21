import React, { Component } from 'react'
import '../Css/Footer.css'
import {
  Link
} from "react-router-dom";
export class Footer extends Component {
    render() {
        return (
            <div>
            <section id="footer">
            <div class="container">
              <div class="row text-left">
                
                <div class="col-lg-3">
                  <h5>Site Map</h5>
                  <ul class="list-unstyled quick-links">
                    <li><Link to="/"><i class="fa fa-angle-double-right"></i>Home</Link></li>
                    <li><Link to="/search"><i class="fa fa-angle-double-right"></i>Search Food</Link></li>
                    <li><Link to="/favorite"><i class="fa fa-angle-double-right"></i>Favorites</Link></li>
                    <li><Link to="/updateprofile"><i class="fa fa-angle-double-right"></i>Profile</Link></li>
                    <li><Link to="/contactus"><i class="fa fa-angle-double-right"></i>Contact Us</Link></li>
                  </ul>
                </div>
                <div class="col-lg-6"></div>
                <div class="col-lg-3">
                <h5>Quick links</h5>
                <ul class="list-unstyled quick-links">
                  <li><Link to="/"><i class="fa fa-angle-double-right"></i>Home</Link></li>
                  <li><Link to="/login"><i class="fa fa-angle-double-right"></i>Login</Link></li>
                  <li><Link to="/signup"><i class="fa fa-angle-double-right"></i>Sign Up</Link></li>
                  <li><Link to="/updateprofile"><i class="fa fa-angle-double-right"></i>Profile</Link></li>
                  <li><Link to=""><i class="fa fa-angle-double-right"></i>About Us</Link></li>
                </ul>
                </div>
              </div><br/>
              <div class="row">
                <div class="col-lg-12">
                  <ul class="list-unstyled list-inline social text-center">
                    <li class="list-inline-item"><a href="https://www.facebook.com/suvij.surya"><i class='fab fa-facebook-square'></i></a></li>
                    <li class="list-inline-item"><a href="..."><i class='fab fa-twitter'></i></a></li>
                    <li class="list-inline-item"><a href="https://github.com/JivusAyrus"><i class='fab fa-github'></i></a></li>
                    <li class="list-inline-item"><a href="https://www.instagram.com/vineetkgb"><i class='fab fa-instagram'></i></a></li>
                    <li class="list-inline-item"><a href="..."><i class="fa fa-info-circle"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </section> 
            </div>
        )
    }
}

export default Footer

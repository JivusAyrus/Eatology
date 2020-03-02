import React, { Component } from 'react'
import '../Css/Footer.css'
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
                    <li><a href="..."><i class="fa fa-angle-double-right"></i>Home</a></li>
                    <li><a href="..."><i class="fa fa-angle-double-right"></i>Search Food</a></li>
                    <li><a href="..."><i class="fa fa-angle-double-right"></i>Favorites</a></li>
                    <li><a href="..."><i class="fa fa-angle-double-right"></i>Profile</a></li>
                    <li><a href="..."><i class="fa fa-angle-double-right"></i>Contact Us</a></li>
                  </ul>
                </div>
                <div class="col-lg-6"></div>
                <div class="col-lg-3">
                <h5>Quick links</h5>
                <ul class="list-unstyled quick-links">
                  <li><a href="..."><i class="fa fa-angle-double-right"></i>Company Home</a></li>
                  <li><a href="..."><i class="fa fa-angle-double-right"></i>Add Job</a></li>
                  <li><a href="..."><i class="fa fa-angle-double-right"></i>Search Employee</a></li>
                  <li><a href="..."><i class="fa fa-angle-double-right"></i>Courses</a></li>
                  <li><a href="..."><i class="fa fa-angle-double-right"></i>About Us</a></li>
                </ul>
                </div>
              </div><br/>
              <div class="row">
                <div class="col-lg-12">
                  <ul class="list-unstyled list-inline social text-center">
                    <li class="list-inline-item"><a href="https://www.facebook.com/suvij.surya"><i class='fab fa-facebook-square'></i></a></li>
                    <li class="list-inline-item"><a href="..."><i class='fab fa-twitter'></i></a></li>
                    <li class="list-inline-item"><a href="..."><i class='fab fa-github'></i></a></li>
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

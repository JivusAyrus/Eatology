import React, { Component } from 'react'
import '../Css/Card.css'
import $ from "jquery";
export class Card extends Component {
    componentDidMount() {
        $(document).ready(function () {
            $('.heart').on('click', function () {
                $('.heart').toggleClass('heartactive');
            });
        });
    }
    render() {
        return (
            <div>
                <div class="custcar">
                    <img src={require('./a.jpg')} class="card-img-top" alt="..." width="300" height="200"/>
                    <p class="car-title inline">Maggie<a className="heart"><i class="fa fa-heart-o" aria-hidden="true"></i></a></p>
                </div>
            </div>
        )
    }
}

export default Card

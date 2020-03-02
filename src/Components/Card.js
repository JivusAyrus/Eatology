import React, { Component } from 'react'
import '../Css/Card.css'
import $ from "jquery";
export class Card extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            title : props.title,
            img: props.img
            //var element = document.create
        }
    }

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
                    <img src= {this.state.img} class="card-img-top" alt="..." width="300" height="200"/>
                    <p class="car-title inline">{this.state.title}<a className="heart"><i class="fa fa-heart-o" aria-hidden="true"></i></a></p>
                </div>
            </div>
        )
    }
}

export default Card

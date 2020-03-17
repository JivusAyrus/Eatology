import React, { Component } from 'react'
import '../Css/Card.css'
import $ from "jquery";
export class Card extends Component {

    constructor(props) {
        super(props)
        this.heart = this.heart.bind(this);
        this.state = {
            recipe:props.recipe_info,
            isFavorite:false,
            //var element = document.create
        }
    }
    heart() {
        this.setState(state => ({
          isFavorite:!this.state.isFavorite
        }
        ));

        if(this.state.isFavorite){
            //add to favs
            
        }
        else{
            //remove from favs
        }
        
    }
    render() {
        return (
            <div>
                <div class="custcar">
                    <img src= {this.state.recipe.image ==null?"https://www.transparentpng.com/thumb/food/Ha2HDD-food-cut-out-png.png":this.state.recipe.image} class="card-img-top" alt="..." width="300" height="200"/>
                    <p class="car-title inline">{this.state.recipe.title}</p><div><i  onClick={this.heart} class={this.state.isFavorite?"heart fa fa-heart":" heart fa fa-heart-o"}></i></div>
                </div>
            </div>
        )
    }
}

export default Card

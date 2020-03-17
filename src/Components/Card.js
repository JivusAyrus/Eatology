import React, { Component } from 'react'
import '../Css/Card.css'
import $ from "jquery";
export class Card extends Component {

    constructor(props) {
        super(props)
        this.heart = this.heart.bind(this);
        var user = JSON.parse(sessionStorage.getItem('user'))
        if (user != null) {
            var added = false
            if (user.favourites.includes(props.recipe_info.id.toString())) {
                added = true
                console.log("DETECTED!")
            }
        }
        this.state = {
            recipe: props.recipe_info,
            isFavorite: added,
            //var element = document.create
        }
    }
    heart() {

        if (sessionStorage.getItem('user') == null) {
            alert('Please login first')
        }
        else {
            this.setState(state => ({
                isFavorite: !this.state.isFavorite
            }
            ));
            if (this.state.isFavorite) {
                //remove from favs (because is favourite will become false in the next render)

            }
            else {
                //add to favs (because is favourite will become true in the next render)
                $.ajax({
                    type: "post",
                    url: "http://localhost:5000/users/update/add-favourite/" + JSON.parse(sessionStorage.getItem('user'))._id,
                    dataType: "json",
                    data: JSON.stringify({ favourite: this.state.recipe.id }),
                    processData: false,                     //Assigns the data to post request body and not url
                    contentType: "application/json",
                    success: (data, status, jqXHR) => {
                        console.log(data);
                    },
                    error: (jqXHR, status, err) => {
                        console.log(jqXHR);
                    },

                });
            }
        }

    }
    render() {
        return (
            <div>
                <div class="custcar">
                    <img src={this.state.recipe.image == null ? "https://www.transparentpng.com/thumb/food/Ha2HDD-food-cut-out-png.png" : "https://spoonacular.com/recipeImages/" + this.state.recipe.image} class="card-img-top" alt="..." width="300" height="200" />
                    <p class="car-title inline">{this.state.recipe.title}</p><div><i onClick={this.heart} class={this.state.isFavorite ? "heart fa fa-heart" : " heart fa fa-heart-o"}></i></div>
                </div>
            </div>
        )
    }
}

export default Card

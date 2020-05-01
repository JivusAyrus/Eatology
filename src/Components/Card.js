import React, { Component } from 'react'
import '../Css/Card.css'
import $ from "jquery";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import {Link} from 'react-router-dom'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export class Card extends Component {

    constructor(props) {
        super(props)
        this.heart = this.heart.bind(this);
        this.searchhistory = this.searchhistory.bind(this);
        this.resolveImage = this.resolveImage.bind(this);
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
            isLoading:false
            //var element = document.create
        }
    }
    heart() {
        var that = this;
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
                this.setState({
                    isLoading:true
                })
                $.ajax({
                    type: "post",
                    url: "http://localhost:5000/users/update/remove-favourite/" + JSON.parse(sessionStorage.getItem('user'))._id,
                    dataType: "json",
                    data: JSON.stringify({ favourite: this.state.recipe.id }),
                    processData: false,                     //Assigns the data to post request body and not url
                    contentType: "application/json",
                    success: (data, status, jqXHR) => {
                        console.log(data);
                        sessionStorage.setItem('user', JSON.stringify(data))
                        that.setState({
                            isLoading:false
                        })
                        if(this.props.favpage){
                            window.location.reload()
                        }
                    },
                    error: (jqXHR, status, err) => {
                        console.log(jqXHR);
                        that.setState({
                            isLoading:false
                        })
                    },

                });

            }
            else {
                //add to favs (because is favourite will become true in the next render)
                this.setState({
                    isLoading:true
                })
                $.ajax({
                    type: "post",
                    url: "http://localhost:5000/users/update/add-favourite/" + JSON.parse(sessionStorage.getItem('user'))._id,
                    dataType: "json",
                    data: JSON.stringify({ favourite: this.state.recipe.id }),
                    processData: false,                     //Assigns the data to post request body and not url
                    contentType: "application/json",
                    success: (data, status, jqXHR) => {
                        console.log(data);
                        sessionStorage.setItem('user', JSON.stringify(data))
                        that.setState({
                            isLoading:false
                        })
                    },
                    error: (jqXHR, status, err) => {
                        console.log(jqXHR);
                        that.setState({
                            isLoading:false
                        })
                    },

                });
            }
        }

    }
    resolveImage(){
        if(this.state.recipe.image == undefined){
            var UpdatedRecipe = this.state.recipe
            UpdatedRecipe.image = "https://spoonacular.com/recipeImages/" + this.state.recipe.id +"-556x370.jpg"
            this.setState({
                recipe:UpdatedRecipe
            })
            return UpdatedRecipe.image
        }
        else if (this.state.recipe.image != undefined && this.state.recipe.image.startsWith("http")) {
            return this.state.recipe.image
        }
        else {
            return "https://spoonacular.com/recipeImages/" + this.state.recipe.image
        }
        
    }
    searchhistory(){
        $.ajax({
            type: "post",
            url: "http://localhost:5000/users/update/add-search-history/" + JSON.parse(sessionStorage.getItem('user'))._id,
            dataType: "json",
            data: JSON.stringify({ history_item: this.state.recipe.id }),
            processData: false,                     //Assigns the data to post request body and not url
            contentType: "application/json",
            success: (data, status, jqXHR) => {
                console.log(data);
                var user = JSON.parse(sessionStorage.getItem('user'))
                user.search_history = data.search_history
                sessionStorage.setItem('user',JSON.stringify(user))
            },
            error: (jqXHR, status, err) => {
                console.log(jqXHR);
            },

        });
    }
    render() {
        var imgUrl;
        if(this.state.isLoading){
            imgUrl = this.resolveImage()
            return (
                    <div class="custcar">
                        <img src={this.state.recipe.image == null ? "https://www.transparentpng.com/thumb/food/Ha2HDD-food-cut-out-png.png" : imgUrl} class="card-img-top" alt="..." width="300" height="200" />
                        <p class="car-title inline">{this.state.recipe.title}</p>
                        <div>
                            <PulseLoader
                            css={override}
                            size={10}
                            //size={"150px"} this also works
                            color={"red"}
                            loading="true"
                            />
                        </div>
                    </div>
            )
        }
        else{
            var imgUrl = this.resolveImage()
        return (
            <div class="custcar" onClick = {this.searchhistory}>
                <Link to={{
                    pathname:"/recipeinfo",
                    state:{
                        recipe:this.state.recipe
                    }
                }} >
                    <img src={this.state.recipe.image == null ? "https://www.transparentpng.com/thumb/food/Ha2HDD-food-cut-out-png.png" : imgUrl} class="card-img-top" alt="..." width="300" height="200" />
                    <p class="car-title inline">{this.state.recipe.title}</p>
                </Link>
                <div><i onClick={this.heart} class={this.state.isFavorite?"heart fa fa-heart":" heart fa fa-heart-o"}></i></div>
            </div>
        )
        }
    }
}

export default Card

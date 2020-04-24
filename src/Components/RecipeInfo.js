import React, { Component } from 'react'
import '../Css/RecipeInfo.css'
import $ from "jquery";
export class RecipeInfo extends Component {
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
             isFavorite:added,
             isLoading:false
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

    render() {
        return (
            <div>
                <img src="" alt="" width="100%" height="350px"/>
                <h3 class="rectitle"></h3>
                <p>
                    <i onClick={this.heart} class={this.state.isFavorite?"heart fa fa-heart":" heart fa fa-heart-o"}></i>
                    <i class="fa fa-share-alt" aria-hidden="true" style={{color:"red",fontSize:"20px"}}></i>
                </p>
                
            </div>
        )
    }
}

export default RecipeInfo

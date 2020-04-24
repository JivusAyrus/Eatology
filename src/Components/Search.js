import React, { Component } from 'react'
import '../Css/Search.css'
import $ from 'jquery'
import Card from './Card'
import ReactDOM from 'react-dom'

export class Search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             cards:[]
        }
    }
    
    render() {
        return (
            <div>
            <center>
                <form class="recsearch" style={{margin:"10px"}}>
                    <div class="card-body row no-gutters align-items-center">
                        <div class="col-auto"> 
                        </div>
                        <div class="col">
                            <input class="form-control form-control-lg searchinp" id="search" type="search" list="autocomplete"
                            placeholder="&#xF002; Search" style={{fontStyle:"italic",fontFamily:"FontAwesome"}} autoComplete="off"/>
                            <datalist id = "autocomplete"></datalist>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-lg btn-outline-primary searchbtn" type="submit">Search</button>
                        </div>
                    </div>
                </form>
            </center>
                    <div class="row" id="searchresult" children={this.state.cards}>
                    
                    </div>
                    
          
                
            </div>
        )
    }
    componentDidMount(){
        var that = this;
    $("#search").on("input", function(){
        $.ajax({
            type: "get",
            url: "https://api.spoonacular.com/recipes/autocomplete?number=4&apiKey=036d2ceeeb994c60b37c1b8d1694c643&query=" + $('#search').val(),
            dataType: "json",
            success: (data, status, jqXHR) => {
                console.log("Done")
                data.forEach(recipe =>{
                    $('#autocomplete').append('<option>'+recipe.title+'</option>')
                })
            },
            error: (jqXHR, status, err) => {
                console.log(jqXHR);
            },

        });
    });
    $('form').on("submit",function(event){
        $.ajax({
            type: "get",
            url: "https://api.spoonacular.com/recipes/search?number=10&apiKey=036d2ceeeb994c60b37c1b8d1694c643&query=" + $('#search').val(),
            dataType: "json",
            success: (data, status, jqXHR) => {
                var card = null
                var result = []
                data.results.forEach(recipe => {
                    console.log(recipe.title)
                     card = React.createElement('div', { class: "card-body" }, [
                        React.createElement(Card, { recipe_info: recipe })
                     ])
                     var cardRow = React.createElement('div', { class: "col-lg-3" }, card)
                     result.push(cardRow)
                })
                that.setState({
                    cards:result
                })
            },
            error: (jqXHR, status, err) => {
                console.log(jqXHR);
            },

        });
        event.preventDefault();
    });
    }
}

export default Search

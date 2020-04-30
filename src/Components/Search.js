import React, { Component } from 'react'
import '../Css/Search.css'
import $ from 'jquery'
import Card from './Card'
import ReactDOM from 'react-dom'

export class Search extends Component {
    constructor(props) {
        super(props)
        this.extraresult = this.extraresult.bind(this);
        this.state = {
            cards: [],
            offset:12
        }
    }

    render() {
        return (
            <div>
                <center>
                    <form class="recsearch" style={{ margin: "10px" }}>
                        <div class="card-body row no-gutters align-items-center">
                            <div class="col-auto">
                            </div>
                            <div class="col">
                                <input class="form-control form-control-lg searchinp" id="search" type="search" list="autocomplete"
                                    placeholder="&#xF002; Search" style={{ fontStyle: "italic", fontFamily: "FontAwesome" }} autoComplete="off" />
                                <datalist id="autocomplete"></datalist>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-lg btn-outline-primary searchbtn" type="submit">Search</button>
                            </div>
                        </div>
                    </form>
                </center>
                <div class="row" id="searchresult" children={this.state.cards}>

                </div>
                <h1 style={{color:"red",marginTop:"15px"}} id="searchtext">No more search results</h1>
                <button class="btn btn-outline-danger" id="extra" onClick={this.extraresult} style={{borderRadius:"100%",marginTop:"10px"}}><i class="fa fa-arrow-down" aria-hidden="true"></i></button>




            </div>
        )
    }
    componentDidMount() {
        var that = this;
        $('#searchtext').hide()
        $('#extra').hide()
        $("#search").on("input", function () {
            $.ajax({
                type: "get",
                url: "https://api.spoonacular.com/recipes/autocomplete?number=4&apiKey=" + process.env.REACT_APP_API_KEY + "&query=" +
                    $('#search').val(),
                dataType: "json",
                success: (data, status, jqXHR) => {
                    console.log("Done")
                    data.forEach(recipe => {
                        $('#autocomplete').append('<option>' + recipe.title + '</option>')
                    })
                },
                error: (jqXHR, status, err) => {
                    console.log(jqXHR);
                },

            });
        });
        $('form').on("submit", function (event) {
            that.setState({
                cards : [],
                offset:12
            })
            $('#searchtext').hide()
            $('#extra').show()
            $.ajax({
                type: "get",
                url: "https://api.spoonacular.com/recipes/search?number=12&apiKey=" + process.env.REACT_APP_API_KEY + "&query=" + $('#search').val(),
                dataType: "json",
                success: (data, status, jqXHR) => {
                    var card = null
                    var result = []
                    data.results.forEach(recipe => {
                        card = React.createElement('div', { class: "card-body" }, [
                            React.createElement(Card, { recipe_info: recipe })
                        ])
                        var cardRow = React.createElement('div', { class: "col-lg-3" }, card)
                        result.push(cardRow)
                    })
                    if(data.length< 12){
                        $('#extra').hide()
                        $('#searchtext').show()
                    }
                    console.log(" from search SIZE OF RESULT IS : " + result.length)
                    that.setState({
                        cards: result
                    })
                },
                error: (jqXHR, status, err) => {
                    console.log(jqXHR);
                },

            });
            event.preventDefault();
        });
    }
    extraresult(){
        var that = this;
        var result = this.state.cards
        that.setState({
            offset:that.state.offset + 12,
        })
        $.ajax({
            type: "get",
            url: "https://api.spoonacular.com/recipes/search?number=12&apiKey=" + process.env.REACT_APP_API_KEY + "&query=" 
                + $('#search').val() + "&offset=" + this.state.offset,
            dataType: "json",
            success: (data, status, jqXHR) => {
                var card = null
                data.results.forEach(recipe => {
                    card = React.createElement('div', { class: "card-body" }, [
                        React.createElement(Card, { recipe_info: recipe })
                    ])
                    var cardRow = React.createElement('div', { class: "col-lg-3" }, card)
                    result.push(cardRow)
                    if(data.length< 12){
                        $('#extra').hide()
                        $('#searchtext').show()
                    }
                })
                console.log("SIZE OF RESULT IS : " + result.length)
                that.setState({
                    cards: result
                })
            },
            error: (jqXHR, status, err) => {
                console.log(jqXHR);
            },

        });
    }
}

export default Search

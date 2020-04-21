import React, { Component } from 'react'
import Card from './Card'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Link
} from "react-router-dom";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export class Favorite extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    var api = "https://api.spoonacular.com/recipes/informationBulk/?apiKey=036d2ceeeb994c60b37c1b8d1694c643&ids="
    var user = JSON.parse(sessionStorage.getItem("user"))
    if (user) {
      fetch(api + user.favourites.toString())
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            if (result.status == undefined) {
              this.setState({
                isLoaded: true,
                items: result
              });
            }
            else if(result.status == "failure"){
              this.setState({
                isLoaded : true
              });
            }
          }
          ,
          //036d2ceeeb994c60b37c1b8d1694c643
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: false,
              error
            });
          }
        )
    }
  }

  render() {
    var user = JSON.parse(sessionStorage.getItem("user"))
    if (user) {
      if (this.state.isLoaded) {
        var cards = []
        var cardRow
        console.log("LENGTH OF FAVOURITES IS " + this.state.items.length)
        if (this.state.items.length == 0) {
          return (
            <div style={{ marginTop: "30px" }}>
              <img src="https://www.transparentpng.com/thumb/food/Ha2HDD-food-cut-out-png.png" alt="logo" width="100px" height="100px" />
              <h1 style={{ color: "red" }}>No favourites yet</h1>
            </div>
          )
        }
        else {
          this.state.items.forEach(recipe => {
            var card = React.createElement('div', { class: "card-body" }, [
              React.createElement(Card, { recipe_info: recipe })
            ])
            cardRow = React.createElement('div', { class: "col-lg-3" }, card)
            cards.push(cardRow)
          })
          var cardRoot = React.createElement('div', { class: "row" }, cards)
          var refreshlogo = React.createElement('i', { class: "fa fa-refresh", ariaHidden: "true" })
          var refreshbtn = React.createElement('button', { class: "btn btn-outline-danger", style: { marginTop: "10px", borderRadius: "100%" }, onClick: () => window.location.reload() }, refreshlogo)
          var favpage = React.createElement('div', {}, refreshbtn, cardRoot)
          return favpage
        }
      }
      else
        return (
          <div className="sweet-loading">
            <ClipLoader
              css={override}
              size={100}
              //size={"150px"} this also works
              color={"#123abc"}
              loading="true"
            />
            <br />
          </div>
        )
    }
    else {
      return (
        <div style={{ marginTop: "30px" }}>
          <img src="https://www.transparentpng.com/thumb/food/Ha2HDD-food-cut-out-png.png" alt="logo" width="100px" height="100px" />
          <h1 style={{ color: "red" }}>Please Login first!!</h1>
          <h3 style={{ color: "red" }}>Click here to <u><Link to="/login" style={{ color: "red" }}>Login</Link></u></h3>
        </div>
      )
    }
  }
}

export default Favorite

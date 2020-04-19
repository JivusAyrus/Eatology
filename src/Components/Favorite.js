import React, { Component } from 'react'
import Card from './Card'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

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
      items: {}
    }
  }

  componentDidMount() {
    var api = "https://api.spoonacular.com/recipes/informationBulk/?apiKey=036d2ceeeb994c60b37c1b8d1694c643&ids="
    var user = JSON.parse(sessionStorage.getItem("user"))
    fetch(api + user.favourites.toString())
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
          });
        },
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

  render() {

    if (this.state.isLoaded) {
      var cards = []
      var cardRow
      this.state.items.forEach(recipe => {
        var card = React.createElement('div', { class: "card-body" }, [
          React.createElement(Card, { recipe_info: recipe })
        ])
        cardRow = React.createElement('div', { class: "col-lg-3" }, card)
        cards.push(cardRow)
      })
      var cardRoot = React.createElement('div', { class: "row" }, cards)
      var refreshbtn = React.createElement('button',{class:"btn btn-outline-danger"},"Refresh")
      var favpage = React.createElement('div',{},cardRoot,refreshbtn)
      return favpage
    }
    else return (
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
}

export default Favorite

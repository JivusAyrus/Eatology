import React, { Component } from 'react'
import Card from './Card'
import '../Css/Cardrow.css'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export class Cardrow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    }
  }
  componentDidMount() {
    // fetch("https://api.spoonacular.com/recipes/random?number=10&apiKey=036d2ceeeb994c60b37c1b8d1694c643")
    // .then(res => res.json())
    // .then(
    //   (result) => {
    //     console.log(result)
    //     this.setState({
    //       isLoaded: true,
    //       items: result.recipes
    //     });
    //   },
    //   //036d2ceeeb994c60b37c1b8d1694c643
    //   // Note: it's important to handle errors here
    //   // instead of a catch() block so that we don't swallow
    //   // exceptions from actual bugs in components.
    //   (error) => {
    //     this.setState({
    //       isLoaded: false,
    //       error
    //     });
    //   }
    // )

    var temp = [
      {
        "title": "Maggie",
        "image": null
      },
      {
        "title": "Maggie",
        "image": null
      },
      {
        "title": "Maggie",
        "image": null
      },
      {
        "title": "Maggie",
        "image": null
      },
    ]

    this.setState({
      isLoaded: true,
      items: temp
    });
  }
  render() {

    var cards = []
    if (this.state.isLoaded == true) {
      console.log(this.state.items)
      this.state.items.forEach(recipe => {
        console.log(recipe.title)
        cards.push(React.createElement('div', { class: "card-body" }, [
          React.createElement(Card, { title: recipe.title, img: recipe.image })

        ]))
      });

      var CardsElement = React.createElement('div', { class: "d-flex flex-row flex-nowrap" }, cards)
      var CardRowRoot = React.createElement('div', { class: 'cardrow', style: { overflowX: 'scroll', msOverflowStyle: 'none' } }, CardsElement)
      return CardRowRoot
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

export default Cardrow

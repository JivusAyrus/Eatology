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
      items: {},
      url: "https://api.spoonacular.com/recipes/" + props.endpoint
    }
  }
  componentDidMount() {
    console.log(this.state.url)
    fetch(this.state.url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          if (result.recipes != undefined) {
            this.setState({
              isLoaded: true,
              items: result.recipes
            });
          }
          else {
            this.setState({
              isLoaded: true,
              items: result
            });
          }
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

    // var temp = [
    //   {
    //     "title": "Maggie",
    //     "image": null
    //   },
    //   {
    //     "title": "Maggie",
    //     "image": null
    //   },
    //   {
    //     "title": "Maggie",
    //     "image": null
    //   },
    //   {
    //     "title": "Maggie",
    //     "image": null
    //   },
    // ]

    // this.setState({
    //   isLoaded: true,
    //   items: temp
    // });
  }
  render(props) {

    var cards = []
    if (this.state.isLoaded == true) {
      this.state.items.forEach(recipe => {
        cards.push(React.createElement('div', { class: "card-body" }, [
          React.createElement(Card, { recipe_info: recipe })

        ]))
      });
      // var heading = React.createElement('h3',{style:{color:"red",float:"left"}},this.props.title)
      // var linebreak = React.createElement('br')
      var CardsElement = React.createElement('div', { class: "d-flex flex-row flex-nowrap" }, cards)
      var CardRowRoot = React.createElement('div', { class: 'cardrow', style: { overflowX: 'scroll', msOverflowStyle: 'none' } }, CardsElement)
      return CardRowRoot
    }
    else {
      var tempCards = []
      // for (var i = 0; i < 10; i++) {
      //   tempCards.push(React.createElement('div', { class: "card-body" }, [
      //     React.createElement(Card, { recipe_info: { title: "" } })

      //   ]))
      // }
      // var TempCardsElement = React.createElement('div', { class: "d-flex flex-row flex-nowrap" }, tempCards)
      // var TempCardRowRoot = React.createElement('div', { class: 'cardrow', style: { overflowX: 'scroll', msOverflowStyle: 'none' } }, TempCardsElement)
      return (<div className="cardrow" style={{ overflowX: 'scroll', msOverflowStyle: 'none' }}>
        <div className="d-flex flex-row flex-nowrap">
          <div className="card-body">
          <Card recipe_info={{title : ""}}></Card>
          </div>
          <div className="card-body">
          <Card recipe_info={{title : ""}}></Card>
          </div>
          <div className="card-body">
          <Card recipe_info={{title : ""}}></Card>
          </div>
          <div className="card-body">
          <Card recipe_info={{title : ""}}></Card>
          </div>
          <div className="card-body">
          <Card recipe_info={{title : ""}}></Card>
          </div>
          <div className="card-body">
          <Card recipe_info={{title : ""}}></Card>
          </div>
          <div className="card-body">
          <Card recipe_info={{title : ""}}></Card>
          </div>
          <div className="card-body">
          <Card recipe_info={{title : ""}}></Card>
          </div>
          <div className="card-body">
          <Card recipe_info={{title : ""}}></Card>
          </div>
          <div className="card-body">
          <Card recipe_info={{title : ""}}></Card>
          </div>
        </div>
      </div>
      )
      // <div className="sweet-loading">
      //   <ClipLoader
      //     css={override}
      //     size={100}
      //     //size={"150px"} this also works
      //     color={"#123abc"}
      //     loading="true"
      //   />
      //   <br />
      // </div>


    }
  }
}

export default Cardrow

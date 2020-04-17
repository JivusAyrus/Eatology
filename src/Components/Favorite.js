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
        var api="https://api.spoonacular.com/recipes/informationBulk/?apiKey=036d2ceeeb994c60b37c1b8d1694c643&ids="
        this.state = {
            isLoaded:false,
            items:{}
        }
    }

    componentDidMount() {
        var user = JSON.parse(sessionStorage.getItem("user"))
        fetch(this.api+user.favourites.toString())
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            this.setState({
              isLoaded: true,
              items: result.results
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
        
        if(this.state.isLoaded){
            var cards=[]
            this.state.items.forEach(recipe => {
                cards.push(React.createElement('div', { class: "card-body" }, [
                    React.createElement(Card, { recipe_info: recipe})
                ]))
            })
            var cardRow = React.createElement('div',{class:"col-lg-4"},cards)
            var cardRoot = React.createElement('div',{class:"row"},cardRow)
            return cardRoot
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

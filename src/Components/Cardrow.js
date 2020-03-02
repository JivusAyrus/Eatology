import React, { Component } from 'react'
import Card from './Card'
import '../Css/Cardrow.css'
export class Cardrow extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            error: null,
            isLoaded: false,
            items: [] 
        }
    }
    componentDidMount() {
        fetch("https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert&apiKey=036d2ceeeb994c60b37c1b8d1694c643")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.items
              });
            },
            //036d2ceeeb994c60b37c1b8d1694c643
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    render() {
        return (
            <div class="cardrow" style={{overflowX:"scroll",msOverflowStyle:"none"}}>
            
    
    <div class="d-flex flex-row flex-nowrap" >
        <div class="card-body"><Card/></div>
        <div class="card-body"><Card/></div>
        <div class="card-body"><Card/></div>
        <div class="card-body"><Card/></div>
        <div class="card-body"><Card/></div>
        <div class="card-body"><Card/></div>
        <div class="card-body"><Card/></div>
        <div class="card-body"><Card/></div>
        <div class="card-body"><Card/></div>
        <div class="card-body"><Card/></div>
        
    
</div>
            
        
            </div>
        )
    }
}

export default Cardrow

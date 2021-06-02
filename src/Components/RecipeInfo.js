import React, { Component } from 'react'
import '../Css/RecipeInfo.css'
import Cardrow from './Cardrow'
import $ from "jquery";
import {withRouter} from 'react-router-dom'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
export class RecipeInfo extends Component {
    constructor(props) {
        super(props)
        const {location} = props 
        console.log(location)
        this.heart = this.heart.bind(this);
        this.getIngredientsList = this.getIngredientsList.bind(this);
        var user = JSON.parse(sessionStorage.getItem('user'))
        if (user != null) {
            var added = false
            if (user.favourites.includes(location.state.recipe.id.toString())) {
                added = true
                console.log("DETECTED!")
            }
        }
        this.state = {
             isFavorite:added,
             recipe:location.state.recipe,
             isLoaded:false,
             ingredients:[],
             instructions:[]
        }
    }
    componentDidMount(){
        var that = this;
        
        if(this.state.recipe.nutrition != undefined){
            $.ajax({
                type: "get",
                url: "https://api.spoonacular.com/recipes/"+this.state.recipe.id+"/ingredientWidget.json?apiKey=" + process.env.REACT_APP_API_KEY,
                dataType: "json",
                success: (data, status, jqXHR) => {
                    that.setState({
                        ingredients:data.ingredients
                    })
                    $.ajax({
                        type: "get",
                        url: "https://api.spoonacular.com/recipes/"+this.state.recipe.id+"/analyzedInstructions?apiKey=" + process.env.REACT_APP_API_KEY,
                        dataType: "json",
                        success: (data, status, jqXHR) => {
                            that.setState({
                                isLoaded:true,
                                instructions:data
                            })
                            // this.getIngredientsList()
                        },
                        error: (jqXHR, status, err) => {
                            console.log(jqXHR);
                        },
        
                    });
                },
                error: (jqXHR, status, err) => {
                    console.log(jqXHR);
                },
            });
        }
        else{
            $.ajax({
                type: "get",
                url: "https://api.spoonacular.com/recipes/"+this.state.recipe.id+"/information?includeNutrition=true&apiKey=" + process.env.REACT_APP_API_KEY,
                dataType: "json",
                success: (data, status, jqXHR) => {
                    that.setState({
                        recipe:data
                    })
                    $.ajax({
                        type: "get",
                        url: "https://api.spoonacular.com/recipes/"+this.state.recipe.id+"/ingredientWidget.json?apiKey=" + process.env.REACT_APP_API_KEY,
                        dataType: "json",
                        success: (data, status, jqXHR) => {
                            that.setState({
                                ingredients:data.ingredients
                            })
                            $.ajax({
                                type: "get",
                                url: "https://api.spoonacular.com/recipes/"+this.state.recipe.id+"/analyzedInstructions?apiKey=" + process.env.REACT_APP_API_KEY,
                                dataType: "json",
                                success: (data, status, jqXHR) => {
                                    that.setState({
                                        isLoaded:true,
                                        instructions:data
                                    })
                                    // this.getIngredientsList()
                                },
                                error: (jqXHR, status, err) => {
                                    console.log(jqXHR);
                                },
                
                            });
                        },
                        error: (jqXHR, status, err) => {
                            console.log(jqXHR);
                        },
        
                    });
                },
                error: (jqXHR, status, err) => {
                    console.log(jqXHR);
                },
            });
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
                
                $.ajax({
                    type: "post",
                    url: process.env.REACT_APP_SERVER + "/users/update/remove-favourite/" + JSON.parse(sessionStorage.getItem('user'))._id,
                    dataType: "json",
                    data: JSON.stringify({ favourite: this.state.recipe.id }),
                    processData: false,                     //Assigns the data to post request body and not url
                    contentType: "application/json",
                    success: (data, status, jqXHR) => {
                        console.log(data);
                        sessionStorage.setItem('user', JSON.stringify(data))
                        if(this.props.favpage){
                            window.location.reload()
                        }
                    },
                    error: (jqXHR, status, err) => {
                        console.log(jqXHR);
                    },
                });
            }
            else {
                //add to favs (because is favourite will become true in the next render)
                $.ajax({
                    type: "post",
                    url: process.env.REACT_APP_SERVER + "/users/update/add-favourite/" + JSON.parse(sessionStorage.getItem('user'))._id,
                    dataType: "json",
                    data: JSON.stringify({ favourite: this.state.recipe.id }),
                    processData: false,                     //Assigns the data to post request body and not url
                    contentType: "application/json",
                    success: (data, status, jqXHR) => {
                        console.log(data);
                        sessionStorage.setItem('user', JSON.stringify(data))
                    },
                    error: (jqXHR, status, err) => {
                        console.log(jqXHR);
                    },
                });
            }
        }
    }
    getIngredientsList(){
        var ingredients = []
        this.state.ingredients.forEach( i => {
            var image = React.createElement('img',{style:{borderRadius:"100%",width:"100px",height:"100px"},src:"https://spoonacular.com/cdn/ingredients_100x100/"+ i.image})
            var title = React.createElement('h3',{},i.name[0].toUpperCase()+i.name.slice(1))
            var amount = React.createElement('h4',{},i.amount.us.value+" "+i.amount.us.unit)
            var ingrediv = React.createElement('div',{class:"col-lg-3 col-md-3 col-sm-3 col-xs-3"},image,title,amount)
            ingredients.push(ingrediv)
        })
        return ingredients
    }
    getEquipmentsList(){
        var equipments = []
        var names = []
        for(var i=0;i<this.state.instructions.length;i++){
            for(var j=0;j<this.state.instructions[i].steps.length;j++){
                    if(this.state.instructions[i].steps[j].equipment.length != 0){
                        this.state.instructions[i].steps[j].equipment.forEach(e => {
                            if(names.includes(e.name[0].toUpperCase()+e.name.slice(1))){
                                return
                            }
                            else{
                                var image = React.createElement('img',{style:{borderRadius:"100%",width:"100px",height:"100px"},src:"https://spoonacular.com/cdn/equipment_500x500/" + e.image})
                                var title = React.createElement('h3',{},e.name[0].toUpperCase()+e.name.slice(1))
                                var equidiv = React.createElement('div',{class:"col-lg-3 col-md-3 col-sm-3 col-xs-3"},image,title)
                                equipments.push(equidiv)
                                names.push(e.name[0].toUpperCase()+e.name.slice(1))
                            }
                            
                        })
                    } 
            }
        }
        return equipments
    }
    getStepsList(){
        var steps = []
        for(var i=0;i<this.state.instructions.length;i++){
            this.state.instructions[i].steps.forEach(s =>{
                var step = React.createElement('li',{},s.step[0].toUpperCase()+s.step.slice(1))
                steps.push(step)
            })
        }
        return steps
    }
    getDishTypesList(){
        var dishes = []
        for(var i=0;i<this.state.recipe.dishTypes.length;i++){
            var dish = React.createElement('li',{class:"col-lg-3 col-md-3 col-sm-3 col-xs-3"},this.state.recipe.dishTypes[i])
            dishes.push(dish)
        }
        return dishes
    }
    getNutritionList(){
        var nutrients = []
        this.state.recipe.nutrition.nutrients.forEach(n=>{
            var nutrient = React.createElement('li',{class:"col-lg-3 col-md-3 col-sm-3 col-xs-3"},n.title + "-" + n.amount + n.unit)
            nutrients.push(nutrient)
        })
        return nutrients
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
    render() {
        if(this.state.isLoaded){
        var recipe = this.state.recipe
        var imageUrl = this.resolveImage()
        return (
            <div>
                <div class="row">
                    <p class="rectitle">{recipe.title}</p>
                </div>
                <div class="row">
                    <div class="imagediv col-lg-8 col-sg-8 col-mg-8">
                        <img src={imageUrl == null ? "https://www.transparentpng.com/thumb/food/Ha2HDD-food-cut-out-png.png" : imageUrl} height="500px" alt="" class="imagefade"/>
                    </div>
                    <div class="col-lg-4">
                        <div class="info">
                            <p>Serving : {recipe.servings}</p>
                            <p>Time Required : {recipe.readyInMinutes} min</p>
                            <p>Health Score : {recipe.spoonacularScore}/100</p>   
                            <p>Eatology Score : {recipe.healthScore}/100</p>
                        </div>                
                    </div>
                </div>
                <div class="row">
                <div class="favgroup">
                    <div class="favinfo"><i onClick={this.heart} class={this.state.isFavorite?"heart fa fa-heart":" heart fa fa-heart-o"} style={{color:"red",fontSize:"30px"}}></i></div>
                    <div class="favinfo">
                        <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" width="30px" height="30px" style={{borderRadius:"100%"}}/>
                    </div>
                    <div class="favinfo"><i class="fa fa-print" aria-hidden="true" style={{color:"red",fontSize:"31px"}} onClick= {()=>{window.print()}}></i></div>
                </div>
                </div>
                <div class="separator" align="left">Ingredients</div><br/><br/>
                <div class="row ingre" children={this.getIngredientsList()}></div>
                {this.getEquipmentsList().length != 0?
                    <div>
                        <div class="separator" align="left">Equipment</div><br/><br/>
                        <div class="row ingre" children={this.getEquipmentsList()}></div>
                    </div>:<br/>
                }
                <div class="separator" align="left">Steps</div><br/><br/>
                <ol children={this.getStepsList()} class="steps"></ol>
                {this.getDishTypesList().length != 0?
                    <div>
                        <div class="separator" align="left">Dish Type</div><br/><br/>
                        <ul class="row dish" children={this.getDishTypesList()}></ul>
                    </div>:<br/>
                }
                <div class="separator" align="left">Nutrition</div><br/><br/>
                <ul children={this.getNutritionList()} class=" row nutri"></ul>
                <div class="separator" align="left">Similar Recipes</div><br/>
                <Cardrow endpoint={recipe.id+"/similar?number=8&apiKey=" + process.env.REACT_APP_API_KEY }/>
                
                
                
                
            </div>
        )
        }
        else{
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
    }
}
export default withRouter(RecipeInfo)

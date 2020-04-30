import React, { Component } from 'react'
import ControlledCarousel from './ControlledCarousel'
import Cardrow from './Cardrow'
import '../Css/HomePage.css'
import $ from 'jquery'
export class HomePage extends Component {



    render() {

        var user = JSON.parse(sessionStorage.getItem('user'))
        if (user) {
            // var favids = []
            // if(user.favourites.length >=4){
            //     for(var i=0;i<4;i++){
            //         favids.push(user.favourites[Math.trunc(Math.random(user.favourites.length)*10)])
            //     }
            // }
            // else {
            //     favids = user.favourites
            // }
            var endpoint1 = ""
            var endpoint2 = ""
            var endpoint4 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=vegetarian"
            var endpoint5 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=main course"
            var endpoint6 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=gluten free"
            var endpoint7 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=desserts"
            if (user.pref_cuisines.length == 0) {
                endpoint1 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=indian"
            }
            else {
                endpoint1 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=" + JSON.stringify(user.pref_cuisines)
            }
            if (user.favourites.length == 0) {
                endpoint2 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + ""
            }
            else
                endpoint2 = user.favourites[user.favourites.length - 1] + "/similar?number=10&apiKey=" + process.env.REACT_APP_API_KEY + ""
            return (
                <div class="recipelist">
                    <ControlledCarousel id = "banner"/>
                    <br />
                    <h3 style={{ color: "red", float: "left" }}><u>Based on favourite cusines -></u></h3>
                    <br /><br />
                    <Cardrow title="Based on favourite cusines" endpoint={endpoint1} />
                    <br />
                    <h3 style={{ color: "red", float: "left" }}><u>{user.favourites.length == 0 ? "Try something new ->" : "Based on your favourite recipes ->"}</u></h3>
                    <br /><br />
                    <Cardrow title={user.favourites.length == 0 ? "Try something new" : "Based on your favourite recipes"} endpoint={endpoint2} />
                    <br />

                    <Cardrow title="Hand picked for you" endpoint="" />
                    <br />

                    <h3 style={{ color: "red", float: "left" }}><u>Vegetarian recipes -></u></h3>
                    <br /> <br />
                    <Cardrow title="Vegetarian recipes" endpoint={endpoint4} />
                    <br />
                    <h3 style={{ color: "red", float: "left" }}><u>Main Course-></u></h3>
                    <br /> <br />
                    <Cardrow title="Main Course" endpoint={endpoint5} />
                    <br />
                    <h3 style={{ color: "red", float: "left" }}><u>Gluten Free recipes -></u></h3>
                    <br /> <br />
                    <Cardrow title="Gluten Free recipes" endpoint={endpoint6} />
                    <br />
                    <h3 style={{ color: "red", float: "left" }}><u>Desserts -></u></h3>
                    <br /> <br />
                    <Cardrow title="Desserts" endpoint={endpoint7} />
                    <br />

                </div>
            )
        }
        else {
            var endpoint4 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=vegetarian"
            var endpoint5 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=main course"
            var endpoint6 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=gluten free"
            var endpoint7 = "random?number=10&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=desserts"
            return (
                <div class="recipelist">
                    <ControlledCarousel id = "banner"/>
                    <br />
                    <h3 style={{ color: "red", float: "left" }}><u>Vegetarian recipes -></u></h3>
                    <br /><br />
                    <Cardrow title="Vegetarian recipes" endpoint={endpoint4} />

                    <h3 style={{ color: "red", float: "left" }}><u>Main Course-></u></h3>
                    <br /><br />
                    <Cardrow title="Main Course" endpoint={endpoint5} />
                    <br />
                    <h3 style={{ color: "red", float: "left" }}><u>Gluten Free recipes -></u></h3>
                    <br /><br />
                    <Cardrow title="Gluten Free recipes" endpoint={endpoint6} />
                    <br />
                    <h3 style={{ color: "red", float: "left" }}><u>Desserts -></u></h3>
                    <br /><br />
                    <Cardrow title="Desserts" endpoint={endpoint7} />
                    <br />
                </div>


            )
        }
    }
}

export default HomePage

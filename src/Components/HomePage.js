import React, { Component } from 'react'
import ControlledCarousel from './ControlledCarousel'
import Cardrow from './Cardrow'
import '../Css/HomePage.css'
import $ from 'jquery'
export class HomePage extends Component {



    render() {
        const size = 10;
        var user = JSON.parse(sessionStorage.getItem('user'))
        if (user) {
             var favids = ""
            // if(user.favourites.length >=4){
            //     for(var i=0;i<4;i++){
            favids = (user.favourites[Math.trunc(Math.random(user.favourites.length)*10)])
            //     }
            // }
            // else {
            //     favids = user.favourites
            // }
            var endpoint1 = ""
            var endpoint2 = ""
            var endpoint3 = ""
            var endpoint4 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=vegetarian"
            var endpoint5 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=main course"
            var endpoint6 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=gluten free"
            var endpoint7 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=desserts"
            if (user.pref_cuisines.length == 0) {
                endpoint1 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=indian"
            }
            else {
                endpoint1 = "search?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&cuisine=" + JSON.stringify(user.pref_cuisines.toString())
            }
            if (user.favourites.length == 0) {
                endpoint2 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + ""
            }
            else
                endpoint2 = user.favourites[user.favourites.length - 1] + "/similar?number="+size+"&apiKey=" + process.env.REACT_APP_API_KEY 
            if(user.search_history.length == 0){
                endpoint3 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + ""
            }
            else{
                endpoint3 = user.search_history[user.search_history.length - 1] + "/similar?number="+size+"&apiKey=" + process.env.REACT_APP_API_KEY 
            }
            return (
                <div>
                    <ControlledCarousel id = "banner"/>
                    <br />
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>Based on favourite cusines </h3>
                    <br /><br /><br />
                    <Cardrow title="Based on favourite cuisines" endpoint={endpoint1} />
                    <br />
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>{user.favourites.length == 0 ? "Try something new " : "Based on your favourite recipes "}</h3>
                    <br /><br /><br />
                    <Cardrow title={user.favourites.length == 0 ? "Try something new" : "Based on your favourite recipes"} endpoint={endpoint2} />
                    <br />
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>Hand picked for you </h3>
                    <br /><br /><br />
                    <Cardrow title="Hand picked for you" endpoint={endpoint3} />
                    <br />
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>Vegetarian recipes </h3>
                    <br /> <br /><br />
                    <Cardrow title="Vegetarian recipes" endpoint={endpoint4} />
                    <br />
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>Main Course</h3>
                    <br /> <br /><br />
                    <Cardrow title="Main Course" endpoint={endpoint5} />
                    <br />
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>Gluten Free recipes </h3>
                    <br /> <br /><br />
                    <Cardrow title="Gluten Free recipes" endpoint={endpoint6} />
                    <br />
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>Desserts </h3>
                    <br /> <br /><br />
                    <Cardrow title="Desserts" endpoint={endpoint7} />
                    <br />

                </div>
            )
        }
        else {
            var endpoint4 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=vegetarian"
            var endpoint5 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=main course"
            var endpoint6 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=gluten free"
            var endpoint7 = "random?number="+size+"&limitLicense=true&apiKey=" + process.env.REACT_APP_API_KEY + "&tags=desserts"
            return (
                <div >
                    <ControlledCarousel id = "banner"/>
                    <br />
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>Vegetarian recipes </h3>
                    <br /><br /><br />
                    <Cardrow title="Vegetarian recipes" endpoint={endpoint4} />
                    <br/>
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>Main Course</h3>
                    <br /><br /><br />
                    <Cardrow title="Main Course" endpoint={endpoint5} />
                    <br />
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>Gluten Free recipes </h3>
                    <br /><br /><br />
                    <Cardrow title="Gluten Free recipes" endpoint={endpoint6} />
                    <br />
                    <h3 class="recipelist" style={{ color: "red", float: "left" }}>Desserts </h3>
                    <br /><br /><br />
                    <Cardrow title="Desserts" endpoint={endpoint7} />
                    <br />
                </div>


            )
        }
    }
}

export default HomePage

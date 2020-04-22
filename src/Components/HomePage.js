import React, { Component } from 'react'
import ControlledCarousel from './ControlledCarousel'
import Cardrow from './Cardrow'
export class HomePage extends Component { 
    render() {
        var user = JSON.parse(sessionStorage.getItem('user'))
        // var favids = []
        // if(user.favourites.length >=4){
        //     for(var i=0;i<4;i++){
        //         favids.push(user.favourites[Math.trunc(Math.random(user.favourites.length)*10)])
        //     }
        // }
        // else {
        //     favids = user.favourites
        // }
        var endpoint1 = "random?number=10&limitLicense=true&apiKey=036d2ceeeb994c60b37c1b8d1694c643&tags=" + JSON.stringify(user.pref_cuisines)
        var endpoint2 = ""
        if(user.favourites.length==0){
            endpoint2 = "random?number=10&limitLicense=true&apiKey=036d2ceeeb994c60b37c1b8d1694c643"
        }
        else
            endpoint2 = user.favourites[user.favourites.length-1] +"/similar?number=10&apiKey=036d2ceeeb994c60b37c1b8d1694c643"
        return (
            <div>
                <ControlledCarousel/>
                <br/>
                <Cardrow title="Based on favourite cusines" endpoint={endpoint1}/>
                <br/>
                <Cardrow title={user.favourites.length==0?"Try something new":"Based on your favourite recipes" } endpoint={endpoint2}/>
                <br/>
                {/*
                <Cardrow title="Hand picked for you" endpoint=""/>
                <br/>
                <Cardrow title="Vegetarian recipes" endpoint="random"/>
                <br/>
                <Cardrow title="Non-Vegetarian recipes" endpoint="random"/>
                <br/>
                <Cardrow title="Desserts" endpoint="random"/>
                <br/>
                */}
            </div>
        )
    }
}

export default HomePage

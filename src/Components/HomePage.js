import React, { Component } from 'react'
import ControlledCarousel from './ControlledCarousel'
import Cardrow from './Cardrow'
export class HomePage extends Component { 
    render() {
        return (
            <div>
                <ControlledCarousel/>
                <br/>
                <Cardrow/>
                <br/>
                <Cardrow/>
            </div>
        )
    }
}

export default HomePage

import React, { Component } from 'react'
import $ from 'jquery'
import '../Css/Favcusine.css'
export class Favcusine extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
             
        }
    }
    componentDidMount(){
        $(document).ready(function () {
            $('#done').on('click',function(){
                $('#id01').toggleClass('active')
            })
        })
    }
    
    render() {
        
        return (
            <div id="id01" class="w3-modal" style={{display:"block",zIndex:"50"}}>
                <div class="w3-modal-content">
                    <div class="w3-container">
                        <p>Some text. Some text. Some text.</p>
                        <p>Some text. Some text. Some text.</p>
                        <button type="submit" class="btn btn-outline-danger" id="done">Done</button><br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Favcusine

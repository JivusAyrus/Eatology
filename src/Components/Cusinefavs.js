import React, { Component } from 'react'
import $ from 'jquery'
import '../Css/Cusinefavs.scss'
import {
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
export class Cusinefavs extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
             
        }
    }
    componentDidMount(){
        $(document).ready(function () {
            $('#add').on('click', function () {
                $('#mymodal').addClass('active');
            });
            $('#close').on('click', function () {
                $('#mymodal').removeClass('active');
            });
        })
    }
    
    render() {
        
        return (
            <div class="body">
            <div class="card" style={{ marginTop: "120px" }}>
                    <div class="card-body">
                        <form>
                            <p class="card-title">Eatology</p>
                            <p class="favhead">Hey {JSON.parse(sessionStorage.getItem('user')).username},</p>
                            <p class="favtex">Do you want to modify the page based on your tastes.
                            Then please give us your tastes by clicking the button below.</p>
                            <p class="addfav">
                                <button type="button" class="btn btn-ouline-danger" id="add">Add</button>
                                <Link to="/" style={{color:"red",display:"flex",marginBottom:"-20px"}}>Skip</Link>
                            </p>   
                            <div id="mymodal" class="modal">
                                <div class="modal-content">
                                    <h3 class="favtitle">Favourite Cusine Selection</h3>
                                    <div class="container">
                                    <ul class="ks-cboxtags">
                                        <li><input type="checkbox" id="checkboxOne" value="African"/><label for="checkboxOne">African</label></li>
                                        <li><input type="checkbox" id="checkboxTwo" value="American"/><label for="checkboxTwo">American</label></li>
                                        <li><input type="checkbox" id="checkboxThree" value="British" /><label for="checkboxThree">British</label></li>
                                        <li><input type="checkbox" id="checkboxFour" value="Cajun"/><label for="checkboxFour">Cajun</label></li>
                                        <li><input type="checkbox" id="checkboxFive" value="Caribbean"/><label for="checkboxFive">Caribbean</label></li>
                                        <li><input type="checkbox" id="checkboxSix" value="Chinese"/><label for="checkboxSix">Chinese</label></li>
                                        <li><input type="checkbox" id="checkboxSeven" value="Eastern European"/><label for="checkboxSeven">Eastern Europen</label></li>
                                        <li><input type="checkbox" id="checkboxEight" value="European"/><label for="checkboxEight">European</label></li>
                                        <li><input type="checkbox" id="checkboxNine" value="French"/><label for="checkboxNine">French</label></li>
                                        <li><input type="checkbox" id="checkboxTen" value="German"/><label for="checkboxTen">German</label></li>
                                        <li><input type="checkbox" id="checkboxEleven" value="Greek"/><label for="checkboxEleven">Greek</label></li>
                                        <li><input type="checkbox" id="checkboxTweleve" value="Indian"/><label for="checkboxTwelve">Indian</label></li>
                                        <li><input type="checkbox" id="checkboxThirteen" value="Irish"/><label for="checkboxThirteen">Irish</label></li>
                                        <li><input type="checkbox" id="checkboxFourteen" value="Italian"/><label for="checkboxFourteen">Italian</label></li>
                                        <li><input type="checkbox" id="checkboxFifteen" value="Japanese"/><label for="checkboxFifteen">Japanese</label></li>
                                        <li><input type="checkbox" id="checkboxSixteen" value="Jewish"/><label for="checkboxSixteen">Jewish</label></li>
                                        <li><input type="checkbox" id="checkboxSeventeen" value="Korean"/><label for="checkboxSeventeen">Korean</label></li>
                                        <li><input type="checkbox" id="checkboxEighteen" value="Latin American"/><label for="checkboxEighteen">Latin American</label></li>
                                        <li><input type="checkbox" id="checkboxNinteen" value="Mediterranean"/><label for="checkboxNinteen">Mediterranean</label></li>
                                        <li><input type="checkbox" id="checkboxTwenty" value="Mexican"/><label for="checkboxTwenty">Mexican</label></li>
                                        <li><input type="checkbox" id="checkboxTwentyone" value="Middle Eastern"/><label for="checkboxTwentyone">Middle Eastern</label></li>
                                        <li><input type="checkbox" id="checkboxTwentytwo" value="Nordic"/><label for="checkboxTwentytwo">Nordic</label></li>
                                        <li><input type="checkbox" id="checkboxTwentythree" value="Southern"/><label for="checkboxTwentythree">Southern</label></li>
                                        <li><input type="checkbox" id="checkboxTwentyfour" value="Spanish"/><label for="checkboxTwentyfour">Spanish</label></li>
                                        <li><input type="checkbox" id="checkboxTwentyfive" value="Thai"/><label for="checkboxTwentyfive">Thai</label></li>
                                        <li><input type="checkbox" id="checkboxTwentysix" value="Vietnamese"/><label for="checkboxTwentysix">Vietnamese</label></li>
                                    </ul>
                                </div>   
                                    <p>
                                        <button type="button" class="btn btn-ouline-danger" id="close" style={{marginRight:"10px"}}>Close</button>
                                        <button type="button" class="btn btn-ouline-danger">Submit</button>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
        )
    }
}

export default Cusinefavs

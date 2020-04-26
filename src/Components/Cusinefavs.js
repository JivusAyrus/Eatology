import React, { Component } from 'react'
import $ from 'jquery'
import '../Css/Cusinefavs.scss'
import {
    Switch,
    Route,
    Link,
    withRouter,
    Redirect
} from "react-router-dom";
export class Cusinefavs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isUpdated: false
        }
    }
    componentDidMount() {
        var that = this;
        $("form").submit(function (event) {
            var input_values = $(this).serializeArray();
            var favcusine = []
            var user = JSON.parse(sessionStorage.getItem('user'))
            $.each(input_values, function (i, field) {
                var isChecked = $(`input[name^=${field.name}]`).prop("checked")
                if (isChecked) {
                    favcusine.push(field.value)
                }
                else {
                    return
                }
            })
            var cuisines = { cuisines: favcusine }
            $.ajax({
                type: "post",
                url: "http://localhost:5000/users/update/add-fav-cuisines/" + user._id,
                dataType: "json",
                data: JSON.stringify(cuisines),
                contentType: "application/json",
                cache: false,
                processData: false,                     //Assigns the data to post request body and not url
                success: (data, status, jqXHR) => {
                    var updatedUser = JSON.stringify(data.user)
                    sessionStorage.setItem('user', updatedUser)
                    that.setState({
                        isUpdated: true
                    })
                },
                error: (jqXHR, status, err) => {
                    console.log(jqXHR);
                },

            });
            event.preventDefault();
        })



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
        if (this.state.isUpdated) {
            return <Redirect to={{
                pathname: '/'
            }} />
        }
        else {
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
                                    <Link to="/" style={{ color: "red", display: "flex", marginBottom: "-20px" }}>Skip</Link>
                                </p>
                                <div id="mymodal" class="modal">
                                    <div class="modal-content">
                                        <h3 class="favtitle">Favourite Cusine Selection</h3>
                                        <div class="container">
                                            <ul class="ks-cboxtags">
                                                <li><input type="checkbox" name="checkboxOne" value="African" /><label for="checkboxOne">African</label></li>
                                                <li><input type="checkbox" name="checkboxTwo" value="American" /><label for="checkboxTwo">American</label></li>
                                                <li><input type="checkbox" name="checkboxThree" value="British" /><label for="checkboxThree">British</label></li>
                                                <li><input type="checkbox" name="checkboxFour" value="Cajun" /><label for="checkboxFour">Cajun</label></li>
                                                <li><input type="checkbox" name="checkboxFive" value="Caribbean" /><label for="checkboxFive">Caribbean</label></li>
                                                <li><input type="checkbox" name="checkboxSix" value="Chinese" /><label for="checkboxSix">Chinese</label></li>
                                                <li><input type="checkbox" name="checkboxSeven" value="Eastern European" /><label for="checkboxSeven">Eastern Europen</label></li>
                                                <li><input type="checkbox" name="checkboxEight" value="European" /><label for="checkboxEight">European</label></li>
                                                <li><input type="checkbox" name="checkboxNine" value="French" /><label for="checkboxNine">French</label></li>
                                                <li><input type="checkbox" name="checkboxTen" value="German" /><label for="checkboxTen">German</label></li>
                                                <li><input type="checkbox" name="checkboxEleven" value="Greek" /><label for="checkboxEleven">Greek</label></li>
                                                <li><input type="checkbox" name="checkboxTweleve" value="Indian" /><label for="checkboxTwelve">Indian</label></li>
                                                <li><input type="checkbox" name="checkboxThirteen" value="Irish" /><label for="checkboxThirteen">Irish</label></li>
                                                <li><input type="checkbox" name="checkboxFourteen" value="Italian" /><label for="checkboxFourteen">Italian</label></li>
                                                <li><input type="checkbox" name="checkboxFifteen" value="Japanese" /><label for="checkboxFifteen">Japanese</label></li>
                                                <li><input type="checkbox" name="checkboxSixteen" value="Jewish" /><label for="checkboxSixteen">Jewish</label></li>
                                                <li><input type="checkbox" name="checkboxSeventeen" value="Korean" /><label for="checkboxSeventeen">Korean</label></li>
                                                <li><input type="checkbox" name="checkboxEighteen" value="Latin American" /><label for="checkboxEighteen">Latin American</label></li>
                                                <li><input type="checkbox" name="checkboxNinteen" value="Mediterranean" /><label for="checkboxNinteen">Mediterranean</label></li>
                                                <li><input type="checkbox" name="checkboxTwenty" value="Mexican" /><label for="checkboxTwenty">Mexican</label></li>
                                                <li><input type="checkbox" name="checkboxTwentyone" value="Middle Eastern" /><label for="checkboxTwentyone">Middle Eastern</label></li>
                                                <li><input type="checkbox" name="checkboxTwentytwo" value="Nordic" /><label for="checkboxTwentytwo">Nordic</label></li>
                                                <li><input type="checkbox" name="checkboxTwentythree" value="Southern" /><label for="checkboxTwentythree">Southern</label></li>
                                                <li><input type="checkbox" name="checkboxTwentyfour" value="Spanish" /><label for="checkboxTwentyfour">Spanish</label></li>
                                                <li><input type="checkbox" name="checkboxTwentyfive" value="Thai" /><label for="checkboxTwentyfive">Thai</label></li>
                                                <li><input type="checkbox" name="checkboxTwentysix" value="Vietnamese" /><label for="checkboxTwentysix">Vietnamese</label></li>
                                            </ul>
                                        </div>
                                        <p>
                                            <button type="button" class="btn btn-ouline-danger" id="close" style={{ marginRight: "10px" }}>Close</button>
                                            <button type="submit" class="btn btn-ouline-danger">Submit</button>
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
}

export default Cusinefavs

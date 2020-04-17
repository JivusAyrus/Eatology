import React, { Component } from 'react'
import '../Css/Search.css'

export class Search extends Component {
    render() {
        return (
            <div>
            <center>
                <form class="recsearch" style={{margin:"10px"}}>
                    <div class="card-body row no-gutters align-items-center">
                        <div class="col-auto">
                            
                        </div>

                        <div class="col">
                            <input class="form-control form-control-lg  searchinp" type="search"
                            placeholder="&#xF002; Search" style={{fontStyle:"italic",fontFamily:"FontAwesome"}}/>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-lg btn-outline-primary searchbtn" type="submit">Search</button>
                        </div>
                    </div>
                    
          
                </form>
                </center>
            </div>
        )
    }
}

export default Search

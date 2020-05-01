import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../Css/ControlledCarousel.css'
import $ from 'jquery'
import { Link } from 'react-router-dom'
function ControlledCarousel() {


  const [isLoaded, setLoaded] = useState(false)
  const [recipes, setRecipes] = useState([])
  if (!isLoaded) {
    $.get("https://api.spoonacular.com/recipes/random?number=3&apiKey=" + process.env.REACT_APP_API_KEY + "",
      function (data, status) {
        setRecipes(data.recipes)
        setLoaded(true)
      })
  }

  if (isLoaded) {
    return (
      <Carousel className="carou">
        <Carousel.Item>
          <Link to={{
            pathname: "/recipeinfo",
            state: {
              recipe: recipes[0]
            }
          }} >

            <img
              className="d-block w-100"
              src={recipes[0].image == undefined ?require("./placeholder.jpg"):recipes[0].image}
              alt={recipes[0].title}
              height="400px"
              style={{ zIndex: "0" }}
            />
            <Carousel.Caption>
              <h3>{recipes[0].title}</h3>
              <p>Ready in {recipes[0].readyInMinutes} minutes!</p>
            </Carousel.Caption>

          </Link>
        </Carousel.Item>

        <Carousel.Item>
          <Link to={{
            pathname: "/recipeinfo",
            state: {
              recipe: recipes[1]
            }
          }} >



            <img
              className="d-block w-100"
              src={recipes[1].image == undefined ?require("./placeholder.jpg"):recipes[1].image}
              alt={recipes[1].title}
              height="400px"
              style={{ zIndex: "0" }}
            />

            <Carousel.Caption>
              <h3>{recipes[1].title}</h3>
              <p>Ready in {recipes[1].readyInMinutes} minutes!</p>
            </Carousel.Caption>

          </Link>
        </Carousel.Item>

        <Carousel.Item>
          <Link to={{
            pathname: "/recipeinfo",
            state: {
              recipe: recipes[2]
            }
          }} >



            <img
              className="d-block w-100"
              src={recipes[2].image == undefined ?require("./placeholder.jpg"):recipes[2].image}
              alt={recipes[2].title}
              height="400px"
              style={{ zIndex: "0" }}
            />

            <Carousel.Caption>
              <h3>{recipes[2].title}</h3>
              <p>Ready in {recipes[2].readyInMinutes} minutes!</p>
            </Carousel.Caption>

          </Link>
        </Carousel.Item>


      </Carousel>
    );
  }
  else {
    return ("")
  }
}


export default ControlledCarousel

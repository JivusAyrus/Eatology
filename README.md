# Eatology
Live app : [Eatology](https://eatology-recipes.herokuapp.com/)

This interactive food and recipe web application facilitates a simple, intuitive UI
that enables the user to quickly find the recipe of their favorite dishes as well as,
providing a means for following the recipe steps and procuring all the ingredients
required. The aim of this web application is to provide a means for the user to
search for and learn any recipe of any cuisine.

# Prerequisites
* [Node](https://nodejs.org/en/)

# Steps To Run
* Clone the repository
* When inside the Eatology folder, run ```npm install```.
* Head over to [Spoonacular's website](https://spoonacular.com/food-api/pricing) and get an API key.
* Within Eatology's folder, create a file named .env and add the lines : 
```
REACT_APP_API_KEY=<Your-Api-Key>
REACT_APP_SERVER=https://eatology-server.herokuapp.com
```
* Run npm start and you should have the app running on React's development server on http://localhost:3000

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  

  const RecipesSchema = new Schema ({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum:[ 'Easy Peasy','Amateur Chef','UltraPro Chef']},
    ingredients: [],
    cuisine: {type: String, required: true},
    dishType: {type: String, enum:[ 'Breakfast','Dish','Snack','Drink','Dessert','Other']},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    creator: String,
    created: {type: Date, default: Date.now}
  })

  const Recipes = mongoose.model('Recipe', RecipesSchema);

  let prom1 = Recipes.create({
    title: 'Grilled Gutu',
    duration: 7,
    cuisine: 'Brasilian'
  })
  .then((recipe) => {
    console.log(recipe)
  }

  ) 


  

  let prom2 = Recipes.deleteOne({title:'Carrot Cake'})
  .then((recipe) => {
    console.log(recipe)
  })


  
  
  Promise.all([prom1, prom2])
  .then(values => { 
    console.log("recipes are up to date");
    console.log(values); 
    /*
    [ [ { _id: 5a4e462048841e65562c465a, firstname: 'Alice', __v: 0 },
      { _id: 5a4e462048841e65562c465b, firstname: 'Bob', __v: 0 } ],
    [ { _id: 5a4e462048841e65562c465c, name: 'Madrid', __v: 0 },
      { _id: 5a4e462048841e65562c465d, name: 'Barcelone', __v: 0 },
      { _id: 5a4e462048841e65562c465e, name: 'Paris', __v: 0 } ] ]
    */
    mongoose.connection.close()
    .then(() => {
      console.log('disConnected from Mongo!');
    }).catch(err => {
      console.error('Error disconnecting to mongo', err);
    });
  })
  .catch(err => console.error(err));
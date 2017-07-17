const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const aws = require("aws-lib");
const app = express();



const Birthday = require('./models/Birthday');


 prodAdv = aws.createProdAdvClient("AKIAJ4PRKEKC3ZY7EIZQ", "6obZny6RprNo9cvzWpOP1ZfYt8NEvE6bFQawDNDj", "10a35-20");





mongoose.connect("mongodb://jwalters:aszSOCHfcOnh556f@pokedex-shard-00-00-9zcp5.mongodb.net:27017,pokedex-shard-00-01-9zcp5.mongodb.net:27017,pokedex-shard-00-02-9zcp5.mongodb.net:27017/pokedex?ssl=true&replicaSet=pokedex-shard-0&authSource=admin")




app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({
  extended: true
}));


app.get('/', ( req, res ) =>{
   Birthday.find({}, function( err, birthday ) {
    res.render ('index', { birthday })
   })
});


// Add New Birthday
app.post('/birthday/new', ( req, res ) => {

  let newBirthday = new Birthday({
    name: req.body.name,
    date: req.body.birthDate,
    food:
    {
      favorite: req.body.food
    },
    color:
    {
      favorite: req.body.color
    },
    brand:
    {
      favorite: req.body.brand
    },
    hobby:
    {
      favorite: req.body.hobby
    }
  })

  amazonSearch(newBirthday, "Grocery");

  console.log(newBirthday)

  newBirthday.save()


  res.redirect('/')

});


function amazonSearch(newBirthday ,searchType){
let resultLink;

  prodAdv.call("ItemSearch", {SearchIndex: searchType, Keywords: newBirthday.food.favorite }, function(err, result) {
    resultLink = JSON.stringify(result.Items.MoreSearchResultsUrl);
     //console.log(resultLink)
    //newBirthday.food.moreLink = "google.com"
 console.log(resultLink)
    //return resultLink
});
 console.log(resultLink)
  //newBirthday.food.moreLink = resultLink;

};

// Edit Birthday
app.get('/birthday/edit/:id', ( req, res ) => {
  Birthday.findOne({ '_id': req.params.id }, ( err, birthday ) => {
    res.render('birthday/edit', birthday);
  })
});

//Save Edit Birthday
app.post('/birthday/edit', ( req, res ) => {
  Artist.findOne({ '_id': req.body.id }, ( err, birthday ) => {
    birthday.name  = req.body.name
    birthday.date = req.body.date
    birthday.food = req.body.food
    birthday.hobby = req.body.hobby
    birthday.brand = req.body.brand

    birthday.save()

    res.redirect(`/birthday/${ birthday._id }`)
  });
});

//Show  Birthday
app.get('/birthday/show/:id', ( req, res ) => {
  Birthday.findOne({ '_id': req.params.id }, ( err, birthday ) => {
  res.render('birthday/show', birthday)
   })
})


// Delete Birthday
app.get('/birthday/delete/:id', ( req, res ) => {
  Birthday.findOne({ '_id': req.params.id }, ( err, birthday ) => {
    birthday.remove()
    res.redirect('/')
  })
})


app.get('/birthday/new', ( req, res ) => {
  res.render('birthday/new')
})


app.listen(3000)

console.log("listening on port 3000")

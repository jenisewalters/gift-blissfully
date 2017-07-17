const mongoose = require('mongoose')
const Schema = mongoose.Schema
const aws = require("aws-lib");



const birthdaySchema = new Schema({
  name: String,
  date: Date,
  food:
  {
    favorite: String,
    moreLink: String
  },
  color:
  {
    favorite: String,
    moreLink: String
  },
  brand:
  {
    favorite: String,
    moreLink:String
  },
  hobby:
  {
    favorite: String,
    moreLink: String
  }
})




const Birthday = mongoose.model('Birthday', birthdaySchema)

module.exports = Birthday

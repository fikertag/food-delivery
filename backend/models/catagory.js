const mongoose = require('mongoose')

const Schema = mongoose.Schema

const catagorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('catagory', catagorySchema) 
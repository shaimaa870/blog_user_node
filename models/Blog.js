const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    maxLength: 270,
    required: true,
  },
  body: {
    type: String,
    maxLength: 700,
    required: true,

  },
  photo: {
    data: Buffer, 
     contentType: String 
    

  },
  auther: {
    type: String,
    ref: 'User',
  },

  tags: [{ tag: String }]

});

const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;

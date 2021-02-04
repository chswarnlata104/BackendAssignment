const mongoose = require('mongoose');

const responseJsonSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, ' A response Json must have a date']
  },
  method: {
    type: String,
    required: [true, 'method is required'],
    enum: {
      values: ['get', 'post', 'put', 'delete'],
      message: 'Method is either: get, post, put, delete'
    }
  },
  headers: {
    type: String
  },
  path: {
    type: String
  },
  query: {
    type: String
  },
  body: {
    type: String
  },
  duration: {
    type: Number,
    required: [true, 'duration is required']
  }
})

const ResponseJson = mongoose.model('ResponseJson', responseJsonSchema);

module.exports = ResponseJson;

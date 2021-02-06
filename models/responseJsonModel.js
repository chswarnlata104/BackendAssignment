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
      values: ['GET', 'POST', 'PUT', 'DELETE'],
      message: 'Method is either: get, post, put, delete'
    }
  },
  headers: {
    type: mongoose.Schema.Types.Mixed
  },
  path: {
    type: String
  },
  query: {
    type: mongoose.Schema.Types.Mixed
  },
  body: {
    type: mongoose.Schema.Types.Mixed
  },
  duration: {
    type: Number,
    required: [true, 'duration is required']
  }
})

const ResponseJson = mongoose.model('ResponseJson', responseJsonSchema);

module.exports = ResponseJson;

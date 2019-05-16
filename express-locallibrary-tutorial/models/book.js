var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true},
    //author is a reference to a single Author model object
    author: {
      type: Schema.Types.ObjectId, 
      ref: 'Author', required: true},
    summary: {
      type: String, 
      required: true},
    isbn: {
      type: String, 
      required: true},
    //genre is a reference to an array of Genre model objects
    genre: [{
      type: Schema.Types.ObjectId, 
      ref: 'Genre'}]
  }
);

// Virtual for book's URL
//returns the absolute URL required to get a particular instance of the model
//to get a link to a particular book
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);
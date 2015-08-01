var mongoose    = require( 'mongoose' ) ;

var userSchema = {
  firstName:  { type: String, required: true },
  lastName:   { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  isAdmin:    { type: Boolean, required: true, default: false},
  recipes:    [ { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' } ],
  favorites:  [ { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } ]
};

module.exports = new mongoose.Schema( userSchema );

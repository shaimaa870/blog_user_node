const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxLength: 150,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    maxLength: 150,
    required: true,
  },
  /*blogid: [{
      type: Schema.Types.ObjectId,
      ref: 'Blog'
  }]
  ,*/
  fowlling: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
},
  {
    toJSON: {
      transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre('save', function preSave(next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

userSchema.pre('findOneAndUpdate', function preSave(next) {
  if (!this._update.password) {
    return;
  }
  this._update.password = bcrypt.hashSync(this._update.password, 8);
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

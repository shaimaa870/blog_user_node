const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);

const User = require('../models/User');

const create = (user) => User.create(user);

const getAll = () => User.find({}).exec();

const getUser =(id) => User.findById(id).exec();

const editUser = (id, body) => User.findByIdAndUpdate(id, body, { new: true }).exec();

//const pushfollowID = (id, body) => User.findByIdAndUpdate(id, body, { new: true }).exec();
//follow
const pushFollow = (id, targetid)=> User.update(
  { "_id": id },
  {
      $push: {
        fowlling: targetid
      }
  }
);
//unfollow
const pullFollow = (id, targetid)=> User.update(
  { "_id": id },
  {
      $pull: {
        fowlling: targetid
      }
  }
);
const login = async ({ username, password }) => {
  // get user from DB
  const user = await User.findOne({ username }).exec();
  if (!user) {
    throw Error('UN_AUTHENTICATED');
  }
  //match input password with user data using bcrypt
  const isVaildPass = user.validatePassword(password);
  if (!isVaildPass) {
    throw Error('UN_AUTHENTICATED');
  }
  const token = await asyncSign({
    username: user.username,
    id: user.id,
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
  return { ...user.toJSON(), token };
  
};

const deleteone=(id) => User.findOneAndDelete({'_id':id}); 
module.exports = {
  create,
  login,
  getAll,
  getUser,
  editUser,
  deleteone,
  pushFollow,
  pullFollow
};

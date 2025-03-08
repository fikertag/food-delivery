const User = require('../models/user')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
 return jwt.sign({_id}, process.env.SECRET)
}
// login user

const loginUser = async (req, res) => {

  const {email, password} = req.body;

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    const {_id,name, phone, country, city, region, street, admin} = user
    res.status(200).json({email,token,_id,name, phone, country, city, region, street, admin})
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

// get all users

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).send(user)
  } catch (error) {
    res.status(400).json(error)
  }
}
// get single ser
const getSingleUsers = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.find({_id: id});
    res.status(200).send(user)
  } catch (error) {
    res.status(400).json(error)
  }
}

// signup user

const signupUser = async (req, res) => {
  
  const {email,password} = req.body;

  try {
    const user = await User.signup(email, password)
    const token = createToken(user._id);
    const {_id} = user;
    res.status(200).json({email,token,_id})
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

// update user information

const updateUserInfo = async (req,res) => {

  try {
    const {id} = req.params;
    const {name, phone, country, city, region, street, token, email, admin, _id} = await User.findOneAndUpdate({_id: id }, req.body,{new: true});
    if(!name){
      return res.status(404).json({error: 'no such user'})
    }
    res.status(200).json({name, phone, country, city, region, street,token, email, admin, _id })
  } catch (error) {
    res.status(404).json({error: error})
  }
}

module.exports = {signupUser, loginUser, updateUserInfo, getAllUsers, getSingleUsers}
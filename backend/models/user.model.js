import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  fullName : {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: {
  type : [String],
  default: [],
  },
  profilePic: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


export const userModel = mongoose.model('User',userSchema);
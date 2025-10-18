import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  UserName: { type: String, required: true },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  ProfilePicture: String,
});

const Usermodel = mongoose.model("Usermodel", UserSchema);
export default Usermodel;

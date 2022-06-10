import { Schema, model, models } from "mongoose";

const usersSchema = new Schema({
  first_name: String,
  last_name: String,
  address: String,
  city: String,
  state: String,
  zip_code: Number,
  phone_number: String,
  email: String,
  photo_url: String,
  guide: Boolean,
  offered_tours: [],
});

const Users = models.Users || model("Users", usersSchema);

export default Users;

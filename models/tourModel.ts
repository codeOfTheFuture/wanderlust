import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const toursSchema = new Schema({
  guide_id: ObjectId,
  tour_date: Date,
  created_at: Date,
  title: String,
  description: String,
  price: Number,
  duration: Number,
  tour_location: { lat: Number, lng: Number },
  booked_tourists: [],
  items_to_bring: [String],
  tour_photos: [String],
});

const Tours = models.Tours || model("Tours", toursSchema);

export default Tours;

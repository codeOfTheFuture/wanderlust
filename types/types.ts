import { ObjectId } from "mongodb";

interface User {
  _id: ObjectId;
  first_name: string;
  last_name: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone_number?: string;
  photo_url?: string;
  offered_tours?: Tour[];
  booked_tours?: Tour[];
  favorite_tours?: Tour[];
  created_at: Date;
}

interface Tour {
  _id: ObjectId;
  guide_id: ObjectId;
  title: string;
  description?: string;
  price?: number;
  duration?: number;
  tour_date?: Date;
  created_at: Date;
  booked_tourists: User[];
  items_to_bring?: string[];
  tour_location?: { lat: number; lng: number };
}

export { type User, type Tour };

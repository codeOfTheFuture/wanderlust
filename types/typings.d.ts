import { ObjectId } from "mongodb";

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  phone_number: string | null;
  guide: boolean;
  offered_tours: Tour[];
  booked_tours: Tour[];
  favorite_tours: Tour[];
  messages: any[];
  signedInBefore: boolean;
  created_at: Date;
}

interface Tour {
  _id: ObjectId;
  guide_id: ObjectId;
  title: string;
  description: string;
  price: number;
  duration: number;
  tour_date: Date;
  created_at: Date;
  tour_location: { lat: number; lng: number };
  booked_tourists: User[];
  items_to_bring: string[];
  tour_photos: string[];
}

interface CloudinaryImage {
  api_key: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  width: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  type: string;
  url: string;
  version: number;
  version_id: string;
}

type HandleScroll = () => void;

type States = [StateName: string, StateAbbr: string][];

export {
  type User,
  type Tour,
  type HandleScroll,
  type CloudinaryImage,
  type States,
};

import { ObjectId } from "mongodb";

interface SessionUser {
  id: ObjectId;
  name: string;
  email: string;
  image: string;
}

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  streetAddress: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  phoneNumber: string | null;
  registerAsGuide: boolean;
  offeredTours: Tour[];
  bookedTours: Tour[];
  favoriteTours: Tour[];
  messages: any[];
  signedInBefore: boolean;
  created_at: Date;
}

interface Tour {
  _id: ObjectId;
  guideId: string;
  title: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  recommendedAges: string;
  address: {
    placeName: string;
    coordinates: number[];
  };
  bookedTourists: User[];
  whatToBring: string;
  tourPhotos: CloudinaryImage[];
  created_at: Date;
  tourDates: {
    date: Date;
    time: {
      hour: number;
      minute: number;
    };
  }[];
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

type AddressSuggestion = {
  id: string;
  place_name: string;
  coordinates: Number[];
};

export {
  type SessionUser,
  type User,
  type Tour,
  type HandleScroll,
  type CloudinaryImage,
  type States,
  type AddressSuggestion,
};

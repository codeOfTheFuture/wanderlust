import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { FC, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import TourCard from "../components/tour-cards/TourCard";
import TourCards from "../components/tour-cards/TourCards";
import { connectToDatabase } from "../lib/mongodb";
import { useAppSelector, wrapper } from "../store";
import { selectTours, setTours } from "../store/slices/toursSlice";
import { setUser } from "../store/slices/userSlice";
import { SessionUser, Tour } from "../types/typings";
import { authOptions } from "./api/auth/[...nextauth]";

const Search: FC = () => {
  const [viewState, setViewState] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 10,
  });

  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const tours = useAppSelector(selectTours) as Tour[];

  return (
    <div className="flex">
      {/* Map */}
      <div className="w-full h-auto">
        <Map
          {...viewState}
          onMove={e => setViewState(e.viewState)}
          style={{ width: "100%", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}>
          {tours.map(tour => (
            <div key={tour?._id.toString()}>
              <Marker
                longitude={tour?.address?.coordinates[0]}
                latitude={tour?.address?.coordinates[1]}
                onClick={() => {
                  setSelectedTour(tour);
                }}>
                <p className="bg-white text-primary-text w-20 h-20 rounded border border-primary-text text-lg font-semibold flex justify-center items-center cursor-pointer">
                  {tour?.price}
                </p>
              </Marker>

              {selectedTour?._id === tour._id && (
                <Popup
                  longitude={tour.address.coordinates[0] as number}
                  latitude={tour.address.coordinates[1] as number}
                  onClose={() => setSelectedTour(null)}>
                  {/* <TourCard tour={tour} /> */}
                  <p className="w-20 h-20 bg-red-400">Tour</p>
                </Popup>
              )}
            </div>
          ))}
        </Map>
      </div>

      {/* Tour Card List */}
      {/* <div className="w-2/5 h-auto">
        <TourCards />
      </div> */}
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    // Get current session
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    // Connect to MongoDb
    const { db } = await connectToDatabase();

    // Only runs if session exists and user in redux is null
    if (session && store.getState().user.user == null) {
      const { id } = session.user as SessionUser;

      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });

      store.dispatch(setUser(JSON.parse(JSON.stringify(user))));
    }

    const queryTours = await db.collection("tours").find({}).toArray(),
      tours = await JSON.parse(JSON.stringify(queryTours));

    store.dispatch(setTours(tours));

    return {
      props: {},
    };
  });

import { FC, FormEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Head from "next/head";
import Map from "../components/search-page/Map";
import TourCards from "../components/tour-cards/TourCards";
import SearchInput from "../components/ui/SearchInput";
import useAddressAutocomplete from "../hooks/useAddressAutocomplete";
import { connectToDatabase } from "../lib/mongodb";
import { useAppDispatch, useAppSelector, wrapper } from "../store";
import { setViewPort } from "../store/slices/mapSlice";
import { selectSearchQuery, setSearchQuery } from "../store/slices/searchSlice";
import { setUser } from "../store/slices/userSlice";
import { User } from "../types/typings";
import { authOptions } from "./api/auth/[...nextauth]";
import { MapIcon, ViewListIcon } from "@heroicons/react/solid";

const Search: FC = () => {
  const [viewMap, setViewMap] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  const [zoom, setZoom] = useState<number>(5);
  const searchQuery = useAppSelector(selectSearchQuery);

  const { value, handleAddressChange, suggestions } =
    useAddressAutocomplete("");

  useEffect(() => {
    if (!value) setSelectedSuggestion(null);
  }, [value]);

  const dispatch = useAppDispatch();

  const setZoomLevel = (placeType: string, category: string) => {
    if (placeType === "country") {
      setZoom(2);
    }
    if (placeType === "place") setZoom(10);
    if (placeType === "region") setZoom(6);
    if (placeType === "poi") setZoom(10);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (selectedSuggestion) {
      dispatch(setSearchQuery(selectedSuggestion?.place_name));

      setZoomLevel(
        selectedSuggestion.place_type[0],
        selectedSuggestion.properties?.category
      );

      dispatch(
        setViewPort({
          center: selectedSuggestion?.center,
          zoom: zoom,
        })
      );
    }
  };

  console.log("search Query", searchQuery);
  return (
    <div className="flex flex-col">
      <Head>
        <title>Wanderlust - {searchQuery || "Search"}</title>
      </Head>
      {/* Search Input */}
      <form
        onSubmit={handleSearch}
        className="absolute flex justify-center top-16 z-20 w-full xl:w-3/5">
        <SearchInput
          value={value}
          suggestions={suggestions}
          selectedSuggestion={selectedSuggestion}
          setSelectedSuggestion={setSelectedSuggestion}
          handleAddressChange={handleAddressChange}
          setZoomLevel={setZoomLevel}
          comboBoxStyles="flex w-full h-16 sm:h-20 shadow-md"
          comboboxInputStyles="relative w-full h-full pl-10 pr-[8rem] text-xl border border-primary-text focus:outline-none"
        />
      </form>

      <div className="flex justify-center xl:justify-start">
        {/* Map */}
        <div
          className={`w-full xl:w-3/5 h-[85vh] absolute bottom-0 ${
            viewMap ? "block" : "hidden xl:block"
          }`}>
          <Map setLoading={setLoading} />
        </div>

        {/* Tour Card List */}
        <div
          className={`w-full xl:w-2/5 absolute right-0 overflow-auto ${
            viewMap ? "hidden xl:block" : "block"
          }`}>
          <TourCards loading={loading} />
        </div>
        <button
          className="absolute bottom-5 flex gap-2 items-center z-50 xl:hidden py-2 px-6 bg-white font-semibold rounded-full border border-black hover:bg-gray-100"
          onClick={() => setViewMap(prevState => !prevState)}>
          {viewMap ? (
            <ViewListIcon className="w-4 h-4" />
          ) : (
            <MapIcon className="w-4 h-4" />
          )}
          {viewMap ? "View List" : "View Map"}
        </button>
      </div>
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
      const response = (await db
        .collection("users")
        .findOne({ email: session.user?.email })) as User;

      const user = JSON.parse(JSON.stringify(response));

      store.dispatch(setUser(user));
    }

    return {
      props: {},
    };
  });

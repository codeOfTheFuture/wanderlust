import { FC, useState } from "react";
import ReactMapGL from "react-map-gl";
import { useAppSelector } from "../../store";
import { selectTours } from "../../store/slices/toursSlice";
import { TourResults } from "../../types/typings";
import MapMarker from "./MapMarker";
import MapPopup from "./MapPopup";

const Map: FC = () => {
  const tourResults = useAppSelector(selectTours) as TourResults;
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

  const [viewState, setViewState] = useState({
    longitude: -122.4,
    latitude: 37.8,
    zoom: 10,
  });

  const [selectedTourId, setSelectedTourId] = useState<string>("Empty");

  const handleSelectedTour = (tourId: string) => {
    console.log("Selected");
    setSelectedTourId(tourId);
  };

  const closePopup = () => {
    console.log("it is automatically closing");
    setSelectedTourId("Nothing");
  };

  console.log("selectedTourId", selectedTourId);

  return (
    <ReactMapGL
      {...viewState}
      onMove={e => setViewState(e.viewState)}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={accessToken}>
      {tourResults.results.map(tour => (
        <div key={tour._id.toString()}>
          <MapMarker
            tourId={tour._id.toString()}
            lng={tour.address.coordinates[0]}
            lat={tour.address.coordinates[1]}
            price={tour.price.toString()}
            handleSelectedTour={handleSelectedTour}
          />

          {selectedTourId === tour._id.toString() && (
            <MapPopup tour={tour} closePopup={closePopup} />
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;

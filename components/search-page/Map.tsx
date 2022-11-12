import { FC, useEffect, useRef, useState } from "react";
import ReactMapGL, { MapRef, NavigationControl } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchMapResults,
  selectMapResults,
  selectViewport,
  selectZoom,
} from "../../store/slices/mapSlice";
import { fetchToursSearch, selectTours } from "../../store/slices/toursSlice";
import { TourResults } from "../../types/typings";
import MapMarker from "./MapMarker";
import MapPopup from "./MapPopup";

interface Props {
  setLoading: any;
}

const Map: FC<Props> = ({ setLoading }) => {
  const center = useAppSelector(selectViewport);
  const zoom = useAppSelector(selectZoom);
  const mapResults = useAppSelector(selectMapResults);
  const tourResults = useAppSelector(selectTours) as TourResults;
  const dispatch = useAppDispatch();

  const [selectedTourId, setSelectedTourId] = useState<string>("");
  const [viewState, setViewState] = useState({
    longitude: center[0] || -74.007727,
    latitude: center[1] || 40.707385,
    zoom: zoom,
  });

  useEffect(() => {
    setViewState({
      longitude: center[0] || -74.007727,
      latitude: center[1] || 40.707385,
      zoom: zoom,
    });
  }, [center, zoom]);

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

  const handleSelectedTour = (tourId: string) => {
    setSelectedTourId(tourId);
  };

  const closePopup = () => {
    setSelectedTourId("Nothing");
  };

  const mapRef = useRef<MapRef>(null);
  const mapBounds = mapRef?.current?.getMap().getBounds();
  const southWestLat = mapBounds?.getSouthWest().lat as number;
  const northWestLat = mapBounds?.getNorthWest().lat as number;
  const southWestLng = mapBounds?.getSouthWest().lng as number;
  const northEastLng = mapBounds?.getNorthEast().lng as number;

  const getSearchedTours = () => {
    dispatch(
      fetchMapResults({
        bounds: { southWestLat, northWestLat, southWestLng, northEastLng },
      })
    );

    dispatch(
      fetchToursSearch({
        page: 1,
        limit: tourResults.limit,
        bounds: { southWestLat, northWestLat, southWestLng, northEastLng },
      })
    );
  };

  useEffect(() => {
    dispatch(
      fetchToursSearch({
        page: 1,
        limit: 8,
        bounds: { southWestLat, northWestLat, southWestLng, northEastLng },
      })
    );

    dispatch(
      fetchMapResults({
        bounds: { southWestLat, northWestLat, southWestLng, northEastLng },
      })
    );
  }, [southWestLat, northWestLat, southWestLng, northEastLng, dispatch]);

  return (
    <ReactMapGL
      {...viewState}
      ref={mapRef}
      onMove={e => setViewState(e.viewState)}
      onDragStart={() => {
        setLoading(true);
      }}
      onDragEnd={() => {
        setLoading(false);
        getSearchedTours();
      }}
      onZoomStart={() => {
        setLoading(true);
      }}
      onZoomEnd={() => {
        setLoading(false);
        getSearchedTours();
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={accessToken}>
      <NavigationControl position="bottom-right" showCompass={false} />

      {mapResults?.map(tour => (
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

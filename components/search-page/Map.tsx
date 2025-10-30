import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const Map: FC<Props> = ({ setLoading }) => {
  const center = useAppSelector(selectViewport);
  const zoom = useAppSelector(selectZoom);
  const mapResults = useAppSelector(selectMapResults);
  const tourResults = useAppSelector(selectTours) as TourResults;
  const dispatch = useAppDispatch();

  const [selectedTourId, setSelectedTourId] = useState<string>("");
  const [viewState, setViewState] = useState<{
    longitude: number;
    latitude: number;
    zoom: number;
  }>({
    longitude: center[0] || -74.007727,
    latitude: center[1] || 40.707385,
    zoom: zoom,
  });
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    setViewState({
      longitude: center[0] || -74.007727,
      latitude: center[1] || 40.707385,
      zoom: zoom,
    });

    mapRef.current?.flyTo({
      center: [center[0], center[1]],
      zoom: zoom,
    });
  }, [center, zoom]);

  const handleSelectedTour = (tourId: string) => {
    setSelectedTourId(tourId);
  };

  const closePopup = () => {
    setSelectedTourId("Nothing");
  };

  const getSearchedTours = () => {
    const { southWestLat, northWestLat, southWestLng, northEastLng } =
      getMapBounds();

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

  const getMapBounds = () => {
    const mapBounds = mapRef.current?.getBounds();
    const southWestLat = mapBounds?.getSouthWest().lat as number;
    const northWestLat = mapBounds?.getNorthWest().lat as number;
    const southWestLng = mapBounds?.getSouthWest().lng as number;
    const northEastLng = mapBounds?.getNorthEast().lng as number;

    return {
      southWestLat,
      northWestLat,
      southWestLng,
      northEastLng,
    };
  };

  return (
    <ReactMapGL
      {...viewState}
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}
      onMove={e => setViewState(e.viewState)}
      onLoad={() => {
        getSearchedTours();
      }}
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
      }}>
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

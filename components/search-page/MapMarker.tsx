import { FC } from "react";
import { Marker } from "react-map-gl";

interface Props {
  tourId: string;
  lng: number;
  lat: number;
  price: string;
  handleSelectedTour: (tourId: string) => void;
}

const MapMarker: FC<Props> = ({
  tourId,
  lng,
  lat,
  price,
  handleSelectedTour,
}) => {
  return (
    <Marker longitude={lng} latitude={lat}>
      <p
        className="bg-white text-primary-text w-12 h-12 rounded-3xl border border-primary-text text-lg font-semibold flex justify-center items-center cursor-pointer"
        onClick={() => {
          handleSelectedTour(tourId);
        }}>
        ${price}
      </p>
    </Marker>
  );
};

export default MapMarker;

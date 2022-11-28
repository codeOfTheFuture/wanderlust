import { FC } from "react";
import { Popup } from "react-map-gl";
import { Tour } from "../../types/typings";
import TourCard from "../tour-cards/TourCard";

interface Props {
  tour: Tour;
  closePopup: () => void;
}

const MapPopup: FC<Props> = ({ tour, closePopup }) => {
  const lng = tour.address.coordinates[0];
  const lat = tour.address.coordinates[1];

  return (
    <Popup
      longitude={lng}
      latitude={lat}
      offset={28}
      closeOnClick={false}
      closeOnMove={true}
      maxWidth="none"
      onClose={closePopup}>
      <div className="w-[350px]">
        <TourCard tour={tour} />
      </div>
    </Popup>
  );
};

export default MapPopup;

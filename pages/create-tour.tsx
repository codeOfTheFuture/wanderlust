import React from "react";
import TourImageUpload from "../components/CreateTourPage/TourImageUpload";
import TourTitleInput from "../components/CreateTourPage/TourTitleInput";
import Layout from "../components/Layouts/Layout";

const createTour = () => {
  return (
    <Layout>
      <form className="w-full h-[100vh]">
        <div className="flex justify-center items-center gap-10 w-full h-[50vh] bg-gray-400">
          <div className="w-2/5">
            {/* Title Input */}
            <TourTitleInput />

            {/* Category Select */}
          </div>

          {/* Image Upload */}
          <TourImageUpload />
        </div>

        <div>
          <div>
            {/* Description Input */}

            {/* Duration Input */}

            {/* What should they bring */}

            {/* Address */}
          </div>

          <div>
            {/* Price Input */}

            {/* Date Picker  */}

            {/* Time Picker */}

            {/* Guide Image */}
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default createTour;

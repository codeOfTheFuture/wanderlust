import React from "react";
import Layout from "../components/Layouts/Layout";
import { ClockIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import { DocumentTextIcon, InformationCircleIcon, UsersIcon } from "@heroicons/react/solid";
import TourImageUpload from "../components/CreateTourPage/TourImageUpload";
import TourTitleInput from "../components/CreateTourPage/TourTitleInput";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import FormTextArea from "../components/FormTextArea";

const createTour = () => {
  return (
    <Layout>
      <form className="w-full h-[150vh]">
        <div className="flex justify-center items-center gap-10 w-full h-[50vh] bg-gray-400">
          <div className="flex flex-col gap-2 w-2/5">
            {/* Title Input */}
            <TourTitleInput />

            {/* Category Select */}
            <FormSelect
              name="category"
              defaultText="Select a category"
              optionsList={[
                "Option 1",
                "Option 2",
                "Option 3",
                "Option 4",
                "Option 5",
              ]}
              selectStyles="flex flex-col bg-slate-100 w-52 rounded-sm"
            />
          </div>

          {/* Image Upload */}
          <TourImageUpload />
        </div>

        <div className="mt-5">
          <h1 className="text-lg font-bold ml-10">About this tour</h1>
          <div className="flex flex-col">
            {/* Description Input */}
            <div className="flex items-center">
              <InformationCircleIcon className="w-10 h-10" />
              <FormTextArea name="description" label="Description" />
            </div>

            {/* Duration Input */}
            <div className="flex items-center w-[427px]">
              <ClockIcon className="w-10 h-10" />
              <FormInput
                label="Duration"
                name="duration"
                type="number"
              />
            </div>

            {/* Recommended Ages */}
            <div className="flex items-center w-[427px]">
              <UsersIcon className="w-10 h-10" />
              <FormSelect
                name="recommendedAges"
                defaultText="Recommended Ages"
                optionsList={[
                  "Option 1",
                  "Option 2",
                ]}
                selectStyles="flex flex-col bg-slate-100 w-full rounded-sm"
              />
            </div>

            {/* What should they bring */}
            <div className="flex items-center w-[427px]">
              <DocumentTextIcon className="w-10 h-10" />
              <FormTextArea
                name="what-to-bring"
                label="What should they bring"
              />
            </div>

            {/* Address */}
            <div className="flex items-center w-[427px]">
              <LocationMarkerIcon className="w-10 h-10" />
              <FormInput
                name="address"
                label="Address"
                type="text"
              />
            </div>
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

import React, { FC } from "react";
import TourImageUpload from "./TourImageUpload";
import TourTitleInput from "./TourTitleInput";
import FormSelect from "../UI/FormSelect";
import { ClockIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import {
  DocumentTextIcon,
  InformationCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import FormTextArea from "../UI/FormTextArea";
import FormInput from "../UI/FormInput";
import CurrencyFormat from "react-currency-format";
import Image from "next/image";
import { User } from "../../types/typings";

interface Props {
  user: User | null;
}

const TourForm: FC<Props> = ({ user }) => {
  return (
    <form className="w-full mb-10">
      <div className="flex flex-col md:flex-row justify-evenly lg:justify-center items-center md:gap-10 w-full h-[80vh] md:h-[50vh] bg-gray-400">
        <div className="flex flex-col gap-2 w-5/6 md:w-2/5">
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

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-10 mx-auto w-5/6 lg:w-1/2">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-5 border border-blue-500">
          <h1 className="text-lg font-bold ml-10">About this tour</h1>
          {/* Description Input */}
          <div className="flex items-center">
            <InformationCircleIcon className="w-10 h-10" />
            <FormTextArea name="description" label="Description" />
          </div>

          {/* Duration Input */}
          <div className="flex items-center">
            <ClockIcon className="w-10 h-10" />
            <FormInput label="Duration" name="duration" type="number" />
          </div>

          {/* Recommended Ages */}
          <div className="flex items-center">
            <UsersIcon className="w-10 h-10" />
            <FormSelect
              name="recommendedAges"
              defaultText="Recommended Ages"
              optionsList={["Option 1", "Option 2"]}
              selectStyles="flex flex-col bg-slate-100 w-full rounded-sm"
            />
          </div>

          {/* What should they bring */}
          <div className="flex items-center">
            <DocumentTextIcon className="w-10 h-10" />
            <FormTextArea name="what-to-bring" label="What should they bring" />
          </div>

          {/* Address */}
          <div className="flex items-center">
            <LocationMarkerIcon className="w-10 h-10" />
            <FormInput name="address" label="Address" type="text" />
          </div>
        </div>

        <div className="flex flex-col justify-between col-span-1 md:col-span-2 border border-red-500">
          <div className="flex flex-col gap-2">
            {/* Price Input */}
            <div className="flex justify-center items-center gap-2 mt-12 font-semibold w-full">
              <div className="text-2xl">US$</div>
              <CurrencyFormat
                customInput={FormInput}
                decimalSeparator="."
                fixedDecimalScale={true}
                decimalScale={2}
                allowNegative={false}
              />
              <div>per person</div>
            </div>

            <hr />
            {/* Date Picker  */}
            <FormInput name="date" label="Date" type="text" />

            {/* Time Picker */}
            <FormInput name="time" label="Time" type="text" />
          </div>

          {/* Guide Image */}
          {user && (
            <div className="relative w-60 h-60 mx-auto rounded-full">
              <Image
                src={user.image!}
                alt="guide"
                layout="fill"
                className="absolute object-cover rounded-full"
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default TourForm;

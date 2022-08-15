import React, { useState } from "react";
import Layout from "../components/Layouts/Layout";
import { ClockIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import {
  DocumentTextIcon,
  InformationCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import TourImageUpload from "../components/CreateTourPage/TourImageUpload";
import TourTitleInput from "../components/CreateTourPage/TourTitleInput";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import FormTextArea from "../components/FormTextArea";
import CurrencyFormat from "react-currency-format";
import { NextPage } from "next";
import Image from "next/image";
import { useSession } from "next-auth/react";

const CreateTour: NextPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { data: session } = useSession();

  return (
    <Layout>
      <form className="w-full mb-10">
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

        <div className="grid grid-cols-5 gap-5 mt-10 mx-auto w-1/2">
          <div className="col-span-3 flex flex-col gap-5 border border-blue-500">
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
              <FormTextArea
                name="what-to-bring"
                label="What should they bring"
              />
            </div>

            {/* Address */}
            <div className="flex items-center">
              <LocationMarkerIcon className="w-10 h-10" />
              <FormInput name="address" label="Address" type="text" />
            </div>
          </div>

          <div className="flex flex-col justify-between col-span-2 border border-red-500">
            <div className="flex flex-col gap-2">
              {/* Price Input */}
              <div className="flex justify-center items-center gap-2 mt-12 font-semibold">
                <span className="text-2xl">US$</span>
                <CurrencyFormat
                  customInput={FormInput}
                  decimalSeparator="."
                  fixedDecimalScale={true}
                  decimalScale={2}
                  allowNegative={false}
                />
                <span>per person</span>
              </div>

              <hr />
              {/* Date Picker  */}
              <FormInput name="date" label="Date" type="text" />

              {/* Time Picker */}
              <FormInput name="time" label="Time" type="text" />
            </div>

            {/* Guide Image */}
            {session && (
              <div className="relative w-60 h-60 mx-auto rounded-full">
                <Image
                  src={session?.user?.image as string}
                  alt="guide"
                  layout="fill"
                  className="absolute object-cover rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CreateTour;

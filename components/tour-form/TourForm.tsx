import React, { FC, FocusEventHandler, useState } from "react";
import TourImageUpload from "./TourImageUpload";
import TourTitleInput from "./TourTitleInput";
import FormSelect from "../ui/FormSelect";
import { ClockIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import {
  DocumentTextIcon,
  InformationCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import FormTextArea from "../ui/FormTextArea";
import FormInput from "../ui/FormInput";
import CurrencyFormat from "react-currency-format";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import DatePicker from "../ui/DatePicker/DatePicker";

const TourForm: FC = () => {
  const user = useSelector(selectUser);

  const [tourTitle, setTourTitle] = useState(""),
    [category, setCategory] = useState(""),
    [duration, setDuration] = useState(""),
    [recommendedAges, setRecommendedAges] = useState(""),
    [whatToBring, setWhatToBring] = useState(""),
    [address, setAddress] = useState(""),
    [price, setPrice] = useState(0),
    [date, setDate] = useState(""),
    [time, setTime] = useState("");

  return (
    <form className="mb-10">
      <div className="flex justify-center items-center w-full h-[70vh] md:h-[50vh] bg-gray-400">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-5/6 lg:w-2/3">
          <div className="flex flex-col gap-2 mt-10 md:mt-0 w-full">
            {/* Title Input */}
            <TourTitleInput value={tourTitle} handleChange={setTourTitle} />

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
              value={category}
              handleChange={setCategory}
            />
          </div>

          {/* Image Upload */}
          <TourImageUpload />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-10 mx-auto w-5/6 lg:w-[951px]">
        <div className="col-span-1 md:col-span-3 flex flex-col gap-5">
          <h1 className="text-lg font-bold ml-12">About this tour</h1>
          {/* Description Input */}
          <div className="flex items-center gap-2">
            <InformationCircleIcon className="w-10 h-10" />
            <FormTextArea name="description" label="Description" />
          </div>

          {/* Duration Input */}
          <div className="flex items-center gap-2">
            <ClockIcon className="w-10 h-10" />
            <FormInput
              label="Duration"
              name="duration"
              type="number"
              value=""
              handleChange={() => {}}
            />
          </div>

          {/* Recommended Ages */}
          <div className="flex items-center gap-2">
            <UsersIcon className="w-10 h-10" />
            <FormSelect
              name="recommendedAges"
              defaultText="Recommended Ages"
              optionsList={["Option 1", "Option 2"]}
              selectStyles="flex flex-col bg-slate-100 w-full rounded-sm"
              value={recommendedAges}
              handleChange={setRecommendedAges}
            />
          </div>

          {/* What should they bring */}
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-10 h-10" />
            <FormTextArea name="what-to-bring" label="What should they bring" />
          </div>

          {/* Address */}
          <div className="flex items-center gap-2">
            <LocationMarkerIcon className="w-10 h-10" />
            <FormInput
              name="address"
              label="Address"
              type="text"
              value=""
              handleChange={() => {}}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between h-[500px] md:h-auto col-span-1 md:col-span-2">
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
                value={price}
                handleChange={setPrice}
              />
              <div>per person</div>
            </div>

            <hr />
            {/* Date Picker  */}
            <div className="relative">
              <FormInput
                name="date"
                label="Date"
                type="text"
                value=""
                handleChange={() => {}}
              />
              <DatePicker />
            </div>
          </div>

          {/* Guide Image */}
          {user && (
            <div className="relative mx-auto rounded-full">
              <Image
                src={user.image!}
                alt="guide"
                width={240}
                height={240}
                className="object-cover rounded-full"
              />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default TourForm;

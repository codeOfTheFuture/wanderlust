import React, { FC, useRef, useState } from "react";
import TourImageUpload from "./TourImageUpload";
import TourTitleInput from "./TourTitleInput";
import FormSelect from "../ui/FormSelect";
import {
  ClockIcon,
  LocationMarkerIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
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
import useClickOutside from "../../hooks/useClickOutside";

export type SelectedDate = {
  date: Date;
  time: {
    hour: number;
    minute: number;
  };
};

const TourForm: FC = () => {
  const user = useSelector(selectUser);

  const [tourTitle, setTourTitle] = useState<string>(""),
    [category, setCategory] = useState<string>(""),
    [description, setDescription] = useState<string>(""),
    [duration, setDuration] = useState<string>(""),
    [recommendedAges, setRecommendedAges] = useState<string>(""),
    [whatToBring, setWhatToBring] = useState<string>(""),
    [address, setAddress] = useState<string>(""),
    [price, setPrice] = useState<string>("0"),
    [datePickerOpen, setDatePickerOpen] = useState<boolean>(false),
    [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]),
    [currentSelectedDate, setCurrentSelectedDate] =
      useState<SelectedDate | null>(null);

  const datePickerRef = useRef<HTMLDivElement>(null);

  console.log("price", price);

  useClickOutside(datePickerRef, () => {
    setDatePickerOpen(false);
  });

  const addDate = (date: Date) => {
    const newDate = { date: date, time: { hour: 1, minute: 0 } };
    setSelectedDates(prevDates => [...prevDates, newDate]);
    setCurrentSelectedDate(newDate);
  };

  const removeDate = (date: Date) => {
    setSelectedDates(prevDates => prevDates.filter(d => d.date !== date));

    if (currentSelectedDate?.date === date) {
      setCurrentSelectedDate(null);
    }
  };

  const selectDate = (selectedDate: SelectedDate) => {
    setCurrentSelectedDate(selectedDate);
  };

  const changeTime = (date: Date, hour: number, minute: number) => {
    setSelectedDates(prevDates =>
      prevDates.map(d => {
        if (d.date === date) return { ...d, time: { hour, minute } };
        return d;
      })
    );
  };

  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  return (
    <form className="mb-10" id="tourForm">
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
            <FormTextArea
              name="description"
              label="Description"
              formId="tourForm"
              value={description}
              handleChange={setDescription}
            />
          </div>

          {/* Duration Input */}
          <div className="flex items-center gap-2">
            <ClockIcon className="w-10 h-10" />
            <FormSelect
              name="duration"
              defaultText="Duration"
              optionsList={[
                "30 minutes",
                "1 hour",
                "1 hour 30 minutes",
                "2 hours",
                "2 hour 30 minutes",
                "3 hours",
                "3 hour 30 minutes",
                "4 hours",
              ]}
              selectStyles="flex flex-col bg-slate-100 w-full rounded-sm"
              value={duration}
              handleChange={setDuration}
            />
          </div>

          {/* Recommended Ages */}
          <div className="flex items-center gap-2">
            <UsersIcon className="w-10 h-10" />
            <FormSelect
              name="recommendedAges"
              defaultText="Recommended Ages"
              optionsList={["All ages", "18 and over"]}
              selectStyles="flex flex-col bg-slate-100 w-full rounded-sm"
              value={recommendedAges}
              handleChange={setRecommendedAges}
            />
          </div>

          {/* What should they bring */}
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-10 h-10" />
            <FormTextArea
              name="what-to-bring"
              label="What should they bring"
              formId="tourForm"
              value={whatToBring}
              handleChange={setWhatToBring}
            />
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
          <div className="flex flex-col gap-3">
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
                onValueChange={values => setPrice(values.value)}
              />
              <div>per person</div>
            </div>

            <hr />
            {/* Date Picker  */}
            <div
              className="relative flex flex-col items-center"
              ref={datePickerRef}>
              <FormInput
                name="date"
                label="Select Dates and Time"
                type="text"
                value={selectedDates.reduce(
                  (acc, curr) => acc + curr.date.toLocaleDateString() + ", ",
                  ""
                )}
                Icon={CalendarIcon}
                handleChange={() => {}}
                handleFocus={openDatePicker}
              />
              <DatePicker
                currentSelectedDate={currentSelectedDate}
                selectedDates={selectedDates}
                addDate={addDate}
                removeDate={removeDate}
                selectDate={selectDate}
                changeTime={changeTime}
                datePickerOpen={datePickerOpen}
              />
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

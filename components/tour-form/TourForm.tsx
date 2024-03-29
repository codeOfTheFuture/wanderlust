import React, { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
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
import { selectUser } from "../../store/slices/userSlice";
import DatePicker from "../ui/date-picker/DatePicker";
import useClickOutside from "../../hooks/useClickOutside";
import Modal from "../modal/Modal";
import useOnDrop from "../../hooks/useOnDrop";
import Button from "../ui/Button";
import { Tour, User } from "../../types/typings";
import { useRouter } from "next/router";
import { useAppSelector } from "../../store";

import useAddressAutocomplete from "../../hooks/useAddressAutocomplete";
import AddressInput from "../ui/AddressInput";
import { selectModalOpen } from "../../store/slices/modalSlice";
import PreviewThumbnails from "../modal/PreviewThumbnails";
import deleteImage from "../../utils/deleteImage";
import toast from "react-hot-toast";

export type SelectedDate = {
  date: Date;
  time: {
    hour: number;
    minute: number;
  };
};

interface Props {
  tour?: Tour;
  submitForm: (tour: any) => Promise<void>;
  deleteTour?: () => Promise<void>;
}

const TourForm: FC<Props> = ({ tour, submitForm, deleteTour }) => {
  const user = useAppSelector(selectUser) as User;
  const modalOpen = useAppSelector(selectModalOpen) as boolean;

  const [tourTitle, setTourTitle] = useState<string>(tour?.title || "");
  const [category, setCategory] = useState<string>(tour?.category || "");
  const [description, setDescription] = useState<string>(
    tour?.description || ""
  );
  const [duration, setDuration] = useState<string>(tour?.duration || "");
  const [recommendedAges, setRecommendedAges] = useState<string>(
    tour?.recommendedAges || ""
  );
  const [whatToBring, setWhatToBring] = useState<string>(
    tour?.whatToBring || ""
  );
  const [selectedAddress, setSelectedAddress] = useState<any>(
    tour?.address || null
  );
  const [price, setPrice] = useState<number | "">(tour?.price || "");
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>(
    tour?.tourDates || []
  );
  const [currentSelectedDate, setCurrentSelectedDate] =
    useState<SelectedDate | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState(tour?.tourPhotos || []);

  const [ratingValue, setRatingValue] = useState<string>("");

  const [onDrop] = useOnDrop(cloudinaryImage =>
    setUploadedFiles(prevState => [...prevState, cloudinaryImage])
  );

  const removeImage = (public_id: string, signature: string) => {
    const promise = deleteImage(public_id, signature);
    setUploadedFiles(prevState =>
      prevState.filter(file => file.public_id !== public_id)
    );

    toast.promise(promise, {
      loading: "Removing Image...",
      success: "Image Removed!",
      error: "Error Removing Image.",
    });
  };

  const router = useRouter();

  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleRatingValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRatingValue(e.target.value);
  };
  const handleTotalRatingsChange = () => {
    if (ratingValue === "") return null;
    if (tour == null || tour?.rating == null) {
      const rating = {} as { ratingValue: number; totalRatings: number };
      rating.ratingValue = parseFloat(ratingValue);
      rating.totalRatings = 1;
      return rating;
    }
    const rating = {} as { ratingValue: number; totalRatings: number };
    const ratings = tour.rating.ratingValue * tour.rating.totalRatings;
    const newRatings = ratings + ratingValue;
    const newTotalRatings = tour.rating.totalRatings + 1;
    const newRatingValue = parseFloat(newRatings) / newTotalRatings;

    rating.ratingValue = newRatingValue;
    rating.totalRatings = newTotalRatings;

    return rating;
  };

  useClickOutside(datePickerRef, () => {
    setDatePickerOpen(false);
  });

  // Add a new date to selected dates
  const addDate = (date: Date) => {
    const newDate = { date: date, time: { hour: 1, minute: 0 } };
    setSelectedDates(prevDates => [...prevDates, newDate]);
    setCurrentSelectedDate(newDate);
  };

  // Remove a date from selected dates
  const removeDate = (date: Date) => {
    setSelectedDates(prevDates => prevDates.filter(d => d.date !== date));

    if (currentSelectedDate?.date === date) {
      setCurrentSelectedDate(null);
    }
  };

  // Set the currently selected date
  const selectDate = (selectedDate: SelectedDate) => {
    setCurrentSelectedDate(selectedDate);
  };

  // Change the time of the tour
  const changeTime = (date: Date, hour: number, minute: number) => {
    setSelectedDates(prevDates =>
      prevDates.map(d => {
        if (d.date === date) return { ...d, time: { hour, minute } };
        return d;
      })
    );
  };

  // Open the date picker
  const openDatePicker = () => {
    setDatePickerOpen(true);
  };

  // Handle the form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const tour = {
      guideId: user?._id,
      title: tourTitle,
      category: category,
      description: description,
      duration: duration,
      recommendedAges: recommendedAges,
      whatToBring: whatToBring,
      address: {
        placeName: selectedAddress?.place_name,
        coordinates: selectedAddress?.geometry?.coordinates,
      },
      price: price,
      tourDates: selectedDates,
      tourPhotos: uploadedFiles,
      bookedTourists: [],
    } as any;

    const rating = handleTotalRatingsChange();

    if (rating) {
      tour.rating = rating;
    }

    await submitForm(tour);
  };

  const clearForm = () => {
    setTourTitle("");
    setCategory("");
    setDescription("");
    setDuration("");
    setRecommendedAges("");
    setWhatToBring("");
    setSelectedAddress(null);
    setPrice(0);
    setSelectedDates([]);
    setCurrentSelectedDate(null);
  };

  const { value, handleAddressChange, suggestions } =
    useAddressAutocomplete("");

  return (
    <form className="mb-10" id="tourForm" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-none grid-rows-5 md:grid-rows-4 justify-center items-center w-full pt-14 md:pt-20 px-2 md:p-5 bg-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-5 items-center md:gap-5 lg:gap-10 h-full row-span-4 md:row-span-3">
          <div className="flex flex-col gap-5 w-full md:col-span-4">
            {/* Title Input */}
            <TourTitleInput value={tourTitle} handleChange={setTourTitle} />

            {/* Category Select */}
            <FormSelect
              name="category"
              defaultText="Select a category"
              optionsList={[
                "Hiking",
                "Cruise",
                "Bus",
                "Helicopter",
                "City",
                "National Park",
                "Historical Places",
              ]}
              selectStyles="flex flex-col bg-white rounded-lg w-52 h-[54px] relative"
              value={category}
              handleChange={setCategory}
            />
          </div>

          {/* Image Upload */}
          <TourImageUpload />
          <Modal
            uploadedFiles={uploadedFiles}
            onDrop={onDrop}
            removeImage={removeImage}
          />
        </div>

        <div className="w-full h-32 row-span-1">
          {!modalOpen && uploadedFiles.length > 0 && (
            <PreviewThumbnails
              modal={false}
              uploadedFiles={uploadedFiles}
              removeImage={removeImage}
            />
          )}
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
              selectStyles="flex flex-col w-full h-[54px] relative"
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
              selectStyles="flex flex-col bg-transparent w-full h-[54px] relative"
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
            <AddressInput
              defaultValue={tour?.address?.placeName}
              value={value}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              handleAddressChange={handleAddressChange}
              suggestions={suggestions}
              autofillAddress={null}
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
                onValueChange={values => setPrice(+values.value)}
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
                  (acc, curr) =>
                    acc + new Date(curr.date).toLocaleDateString() + ", ",
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
            <div>
              <input
                type="text"
                value={ratingValue}
                placeholder="rating value"
                onChange={handleRatingValueChange}
              />
            </div>
          </div>

          {/* Guide Image */}
          {user && (
            <div className="relative mx-auto rounded-full">
              <Image
                src={user.profileImage.secure_url}
                alt="guide"
                width={240}
                height={240}
                className="object-cover rounded-full"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center gap-10 mt-10">
        <Button color="btn-primary" type="submit" size="btn-lg">
          {router.pathname === "/create-tour" ? "Save" : "Update"}
        </Button>
        <Button
          color="btn-error"
          type="button"
          size="btn-lg"
          onClick={deleteTour != null ? deleteTour : clearForm}>
          {router.pathname === "/create-tour" ? "Clear" : "Delete"}
        </Button>
      </div>
    </form>
  );
};

export default TourForm;

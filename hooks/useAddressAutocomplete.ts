import { ChangeEvent, useState } from "react";

const useAddressAutocomplete = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue),
    [suggestions, setSuggestions] = useState<any[]>([]);

  const MAPBOX_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&country=US&types=address&autocomplete=true`;

  const handleAddressChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    try {
      const response = await fetch(MAPBOX_ENDPOINT);
      const results = await response.json();
      console.log(results);
      setSuggestions(results.features);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    value,
    handleAddressChange,
    suggestions,
  };
};

export default useAddressAutocomplete;

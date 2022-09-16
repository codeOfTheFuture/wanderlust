import { ChangeEvent, useState } from "react";

const useAddressAutocomplete = (initialValue: string) => {
  const [address, setAddress] = useState<string>(initialValue),
    [suggestions, setSuggestions] = useState<any[]>([]);

  const MAPBOX_ENDPOINT = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&country=US&autocomplete=true`;

  const handleAddressChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);

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
    address,
    onChange: handleAddressChange,
    suggestions,
  };
};

export default useAddressAutocomplete;

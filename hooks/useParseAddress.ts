import { useSelector } from "react-redux";
import { stateAbbrLookup } from "./../utils/stateAbbrLookup";
import { useState } from "react";
import { useEffect } from "react";
import { selectUser } from "../store/slices/userSlice";
import { User } from "../types/typings";

const useParseAddress = (selectedAddress: string) => {
  const user = useSelector(selectUser) as User;

  const [streetAddress, setStreetAddress] = useState<string>("");
  const [city, setCity] = useState<string>(user?.city || "");
  const [state, setState] = useState<string>(user?.state || "");
  const [zipCode, setZipCode] = useState<string>(user?.zipCode || "");

  useEffect(() => {
    if (selectedAddress) {
      const parsedAddress = selectedAddress.split(", "),
        stateZipCodeSplit = parsedAddress[2].split(" ");

      setStreetAddress(parsedAddress[0]);

      setCity(parsedAddress[1]);

      if (stateZipCodeSplit.length === 2) {
        setState(stateAbbrLookup(stateZipCodeSplit[0])!);
        setZipCode(stateZipCodeSplit[1]);
      }

      if (stateZipCodeSplit.length === 3) {
        setState(
          stateAbbrLookup(
            [stateZipCodeSplit[0], stateZipCodeSplit[1]].join(" ")
          )!
        );
        setZipCode(stateZipCodeSplit[2]);
      }
    }
  }, [selectedAddress]);

  return {
    streetAddress,
    city,
    state,
    zipCode,
    setStreetAddress,
    setCity,
    setState,
    setZipCode,
  };
};

export default useParseAddress;

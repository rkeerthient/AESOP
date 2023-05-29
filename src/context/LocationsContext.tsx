import * as React from "react";
import { useState } from "react";
import { useContext } from "react";

const LocationsContext = React.createContext<any>({});

export const LocationsProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [selectedLocation, setSelectedLocation] = useState<any>();
  const [selectedLocationData, setSelectedLocationData] = useState<any>();

  return (
    <LocationsContext.Provider
      value={React.useMemo(
        () => ({
          selectedLocation,
          setSelectedLocation,
          selectedLocationData,
          setSelectedLocationData,
        }),
        [
          selectedLocation,
          setSelectedLocation,
          selectedLocationData,
          setSelectedLocationData,
        ]
      )}
    >
      {children}
    </LocationsContext.Provider>
  );
};
// make sure use
export const useLocationsContext = () => {
  return useContext(LocationsContext);
};

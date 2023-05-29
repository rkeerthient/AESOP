import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../types/search/locations";
import Hours from "./hours";
import HoursText from "./HoursText";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};

const UnivLocationCard: CardComponent<Location> = ({ result }) => {
  const { hours, address } = result.rawData;

  var gmaps = "https://www.google.com/maps/dir/?api=1&destination=";
  var gmapsAddress = gmaps.concat(
    address.line1!,
    " ",
    address.city!,
    " ",
    address.region!,
    " ",
    address.postalCode!
  );
  var gmapsLink = gmapsAddress.concat('"');

  return (
    <div className="p-4 border-transparent border hover:border hover:border-gray-400 hovCards  ">
      <div className="flex w-full flex-col">
        <div className="flex justify-between">
          <div className="text-slate-900 text-2xl">{result.rawData.name}</div>
          <div>
            <p className="mt-1 text-xs italic text-slate-500">
              {metersToMiles(result.distanceFromFilter ?? 0)} mi
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className=" space-y-3">
            <div>
              <p className="text-sm text-slate-700">{address.line1}</p>
              <p className="text-sm text-slate-700">
                {address.city}, {address.region}, {address.postalCode}{" "}
              </p>
            </div>
            <div className="text-sm text-slate-700 font-semibold">
              {result.rawData.mainPhone}
            </div>
          </div>
          {/* <div>
            {hours && (
              <HoursText
                hours={hours}
                timezone={result.rawData.timezone}
              ></HoursText>
            )}
          </div> */}
          <div className="mt-4 flex flex-col space-y-2">
            <a
              target="_blank"
              href={gmapsLink}
              className="text-sm text-center bg-gray-800 text-white py-4 px-8"
            >
              Get Directions
            </a>
            <a
              target="_blank"
              href={result.rawData.slug}
              className="text-sm text-center bg-gray-800 text-white py-4 px-8"
            >
              View Store Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnivLocationCard;

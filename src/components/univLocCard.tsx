import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../types/search/locations";
import Hours from "./hours";

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
    <div className="p-4 border border-transparent hover:border hover:border-gray-400 hovCards">
      <a
        target="_blank"
        href={`${result.rawData.slug}`}
        className="space-y-6 grid grid-cols-3"
      >
        <div>
          <h1 className="text-slate-900 text-3xl">{result.rawData.name}</h1>
          <div>
            <p className="text-sm text-slate-700">{address.line1}</p>
            <p className="text-sm text-slate-700">
              {address.city}, {address.region}, {address.postalCode}{" "}
            </p>
            <p className="mt-1 text-xs italic text-slate-500">
              {metersToMiles(result.distanceFromFilter ?? 0)} mi
            </p>
          </div>
        </div>
        <div>{hours && <Hours title={""} hours={hours}></Hours>} </div>
        <div className="mt-4">
          <a
            target="_blank"
            href={gmapsLink}
            className="CTA-1 !px-6 !py-3 !text-sm hover:underline"
          >
            Get Directions
          </a>
        </div>
      </a>
    </div>
  );
};

export default UnivLocationCard;

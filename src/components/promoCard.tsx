import * as React from "react";
import Ce_promotion from "../types/promotion";
import { CardProps } from "@yext/search-ui-react";

const PromoCard = (props: CardProps<Ce_promotion>) => {
  const { result } = props;
  console.log(JSON.stringify(result.rawData));
  return (
    <div className="w-full ">
      <div className="relative">
        <img
          src={result.rawData.photoGallery![0].image.url}
          alt=""
          className="h-1/2 w-auto"
        />
        <div className="absolute w-2/3 top-1/2 left-8 text-white flex flex-col space-y-8  transform -translate-y-1/2">
          <div className="text-lg font-bold">{result.rawData.name}</div>
          <div>{result.rawData.richTextDescription}</div>
          <a href={result.rawData.c_primaryCTA?.link} className="promo-cta">
            {result.rawData.c_primaryCTA?.label}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;

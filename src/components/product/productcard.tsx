import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Product from "../../types/products";

const ProductCard = (props: CardProps<Product>) => {
  const { result } = props;

  return (
    <a href={result.rawData.slug}>
      <div className="flex flex-col hovCards p-4">
        {result.rawData.c_prodImageUrls && (
          <img
            src={result.rawData.c_prodImageUrls![0]}
            alt=""
            className="w-auto h-72"
          />
        )}
        <div className="flex flex-col space-y-8 text-center text-sm resCntr">
          <div className="flex flex-col space-y-3 mt-4">
            <div className="text-gray-800 font-bold">{result.name}</div>
            {/* <div className="text-gray-600 font-light">
              {result.rawData.price?.currencyCode} {result.rawData.price?.value}
            </div> */}
          </div>
          {result.rawData.c_suitedTo && (
            <span className="dummy">
              <div className="py-2 flex gap-2 text-left h-28">
                <div className=" text-gray-800 font-bold">Suited to</div>
                <div className="flex-1">
                  {result.rawData.c_suitedTo.toString().replaceAll(",", ", ")}
                </div>
              </div>
              <hr className="border border-gray-300" />
            </span>
          )}
          {result.rawData.c_skinFeel && (
            <span className="dummy">
              <div className="py-2 flex gap-2 text-left h-28">
                <div className="text-sm text-gray-800 font-bold">Skin feel</div>
                <div>
                  {result.rawData.c_skinFeel.toString().replaceAll(",", ", ")}
                </div>
              </div>
              <hr className="border border-gray-300" />
            </span>
          )}
          {result.rawData.c_aroma && (
            <span className="dummy">
              <div className="py-2 flex gap-2 text-left h-28">
                <div className="  text-gray-800 font-bold">Aroma</div>
                <div>
                  {result.rawData.c_aroma.toString().replaceAll(",", ", ")}
                </div>
              </div>
              <hr className="border border-gray-300" />
            </span>
          )}
          {result.rawData.c_ingredients && (
            <span className="dummy">
              <div className="py-2 flex gap-2 text-left h-28">
                <div className="  text-gray-800 font-bold">Key ingredients</div>
                <div>
                  {result.rawData.c_ingredients
                    .toString()
                    .replaceAll(",", ", ")}
                </div>
              </div>
              <hr className="border border-gray-300" />
            </span>
          )}
          {result.rawData.c_sizes && (
            <span className="dummy">
              <div className="py-2 flex gap-2 text-left h-28">
                <div className="  text-gray-800 font-bold">Sizes</div>
                <div>
                  <ul className="flex justify-start space-x-6">
                    {result.rawData.c_sizes.map((item: any, index: any) => (
                      <li className="gap-2 flex" key={index}>
                        <input type="radio" value={item} name="gender" />
                        <div>{item} mL</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <hr className="border border-gray-300" />
            </span>
          )}
          {result.rawData.c_contents && (
            <span className="dummy">
              <div className="py-2 flex gap-2 text-left h-28">
                <div className="  text-gray-800 font-bold">Contents</div>
                <div>
                  <div className="flex-1">
                    {result.rawData.c_contents.toString().replaceAll(",", ", ")}
                  </div>
                </div>
              </div>
              <hr className="border border-gray-300" />
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          {result.rawData.c_primaryCTA && (
            <a
              href={result.rawData.slug}
              className="w-full text-sm text-center bg-gray-800 text-white py-4 px-8 "
            >
              {result.rawData.c_primaryCTA.label} - £
              {result.rawData.price?.value}
            </a>
          )}
          {result.rawData.c_primaryCTA && (
            <a
              href={result.rawData.slug}
              className="w-full text-sm text-center bg-gray-800 text-white py-4 px-8"
            >
              Learn more
            </a>
          )}
        </div>
      </div>
    </a>
  );
};

export default ProductCard;

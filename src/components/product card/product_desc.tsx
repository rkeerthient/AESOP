import * as React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

const Product_desc = ({ document }: any) => {
  const {
    name,
    price,
    richTextDescription,
    c_aroma,
    c_category,
    c_category2,
    c_howToUse,
    c_howToUseImage,
    c_ingredients,
    c_prodImageUrls,
    c_sizes,
    c_skinFeel,
    c_suitedTo,
    landingPageUrl,
  } = document;
  return (
    <div
      className="md:w-1/4 mr-12 space-y-4"
      style={{ marginLeft: "calc(8.33333% - 50px)" }}
    >
      <h1 className="text-3xl font-light">{name}</h1>
      <div>{richTextDescription}</div>
      <hr className="border border-black" />
      {c_suitedTo && (
        <>
          <div className="py-2">
            <div className="  text-gray-800 font-bold">Suited to</div>
            <div>{c_suitedTo.toString().replace(",", " ,")}</div>
          </div>
          <hr className="border border-gray-300" />
        </>
      )}
      {c_skinFeel && (
        <>
          <div className="py-2">
            <div className="text-sm text-gray-800 font-bold">Skin feel</div>
            <div>{c_skinFeel.toString().replace(",", " ,")}</div>
          </div>
          <hr className="border border-gray-300" />
        </>
      )}
      {c_aroma && (
        <>
          <div className="py-2">
            <div className="  text-gray-800 font-bold">Aroma</div>
            <div>{c_aroma.toString().replace(",", " ,")}</div>
          </div>
          <hr className="border border-gray-300" />
        </>
      )}
      {c_ingredients && (
        <>
          <div className="py-2">
            <div className="  text-gray-800 font-bold">Key ingredients</div>
            <div>{c_ingredients.toString().replace(",", " ,")}</div>
          </div>
          <hr className="border border-gray-300" />
        </>
      )}
      {c_sizes && (
        <>
          <div className="py-2">
            <div className="  text-gray-800 font-bold">Sizes</div>
            <div>
              <ul className="flex justify-start space-x-6">
                {c_sizes.map((item: any, index: any) => (
                  <li className="gap-2 flex" key={index}>
                    <input type="radio" value={item} name="gender" />
                    <div>{item} mL</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="border border-gray-300" />
        </>
      )}

      {price && (
        <div className="w-full text-center bg-gray-800 text-white py-4 px-8">
          Add to your cart — {price.currencyCode}
          {price.value}
        </div>
      )}
      <div className="flex space-x-2 items-center">
        <HeartIcon className="h-5 w-5" />
        <div>Save to cabinet</div>
      </div>
      <div>
        <div>
          Pay in 30 days with <span className="font-bold">Klarna</span>.{" "}
          <span className="underline hover:cursor-pointer">Learn more</span>
        </div>
        <div>18+, T&C apply, Credit subject to status.</div>
      </div>
    </div>
  );
};

export default Product_desc;

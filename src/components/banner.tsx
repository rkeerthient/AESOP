import * as React from "react";

type Banner = {
  text?: string;
  children?: React.ReactNode;
};

const Banner = (props: Banner) => {
  const { text, children } = props;

  return (
    <>
      <div className="relative  ">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://www.aesop.com/u1nb1km7t5q7/2xSDxwPeupo1LSePejlIaO/139f96d481c7be9fbfc2323e295a7a80/Aesop_Gloam_2023_Web_Homepage_1_Secondary_Mid_Desktop_2560x1440px.jpg"
            alt=""
          />
          <div className="absolute inset-0  " aria-hidden="true" />
        </div>
        <div className="section relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8 w-1/3 ">
          <h1 className="text-4xl  font-bold tracking-tight text-white sm:text-3xl lg:text-3xl">
            Restore and revive
          </h1>
          <p className="mt-6    text-xl text-white">
            Our Geranium Leaf formulations are designed to polish, cleanse, and
            nourish from the neck down, while offering a sensory delight.
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;

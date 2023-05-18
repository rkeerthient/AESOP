import * as React from "react";
import Slider from "react-slick";
import Location from "../types/locations";
import HoursText from "./HoursText";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatPhoneNumber } from "react-phone-number-input";

const NearByStores = (props: any) => {
  const data = props.props[0].dm_directoryChildren;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {data && (
        <>
          <Slider {...settings}>
            {data.map((item: Location, index: any) => (
              <div key={index} className="p-4 border flex flex-row">
                <div className="textClass flex-col flex justify-between leading-6 font-normal">
                  <div className=" text-left text-sm ">
                    {item.name && (
                      <div>
                        <div className="mt-4 font-bold h-8">
                          {item.name.toUpperCase()}
                        </div>
                      </div>
                    )}
                    <div className="mt-4 ">
                      <div>{item.address.line1}</div>
                      <div>
                        {item.address.city}, {item.address.region} -{" "}
                        {item.address.postalCode}
                      </div>
                      <div className="underline hover:cursor-pointer mt-2">
                        {item.mainPhone && formatPhoneNumber(item.mainPhone)}
                      </div>
                      {item.services && (
                        <ul className="servList mt-4 flex flex-row">
                          {item.services.map((nItem: any, index: number) => (
                            <li key={index}>{nItem}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="mt-4 h-6">
                      {item.hours && <HoursText document={item}></HoursText>}
                    </div>
                    {item.slug && (
                      <div className="mt-4 text-left">
                        <a
                          key="uRL"
                          href={item.slug.split("/")[1]}
                          className="font-light text-lg text-blue-700 hover:underline"
                        >
                          Visit our store
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </>
      )}
    </>
  );
};

export default NearByStores;

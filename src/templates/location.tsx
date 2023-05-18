import * as React from "react";
import Banner from "../components/banner";
import Cta from "../components/cta";
import Hours from "../components/hours";
import PageLayout from "../components/PageLayout";
// import Favicon from "../public/yext-favicon.ico";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import Contact from "../components/contact";
import StaticMap from "../components/static-map";
import List from "../components/list";
import { Image } from "@yext/pages/components";
import { PhoneIcon } from "@heroicons/react/20/solid";
import NearByStores from "../components/NearByStores";
import BreadCrumbs from "../components/BreadCrumbs";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "photoGallery",
      "slug",
      "geocodedCoordinate",
      "services",
      "googleCoverPhoto",
      "dm_directoryParents.meta",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryChildren.name",
      "dm_directoryParents.dm_directoryChildren.address",
      "dm_directoryParents.dm_directoryChildren.hours",
      "dm_directoryParents.dm_directoryChildren.slug",
      "dm_directoryParents.dm_directoryChildren.timezone",
      "dm_directoryParents.dm_directoryChildren.mainPhone",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
      savedFilterIds: ["1318257633"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    photoGallery,
    geocodedCoordinate,
    services,
    __meta,
    description,
    googleCoverPhoto,
    dm_directoryParents,
  } = document;

  return (
    <>
      <PageLayout _site={_site} templateData={{ __meta, document }}>
        <div className="centered-container">
          <BreadCrumbs
            name={name}
            parents={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          ></BreadCrumbs>
          <div className="section">
            <h1 className="text-4xl font-bold text-center">{name}</h1>
            <hr className="my-4" />

            <div className="grid grid-cols-3 gap-x-10 gap-y-10">
              <div className=" p-5 space-y-2">
                <div>
                  <div>{address.line1}</div>
                  {address.line2 && <div>{address.line2}</div>}
                  <div>{address.city}, </div>
                  {address.region && <div> {address.region}</div>}
                  <div>{address.postalCode}</div>
                </div>
                <div className="mt-4 items-center flex gap-2">
                  <PhoneIcon className="w-5 h-5" />
                  <div>
                    {mainPhone &&
                      mainPhone
                        .replace("+1", "")
                        .replace(/\D+/g, "")
                        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                  </div>
                </div>
                <div className="CTA-1">Get Directions</div>
              </div>
              <div className="col-span-2 pt-5 space-y-4">
                <div>
                  No-Contact Curbside Pickup, In Store Pickup & Same Day
                  Delivery Now Available. Call us to place your no-contact
                  order. Shop online at kiehls.com for in store pickup.
                </div>
                <div>{hours && <Hours title={"Hours"} hours={hours} />}</div>
              </div>
            </div>
            {geocodedCoordinate && (
              <div className="w-full my-4">
                <StaticMap
                  latitude={geocodedCoordinate.latitude}
                  longitude={geocodedCoordinate.longitude}
                ></StaticMap>
              </div>
            )}
            {photoGallery && (
              <div className="mt-4 space-x-4 w-full flex gap-3 items-center  border p-2">
                <Image
                  image={photoGallery[0]}
                  className="!w-1/3 h-full"
                ></Image>
                <div className="flex flex-col space-y-2">
                  <div className="text-2xl font-bold">About {name}</div>
                  <div>{description}</div>
                </div>
              </div>
            )}

            <div className="mt-4">
              <h2 className="leading-3 w-full text-center border-b-2 border-black mt-10 mb-5 mx-0 ">
                <span className="px-4 bg-white">Near by locations</span>
              </h2>
              <NearByStores
                props={dm_directoryParents.filter(
                  (item: any) => item.meta.entityType.id === "ce_city"
                )}
              />
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;

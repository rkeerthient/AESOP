import * as React from "react";
import Banner from "../components/banner";
import Address from "../components/Address";
import PageLayout from "../components/PageLayout";
import BreadCrumbs from "../components/BreadCrumbs";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import Favicon from "../public/yext-favicon.ico";
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
import HoursText from "../components/HoursText";

export const config: TemplateConfig = {
  stream: {
    $id: "cities",
    filter: {
      savedFilterIds: ["dm_directory-2_address_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "hours",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryParents.c_addressRegionDisplayName",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `${document.slug.toString()}`;
};

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
          description: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
}) => {
  const {
    _site,
    name,
    description,
    slug,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;

  var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
    var a = a.name;
    var b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });
  const childrenDivs = dm_directoryChildren.map((entity: any) => (
    <div className="border-b grid grid-cols-3 pb-2">
      <p>
        <a
          className="font-medium !text-lg text-blue-700 hover:underline"
          href={relativePrefixToRoot + entity.slug}
        >
          {entity.name}
        </a>
      </p>
      <div>
        {entity.hours && <HoursText document={entity} />}
        <Address address={entity.address}></Address>
      </div>

      <div className="flex flex-col pt-1">
        <a
          key="uRL"
          href={relativePrefixToRoot + entity.slug}
          className="font-light text-base	text-blue-700 hover:underline"
        >
          View Store Page
        </a>
        <a
          key="uRL"
          className="font-light text-base	text-blue-700 hover:underline"
        >
          Get Directions
        </a>
      </div>
    </div>
  ));

  return (
    <>
      <PageLayout _site={_site} templateData={{ __meta, document }}>
        <div className="centered-container">
          <BreadCrumbs
            name={name}
            parents={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          ></BreadCrumbs>
          <div className="section space-y-14 px-10">
            <div className="space-y-6">
              <h1 className="text-left text-2xl">
                Contractor Locations Directory
              </h1>
              <Banner
                text={`${dm_directoryChildren.length} stores in ${name},${" "}
              ${slug.split("/")[0].toUpperCase()}`}
              />
              <p className="text-2xl text-center">{description}</p>
            </div>
            <div className="flex flex-col gap-y-5">{childrenDivs}</div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default City;

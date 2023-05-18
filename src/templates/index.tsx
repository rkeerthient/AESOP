import * as React from "react";
import PageLayout from "../components/PageLayout";
import Banner from "../components/banner";
import BreadCrumbs from "../components/BreadCrumbs";
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

export const config: TemplateConfig = {
  stream: {
    $id: "root",
    filter: {
      savedFilterIds: ["dm_directory-2"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.c_addressRegionDisplayName",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: "Home Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description:
            "This is a description for the Turtlehead Tacos directory home page.",
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

const Index: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
}) => {
  const { _site, dm_directoryChildren } = document;
  console.log(JSON.stringify(dm_directoryChildren));

  var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
    var a = a.name,
      b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });
  const childrenDivs = dm_directoryChildren.map((entity: any) => (
    <div className="border-b pb-2">
      <a
        key="uRL"
        href={relativePrefixToRoot + entity.slug}
        className="font-light text-normal text-blue-700 hover:underline"
      >
        {entity.name} ({entity.dm_directoryChildrenCount})
      </a>
    </div>
  ));

  return (
    <>
      <PageLayout _site={_site} templateData={{ __meta, document }}>
        <div className="centered-container">
          <BreadCrumbs name="Home" baseUrl={relativePrefixToRoot} />
          <div className="section space-y-6 px-10">
            <h1 className="text-left text-2xl">
              Contractor Locations Directory
            </h1>
            <p className="text-normal font-semibold text-left">
              {dm_directoryChildren &&
                dm_directoryChildren.flat().reduce(function (a: any, b: any) {
                  return parseInt(b["dm_directoryChildrenCount"]) == null
                    ? a
                    : a + parseInt(b["dm_directoryChildrenCount"]);
                }, 0)}{" "}
              stores in the Europe
            </p>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
              {childrenDivs}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Index;

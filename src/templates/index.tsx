import * as React from "react";
import "../index.css";
import Banner from "../components/banner";
import PageLayout from "../components/PageLayout";
import Favicon from "../public/yext-favicon.ico";
import {
  Template,
  GetPath,
  GetRedirects,
  TransformProps,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import SearchResults from "../components/SearchResults";
import { StandardCard } from "@yext/search-ui-react";

export const config: TemplateConfig = {
  name: "index.html",
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
    title: "Index Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: "This site was generated by the Yext SSG",
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
  const { _site } = document;

  return (
    <>
      <PageLayout
        _site={_site}
        templateData={{ __meta, document }}
        verticalKey={""}
      >
        <Banner text="Index Page"></Banner>
        <div className="centered-container">
          <div className="section space-y-10 px-10">
            <SearchResults
              verticalKey=""
              cardType={StandardCard}
              resultsCss={"grid grid-cols-3 gap-6"}
            ></SearchResults>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Index;
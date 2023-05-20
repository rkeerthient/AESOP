/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import type {
  Template,
  TemplateProps,
  TemplateRenderProps,
  GetPath,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import * as React from "react";
import "../index.css";
import SearchResults from "../components/SearchResults";
import PageLayout from "../components/PageLayout";
import ProductCard from "../components/product card/productcard";

export const config: TemplateConfig = {
  name: "products-grid",
};

export const getPath: GetPath<TemplateProps> = () => {
  return "products-grid";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "AESOP | Products",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};
const Products_Grid: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
}) => {
  const { _site } = document;

  return (
    <PageLayout _site={_site} templateData={{ __meta, document }}>
      <SearchResults
        verticalKey="products"
        cardType={ProductCard}
        resultsCss={"grid grid-cols-3 gap-6"}
      ></SearchResults>
    </PageLayout>
  );
};

export default Products_Grid;

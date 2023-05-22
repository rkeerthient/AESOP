import * as React from "react";
import Banner from "../components/banner";
import PageLayout from "../components/PageLayout";
import BreadCrumbs from "../components/BreadCrumbs";
import "../index.css";
import Favicon from "../public/yext-favicon.ico";
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
import ProductCard from "../components/product/productcard";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  LocationBias,
  VerticalResults,
} from "@yext/search-ui-react";
import CategoryGrid from "../components/categoryGrid";
import { FieldValueStaticFilter, Matcher } from "@yext/search-headless-react";

export const config: TemplateConfig = {
  stream: {
    $id: "sub-categories",
    filter: {
      savedFilterIds: ["dm_products-directory1_c_category2"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.c_suitedTo",
      "dm_directoryChildren.c_skinFeel",
      "dm_directoryChildren.c_prodImageUrls",
      "dm_directoryChildren.price",
      "dm_directoryChildren.dm_directoryChildrenCount",
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

const SubCategories: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
}) => {
  const {
    _site,
    name,
    description,
    dm_directoryParents,
    dm_directoryChildren,
    meta,
  } = document;
  const entityType = meta.entityType.id;

  const initialFilter: FieldValueStaticFilter = {
    kind: "fieldValue",
    fieldId:
      entityType === "ce_productsSubCategory"
        ? "ce_productsSubCategory.name"
        : "ce_productsSubCategory.dm_directoryParents.name",
    matcher: Matcher.Equals,
    value: name,
  };

  var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
    var a = a.name;
    var b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });

  const childrenDivs = dm_directoryChildren.map((entity: any, index: any) => {
    return (
      <a href={entity.slug} className="href" key={index}>
        <div className="pb-2">
          <div className="flex flex-col space-y-4">
            {entity.c_prodImageUrls && (
              <img
                src={entity.c_prodImageUrls[0]}
                alt=""
                className="w-auto h-72"
              />
            )}
            <div className="flex flex-col space-y-8 text-center text-sm">
              <div className="flex flex-col space-y-3">
                <div className="text-gray-800 font-bold">{entity.name}</div>
                <div className="text-gray-600 font-light">
                  {entity.price?.currencyCode} {entity.price?.value}
                </div>
              </div>

              {entity.c_suitedTo && (
                <>
                  <div className="py-2 flex gap-2 text-left h-8">
                    <div className=" text-gray-800 font-bold">Suited to</div>
                    <div className="flex-1">
                      {entity.c_suitedTo.toString().replaceAll(",", ", ")}
                    </div>
                  </div>
                  <hr className="border border-gray-300" />
                </>
              )}
              {entity.c_skinFeel && (
                <>
                  <div className="py-2 flex gap-2 text-left">
                    <div className="text-sm text-gray-800 font-bold">
                      Skin feel
                    </div>
                    <div>{entity.c_skinFeel.toString().replace(",", ", ")}</div>
                  </div>
                  <hr className="border border-gray-300" />
                </>
              )}
            </div>
          </div>
        </div>
      </a>
    );
  });

  var updatedDescription;
  if (description && description.includes("United States")) {
    updatedDescription = description.replace(
      "United States",
      "the United States"
    );
  } else {
    updatedDescription = description;
  }

  return (
    <>
      <PageLayout
        _site={_site}
        templateData={{ __meta, document }}
        verticalKey="products_subcategory"
      >
        <div className="centered-container">
          <BreadCrumbs
            name={name}
            parents={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <div className=" ">
            {/* <SearchBar
        hideRecentSearches={true}
        visualAutocompleteConfig={{
          entityPreviewSearcher: entityPreviewSearcher,
          includedVerticals: ["products"],
          renderEntityPreviews: renderEntityPreviews,
          universalLimit: { products: 4 },
          entityPreviewsDebouncingTime: 500,
        }}
        placeholder="search your product"
        customCssClasses={{
          searchBarContainer: "z-50",
          searchButtonContainer:
            "bg-orange-600 rounded-full text-white h-8 w-8",
        }}
      /> */}
            {/* <div className="flex"> */}
            {/* <div className="w-56 shrink-0 mr-5">
          <StandardFacets></StandardFacets>
        </div> */}
            {/* <div className="flex-grow">
                <div className="flex items-baseline">
                  <ResultsCount />
                  <AppliedFilters />
                </div>
                <VerticalResults
                  CardComponent={ProductCard}
                  customCssClasses={{
                    verticalResultsContainer: "grid grid-cols-3 gap-4",
                  }}
                />
                <Pagination
                  customCssClasses={{ paginationContainer: "mt-4" }}
                />
                <LocationBias />
              </div> */}
            {/* </div> */}
            <CategoryGrid
              verticalKey={"product"}
              initialFilter={initialFilter}
            ></CategoryGrid>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default SubCategories;

import {
  Result,
  provideHeadless,
  useSearchActions,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  DropdownItem,
  FocusedItemData,
  LocationBias,
  Pagination,
  RenderEntityPreviews,
  SearchBar,
  StandardCard,
  StandardFacets,
  VerticalResults,
  DirectAnswer,
  ResultsCount,
  SpellCheck,
  UniversalResults,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { CardComponent } from "@yext/answers-react-components";
import Product from "../types/products";
import { config } from "../config/searchConfig";
import * as React from "react";
import ProductCard from "./product/productcard";
import HelpArticlesCard from "./HelpArticlesCard";
import LocationCard from "./LocationCard";

type Props = {
  verticalKey?: string;
  cardType: CardComponent;
  resultsCss: string;
  queryTerm?: string;
};
const SearchResults = ({
  verticalKey,
  cardType,
  queryTerm,
  resultsCss,
}: Props) => {
  const searchActions = useSearchActions();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    verticalKey
      ? (searchActions.setVertical(verticalKey),
        searchActions.executeVerticalQuery())
      : searchActions.executeUniversalQuery();
  }, []);

  const GridSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-8 ">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };

  const LocationSection = ({ results, CardComponent, header }: any) => {
    return (
      <div>
        <div>{header}</div>
        {/* <div className="univLocMap">
          <Mapboxuniv data={results}></Mapboxuniv>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {results.map((r: any) => (
            <CardComponent result={r} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto mt-4">
      {verticalKey != "" ? (
        <div className="flex">
          <div
            className=" shrink-0 px-5  pt-5 mr-4"
            style={{ maxWidth: "18rem" }}
          >
            <StandardFacets />
          </div>
          <div className="flex-grow">
            <div className="flex items-baseline">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={cardType}
              customCssClasses={{
                verticalResultsContainer: resultsCss,
              }}
            />
            <Pagination customCssClasses={{ paginationContainer: "mt-4" }} />
            <LocationBias />
          </div>
        </div>
      ) : (
        <div>
          <SpellCheck />
          <DirectAnswer />
          <ResultsCount />
          <UniversalResults
            verticalConfigMap={{
              products: {
                CardComponent: ProductCard,
                SectionComponent: GridSection,
                viewAllButton: true,
              },
              faqs: {
                CardComponent: HelpArticlesCard,
                viewAllButton: true,
              },
              locations: {
                CardComponent: LocationCard,
                SectionComponent: LocationSection,
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;

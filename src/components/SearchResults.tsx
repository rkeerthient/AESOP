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
import { useEffect } from "react";
import { CardComponent } from "@yext/answers-react-components";
import Product from "../types/products";
import { config } from "../config/searchConfig";
import classNames from "classnames";
import * as React from "react";
import ProductCard from "./product/productcard";
import HelpArticlesCard from "./HelpArticlesCard";

type Props = {
  verticalKey?: string;
  cardType: CardComponent;
  resultsCss: string;
};
const SearchResults = ({ verticalKey, cardType, resultsCss }: Props) => {
  const searchActions = useSearchActions();
  useEffect(() => {
    verticalKey
      ? (searchActions.setVertical(verticalKey),
        searchActions.executeVerticalQuery())
      : searchActions.executeUniversalQuery;
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
  return (
    <div className="max-w-7xl mx-auto mt-4">
      {verticalKey != "" ? (
        <div className="flex">
          <div className="w-72 shrink-0 px-5 bg-white pt-5 mr-4">
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
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;

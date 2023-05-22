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

  const entityPreviewSearcher = provideHeadless({
    ...config,
    headlessId: "visual-autocomplete",
  });
  const renderEntityPreviews: RenderEntityPreviews = (
    autocompleteLoading,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ): any => {
    const productResults = verticalKeyToResults["products"]
      ?.results as unknown as Result<Product>[];

    return productResults ? (
      <div
        className={classNames("grid grid-cols-4 px-8 gap-8", {
          "opacity-50": autocompleteLoading,
        })}
      >
        {productResults.map((result, i) => (
          <DropdownItem
            key={result.rawData.id}
            value={result.rawData.name}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <a href={result.rawData.slug}>
              {result.rawData.c_prodImageUrls && (
                <img
                  src={result.rawData.c_prodImageUrls[0]}
                  alt=""
                  className="h-32 w-32 mx-auto"
                />
              )}
              <div className="text-sm">{result.name}</div>
            </a>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };
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
      {verticalKey ? (
        <div className="flex">
          {/* <div className="w-56 shrink-0 mr-5">
          <StandardFacets></StandardFacets>
        </div> */}
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

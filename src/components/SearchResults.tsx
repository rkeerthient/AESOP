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
  ResultsCount,
  SearchBar,
  StandardFacets,
  VerticalResults,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import { CardComponent } from "@yext/answers-react-components";
import Product from "../types/products";
import { config } from "../config/searchConfig";
import * as classNames from "classnames";

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
    console.log(productResults);

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
            <>
              {result.rawData.c_prodImageUrls && (
                <img
                  src={result.rawData.c_prodImageUrls[0]}
                  alt=""
                  className="h-32 w-32 mx-auto"
                />
              )}
              <div className="text-sm">{result.name}</div>
            </>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="max-w-7xl mx-auto mt-4">
      {verticalKey === "products" ? (
        <SearchBar
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
        />
      ) : (
        <SearchBar hideRecentSearches={true} />
      )}
      <div className="flex">
        <div className="w-56 shrink-0 mr-5">
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
    </div>
  );
};

export default SearchResults;

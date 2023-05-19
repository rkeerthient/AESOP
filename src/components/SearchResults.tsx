import { useSearchActions } from "@yext/search-headless-react";
import {
  AppliedFilters,
  LocationBias,
  Pagination,
  ResultsCount,
  SearchBar,
  StandardFacets,
  VerticalResults,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import { CardComponent } from "@yext/answers-react-components";

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
  return (
    <div className="max-w-7xl mx-auto mt-4">
      <SearchBar hideRecentSearches={true} />
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

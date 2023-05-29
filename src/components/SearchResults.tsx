import { useSearchActions } from "@yext/search-headless-react";
import {
  AppliedFilters,
  LocationBias,
  Pagination,
  StandardFacets,
  VerticalResults as VR,
  DirectAnswer,
  ResultsCount,
  SpellCheck,
  UniversalResults,
} from "@yext/search-ui-react";
import { useEffect } from "react";
import { CardComponent } from "@yext/answers-react-components";
import * as React from "react";
import ProductCard from "./product/productcard";
import HelpArticlesCard from "./HelpArticlesCard";
import LocationCard from "./LocationCard";
import PromoCard from "./promoCard";
import { useMyContext } from "../context/context";
import Mapboxuniv from "./Mapboxuniv";
import UnivLocationCard from "./univLocCard";
import { SortDropdown } from "./SortDropdown";

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
  const { promoData } = useMyContext();
  console.log(JSON.stringify(promoData));

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
        <div className="univLocMap ">
          <Mapboxuniv data={results}></Mapboxuniv>
        </div>
        <div className="flex flex-col w-full gap-4 mt-4">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto mt-4">
      {promoData && promoData.verticalResults && (
        <div className="mb-8">
          <PromoCard
            result={promoData.verticalResults[0].results[0]}
          ></PromoCard>
        </div>
      )}
      {verticalKey != "" ? (
        <div className="flex">
          <div
            className=" shrink-0 px-5  pt-5 mr-4"
            style={{ maxWidth: "18rem" }}
          >
            <StandardFacets />
          </div>
          <div className="flex-grow">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline">
                <ResultsCount />
                <AppliedFilters />
              </div>

              <SortDropdown />
            </div>
            <VR
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
                CardComponent: UnivLocationCard,
                SectionComponent: LocationSection,
              },
              promotion: {
                CardComponent: PromoCard,
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;

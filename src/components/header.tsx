import * as React from "react";
import { Image, Link } from "@yext/pages/components";
import {
  DropdownItem,
  FocusedItemData,
  RenderEntityPreviews,
  SearchBar,
  onSearchFunc,
} from "@yext/search-ui-react";
import {
  provideHeadless,
  useSearchActions,
  useSearchState,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import { config } from "../config/searchConfig";
import Product from "../types/products";
import { useEffect, useState } from "react";
import { useMyContext } from "../context/context";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/product-grid" },
  { name: "Locations Directory", href: "/locations" },
  { name: "Support", href: "/faq-list" },
];

export default function Header({ _site }: any) {
  const state = useSearchState((state) => state.vertical.verticalKey);
  const searchActions = useSearchActions();
  const { setPromoData } = useMyContext();
  const [path, setPath] = useState("");
  useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
    return () => {};
  }, []);
  const entityPreviewSearcher = provideHeadless({
    ...config,
    headlessId: "entity-preview-searcher",
  });

  const renderEntityPreviews: RenderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ): JSX.Element | null => {
    const productResults = verticalKeyToResults["products"]?.results.map(
      (result) => result.rawData
    ) as unknown as Product[];

    return productResults ? (
      <div className="grid grid-cols-4 px-8">
        {productResults.map((result) => (
          <DropdownItem
            key={result.id}
            value={result.name}
            onClick={() => history.pushState(null, "", `/product/${result.id}`)}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <DropdownItem
              key={result.id}
              value={result.name}
              ariaLabel={dropdownItemProps.ariaLabel}
            >
              <a href={result.slug}>
                {result.c_prodImageUrls && (
                  <img
                    src={result.c_prodImageUrls[0]}
                    alt=""
                    className="h-full w-32 mx-auto"
                  />
                )}
                <div className="text-sm">{result.name}</div>
              </a>
            </DropdownItem>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    const path = window.location.pathname;
    const queryParams = new URLSearchParams(window.location.search);
    console.log(["/index", undefined, "/"].includes(path));

    if (query) {
      queryParams.set("query", query);
    } else {
      queryParams.delete("query");
    }
    ["/index", undefined, "/"].includes(path)
      ? (query && searchActions.setQuery(query),
        searchActions.setUniversal(),
        searchActions.executeUniversalQuery())
      : path === "/product-grid"
      ? (searchActions.setUniversal(),
        query && searchActions.setQuery(query),
        searchActions.setUniversal(),
        searchActions
          .executeUniversalQuery()
          .then((res) =>
            res?.verticalResults[0].verticalKey === "promotion"
              ? setPromoData(res)
              : setPromoData("")
          )
          .then(() => {
            searchActions.setVertical("products");
            query && searchActions.setQuery(query);
            searchActions.executeVerticalQuery();
          }))
      : path.includes("products") &&
        (window.location.href = `/index?${queryParams.toString()}`);
  };

  // const handleSearch: onSearchFunc = (searchEventData) => {
  //   const { query } = searchEventData;

  //   const queryParams = new URLSearchParams(window.location.search);
  //   console.log("inn");

  //   if (query) {
  //     queryParams.set("query", query);
  //   } else {
  //     queryParams.delete("query");
  //   }
  //   window.location.href = `/index?${queryParams.toString()}`;
  // };

  return (
    <header>
      <nav className="mx-auto  px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-green-800 py-6 md:border-none">
          <div className="flex items-center">
            <Image image={_site.logo} className="!w-32	"></Image>
            <div className="ml-10 hidden space-x-8 md:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-black hover:underline"
                  rel="noopener noreferrer"
                  eventName={`cta Click: ${link.name}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4 flex-1">
            {!state || state === "products" ? (
              path && !path.includes("product-grid") ? (
                <SearchBar
                  hideRecentSearches={true}
                  customCssClasses={{ searchBarContainer: "!mb-0" }}
                  visualAutocompleteConfig={{
                    entityPreviewSearcher: entityPreviewSearcher,
                    includedVerticals: ["products"],
                    renderEntityPreviews: renderEntityPreviews,
                    universalLimit: { products: 4 },
                    entityPreviewsDebouncingTime: 300,
                  }}
                  onSearch={handleSearch}
                />
              ) : (
                <SearchBar
                  hideRecentSearches={true}
                  customCssClasses={{ searchBarContainer: "!mb-0" }}
                  visualAutocompleteConfig={{
                    entityPreviewSearcher: entityPreviewSearcher,
                    includedVerticals: ["products"],
                    renderEntityPreviews: renderEntityPreviews,
                    universalLimit: { products: 4 },
                    entityPreviewsDebouncingTime: 300,
                  }}
                  onSearch={handleSearch}
                />
              )
            ) : (
              <SearchBar
                customCssClasses={{ searchBarContainer: "!mb-0" }}
                hideRecentSearches={true}
              />
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 md:hidden">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:underline"
              rel="noopener noreferrer"
              eventName={`cta Click: ${link.name}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

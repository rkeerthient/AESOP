import * as React from "react";
import { Link } from "@yext/pages/components";
import {
  DropdownItem,
  FocusedItemData,
  RenderEntityPreviews,
  SearchBar,
} from "@yext/search-ui-react";
import {
  provideHeadless,
  Result,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import * as classNames from "classnames";
import { config } from "../config/searchConfig";
import Product from "../types/products";

const navigation = [
  { name: "Home", href: "/index.html" },
  { name: "Products", href: "/products-grid" },
  { name: "Locations Directory", href: "/locations" },
  { name: "Support", href: "/faq-list" },
];
//test
export default function Header({ _site, verticalKey }: any) {
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
    <header>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-green-800 py-6 md:border-none">
          <div className="flex items-center">
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
            <SearchBar
              visualAutocompleteConfig={{
                includedVerticals: ["products"],
                entityPreviewSearcher,
                renderEntityPreviews,
                entityPreviewsDebouncingTime: 500,
              }}
            />
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

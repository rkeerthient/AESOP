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
  useSearchState,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import { config } from "../config/searchConfig";
import Product from "../types/products";

const navigation = [
  { name: "Home", href: "/index.html" },
  { name: "Products", href: "/products-grid" },
  { name: "Locations Directory", href: "/locations" },
  { name: "Support", href: "/faq-list" },
];

export default function Header({ _site }: any) {
  const state = useSearchState((state) => state.vertical.verticalKey);

  const entityPreviewSearcher = provideHeadless({
    ...config,
    headlessId: "entity-preview-searcher",
  });

  const renderProductPreview = (product: Product): JSX.Element => {
    const numThumbnails = product.primaryPhoto?.image.thumbnails?.length || 0;
    const productThumbnail =
      product.primaryPhoto?.image.thumbnails?.[numThumbnails - 1];

    return (
      <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 ">
        {productThumbnail && (
          <img className="w-32" src={productThumbnail.url} />
        )}
        <div className="font-semibold pl-3">{product.name}</div>
      </div>
    );
  };

  const renderEntityPreviews = (
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
        {productResults.map((result, i) => (
          <DropdownItem
            key={result.id}
            value={result.name}
            onClick={() => history.pushState(null, "", `/product/${result.id}`)}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            {renderProductPreview(result)}
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
            {!state || state === "products" ? (
              <SearchBar
                visualAutocompleteConfig={{
                  entityPreviewSearcher: entityPreviewSearcher,
                  includedVerticals: ["products"],
                  renderEntityPreviews: renderEntityPreviews,
                  universalLimit: { products: 4 },
                  entityPreviewsDebouncingTime: 300,
                }}
              />
            ) : (
              <SearchBar />
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

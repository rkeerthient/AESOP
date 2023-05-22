import * as React from "react";
import { Link } from "@yext/pages/components";
import { SearchBar } from "@yext/search-ui-react";

const navigation = [
  { name: "Home", href: "/index.html" },
  { name: "Products", href: "/products-grid" },
  { name: "Locations Directory", href: "/locations" },
  { name: "Support", href: "/faqs" },
];
//test
export default function Header({ _site }: any) {
  return (
    <header>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-green-800 py-6 md:border-none">
          <div className="flex items-center">
            {/* <a href="/index.html">
              <span className="sr-only">Turtlehead Tacos</span>
            </a> */}
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
              customCssClasses={{ searchBarContainer: "!mb-0" }}
            ></SearchBar>
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

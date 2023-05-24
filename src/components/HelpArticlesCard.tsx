import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CardProps } from "@yext/search-ui-react";
import RTF from "./RTF";
import { log } from "console";
import Faq from "../types/faqs";
import * as React from "react";

export default function HelpArticlesCard(props: CardProps<Faq>) {
  const { result } = props;
  const faqRawData = result.rawData;

  return (
    <>
      {faqRawData.answer && (
        <div className="w-full px-4 pt-2">
          <div className="mx-auto w-full p-2  border-b border-gray-400">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between rounded-lg  py-2 text-left text-sm  focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                    <span className="text-lg  ">
                      {faqRawData.name.replace(" | Dell US", "")}
                    </span>
                    <ChevronDownIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-8 w-8`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className=" pb-2 text-sm  flex flex-col">
                    <RTF>{faqRawData.answer}</RTF>
                    <a
                      href={faqRawData.landingPageUrl}
                      className="CTA-1 text-center !w-fit"
                    >
                      Learn more
                    </a>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      )}
    </>
  );
}

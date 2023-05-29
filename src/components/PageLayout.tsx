import * as React from "react";
import Img, { Image } from "./Img";
import Header from "./header";
import Footer from "./footer";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import { TemplateProps } from "@yext/pages";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { config } from "../config/searchConfig";
import { MyContextProvider } from "../context/context";
import { LocationsProvider } from "../context/LocationsContext";

type Props = {
  title?: string;
  _site?: any;
  templateData: TemplateProps;
  children?: React.ReactNode;
  verticalKey?: string;
};
export const searcher = provideHeadless(config);

const PageLayout = ({
  title,
  _site,
  children,
  verticalKey,
  templateData,
}: Props) => {
  return (
    <MyContextProvider>
      <LocationsProvider>
        <SearchHeadlessProvider searcher={searcher}>
          <AnalyticsProvider templateData={templateData}>
            <div className="min-h-screen">
              <AnalyticsScopeProvider name={"header"}>
                <Header _site={_site} verticalKey={verticalKey} />
              </AnalyticsScopeProvider>
              <StateManager>{children}</StateManager>{" "}
              <AnalyticsScopeProvider name={"footer"}>
                <Footer _site={_site} />
              </AnalyticsScopeProvider>
            </div>
          </AnalyticsProvider>
        </SearchHeadlessProvider>
      </LocationsProvider>
    </MyContextProvider>
  );
};
const StateManager = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default PageLayout;

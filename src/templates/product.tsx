import * as React from "react";
import PageLayout from "../components/PageLayout";
// import Favicon from "../public/yext-favicon.ico";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import Product_desc from "../components/product/product_desc";
import RTF from "../components/RTF";
import MarkdownView from "react-showdown";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "products",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "price",
      "richTextDescription",
      "c_aroma",
      "c_category",
      "c_category2",
      "c_howToUse",
      "c_howToUseImage",
      "c_ingredients",
      "c_prodImageUrls",
      "c_sizes",
      "c_skinFeel",
      "c_suitedTo",
      "photoGallery",
      "landingPageUrl",
      "c_contents",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["product"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : `${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    __meta,
    slug,
    price,
    richTextDescription,
    c_aroma,
    c_category,
    c_category2,
    c_howToUse,
    c_howToUseImage,
    c_ingredients,
    c_prodImageUrls,
    c_sizes,
    c_skinFeel,
    c_suitedTo,
    photoGallery,
    landingPageUrl,
  } = document;

  return (
    <>
      <PageLayout _site={_site} templateData={{ __meta, document }}>
        <div className="section mx-16 ">
          <div className="py-32 text-sm  text-gray-600  font-normal">
            <div className="flex flex-row justify-end">
              <div className="md:w-1/3 my-auto">
                {c_prodImageUrls && (
                  <img
                    src={c_prodImageUrls[0]}
                    alt=""
                    className="mx-auto max-w-md	"
                  />
                )}
              </div>
              <Product_desc document={document}></Product_desc>
            </div>
          </div>
        </div>
        <div className="section mx-16 ">
          <div className="flex text-sm  text-gray-600  font-normal">
            <div className="text-center  w-1/2 flex flex-col space-y-2 border-right border-r-2">
              <div className="font-bold ">Click and Collect</div>
              <div className="w-1/2 mx-auto">
                Choose in-store collection at checkout to pick up your order at
                select Aesop locations.
              </div>
            </div>
            <div className="text-center w-1/2 flex flex-col space-y-2  ">
              <div className="font-bold ">Pay with Klarna</div>
              <div className="w-1/2 mx-auto">
                Select Klarna at checkout to pay in three interest-free
                instalments and enjoy your purchase imminently.
              </div>
            </div>
          </div>
        </div>
        <div className="section border" style={{ height: "90vh" }}>
          <div className="flex min-h-screen	flex-row">
            <div className="w-1/2">
              <img
                src={
                  "https://www.aesop.com/u1nb1km7t5q7/5mCgX0hKcjErF1veMUpPOj/7693f1905c6f19f37e77c2588d6dc646/Aesop-Skin-Classic-Purifying-Facial-Cream-Cleanser-Texture-50-50-Desktop-1440x1500px.jpg"
                }
                alt=""
              />
            </div>
            <div className="w-1/2" style={{ background: "#f6f5e8" }}>
              <MarkdownView markdown={c_howToUse.toString()} />
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;

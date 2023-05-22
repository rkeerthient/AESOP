import { useSearchActions } from "@yext/search-headless-react";
import * as React from "react";
import { useLayoutEffect } from "react";

const CategoryGrid = (props: any) => {
  const searchActions = useSearchActions();
  let vertKey = props.verticalKey;
  useLayoutEffect(() => {
    searchActions.setVertical("products");
    searchActions
      .executeVerticalQuery()
      .then((res) => console.log(JSON.stringify(res)));
  });
  return <div></div>;
};

export default CategoryGrid;

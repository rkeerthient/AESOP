import * as React from "react";
import { useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
type linkItems = {
  name: string;
  slug: string;
};
const NavLinks = ({ _site }: any) => {
  const navItems = _site.c_productRoot[0].dm_directoryChildren;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2">
      {navItems.map((item: any, index: any) => {
        return (
          <span key={index} className="border">
            <Menu menuButton={<MenuButton>{item.name}</MenuButton>}>
              {item.dm_directoryChildren &&
                item.dm_directoryChildren.map((item: any, index: any) => (
                  <a href={item.slug}>
                    <MenuItem>{item.name}</MenuItem>
                  </a>
                ))}
            </Menu>
          </span>
        );
      })}
    </div>
  );
};

export default NavLinks;

"use client";
import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navbarItems = [
  { name: "Нүүр", link: "/" },
  { name: "Хүнсний жагсаалт", link: "/scanGrocery" },
  // { name: "Шим Тэжээл", link: "/nutrition" },
  // { name: "Хоолны Жор Бэлдэх", link: "/recipes" },
];

export function NavigationMenuDemo() {
  return (
    <div className=" flex justify-center m-2 p-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {navbarItems.map((item, index) => {
              return (
                <Link key={index} href={item.link} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()}`}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              );
            })}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

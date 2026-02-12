type Submenu = {
  href: string;
  label: string;
};

type MenuPorps = {
  href: string;
  label: string;
  submenus?: Submenu[];
};

export function MenuList(pathname: string) {
  return [
    {
      menus: [
        {
          href: "",
          label: "Posts",
          submenus: [
            {
              href: "/articles",
              label: "All Articles",
            },
            {
              href: "/articles/add",
              label: "Add Article",
            },
            {
              href: "/articles/drafts",
              label: "Drafts",
            },
            {
              href: "/articles/published",
              label: "Published",
            },
          ],
        },
        {
          href: "/categories",
          label: "Categories",
        },
        {
          href: "/tags",
          label: "Tags",
        },
      ],
    },
  ];
}

export type NavSubItem = {
  href: string;
  label: string;
};

export type NavItem = {
  href: string;
  label: string;
  subItems?: NavSubItem[];
};

export const siteNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/artist", label: "Artistes" },
  { href: "/songs", label: "Songs" },
  { href: "/reviews", label: "Reviews" },
  { href: "/features", label: "Features" },
  { href: "/news", label: "News" },
];

export const footerColumns = [
  {
    title: "Explore",
    links: siteNav,
  },
  {
    title: "Genres",
    links: [
      { href: "/songs?category=Afrobeats", label: "Afrobeats" },
      { href: "/songs?category=Hip-hop", label: "Hip-hop" },
      { href: "/songs?category=R%26B", label: "R&B" },
      { href: "/songs?category=Gospel", label: "Gospel" },
      { href: "/songs?category=Trending", label: "Trending" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/reviews", label: "Latest Reviews" },
      { href: "/features", label: "Editorial Features" },
      { href: "/news", label: "Music News" },
    ],
  },
];

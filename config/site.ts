export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Task Planner",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title:"Home",
      href:"/",
    },
    {
      title:"Planning",
      href:"/plan",
    }
  ],
  links: {
    github: "https://github.com/wp9975",
  },
}

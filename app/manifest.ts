import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "TimeWasteCalc — honest math, soft delivery",
    short_name: "TimeWasteCalc",
    description:
      "How much of your life are you burning on screens, scrolling, and meetings? Find out.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    orientation: "portrait",
    background_color: "#FFF8E7",
    theme_color: "#FFF8E7",
    dir: "ltr",
    lang: "en",
    categories: ["lifestyle", "productivity", "utilities"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Start fresh",
        short_name: "Fresh",
        description: "Open with no pre-filled habits",
        url: "/?fresh=1",
      },
    ],
  };
}

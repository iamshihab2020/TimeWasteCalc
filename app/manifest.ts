import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TimeWasteCalc — honest math, soft delivery",
    short_name: "TimeWasteCalc",
    description:
      "How much of your life are you burning on screens, scrolling, and meetings? Find out.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#FFF8E7",
    theme_color: "#FFF8E7",
    categories: ["lifestyle", "productivity", "utilities"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}

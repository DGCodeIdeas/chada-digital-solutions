import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SterlingShell } from "@/components/sterling/Layout";

export const Route = createFileRoute("/demos/sterling-vale")({
  head: () => ({
    meta: [
      { title: "Sterling & Vale Construction — Building Nigeria's Skyline" },
      {
        name: "description",
        content:
          "Sterling & Vale is a Lagos-based construction firm delivering commercial, residential, and civil projects across Nigeria for 18+ years.",
      },
      { property: "og:title", content: "Sterling & Vale Construction" },
      { property: "og:description", content: "Commercial, residential, and civil construction across Nigeria." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <SterlingShell>
      <Outlet />
    </SterlingShell>
  ),
});

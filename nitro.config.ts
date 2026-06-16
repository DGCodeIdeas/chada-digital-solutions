import { defineNitroConfig } from "nitropack";

export default defineNitroConfig({
  routeRules: {
    // Proxy Lovable asset CDN requests to the actual CDN
    "/__l5e/assets-v1/**": {
      proxy: "https://assets.lovable.dev/__l5e/assets-v1/**",
    },
  },
});

import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { createApiClient } from "@repo/api/client";

export const api = createApiClient({
  url: () => {
    if (typeof window === "undefined") {
      throw new TypeError(
        "The API client runs in the browser only. Call procedures directly on the server."
      );
    }
    return new URL("/api/rpc", window.location.origin);
  },
});

export const orpc = createTanstackQueryUtils(api);

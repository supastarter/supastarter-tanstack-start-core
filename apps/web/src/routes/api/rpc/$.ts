import { handleApiRequest } from "@repo/api/server";
import { createFileRoute } from "@tanstack/react-router";

const handler = async ({ request }: { request: Request }) =>
  await handleApiRequest(request, "/api/rpc");

export const Route = createFileRoute("/api/rpc/$")({
  server: {
    handlers: {
      DELETE: handler,
      GET: handler,
      HEAD: handler,
      PATCH: handler,
      POST: handler,
      PUT: handler,
    },
  },
});

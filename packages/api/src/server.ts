import { onError, ORPCError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";

import { router } from "./router";

const logRpcError = (error: unknown) => {
  if (!(error instanceof ORPCError) || error.status >= 500) {
    console.error(error);
  }
};

const handler = new RPCHandler(router, {
  interceptors: [onError(logRpcError)],
});

/** Handles oRPC requests under `prefix` (for example `/api/rpc`) and returns 404 for anything else. */
export const handleApiRequest = async (
  request: Request,
  prefix: `/${string}`
): Promise<Response> => {
  const { matched, response } = await handler.handle(request, {
    prefix,
    context: { headers: request.headers },
  });

  return matched ? response : new Response("Not Found", { status: 404 });
};

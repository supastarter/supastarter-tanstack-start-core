import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";

import type { Router } from "./router";

export type ApiClient = RouterClient<Router>;

export type ApiClientOptions = ConstructorParameters<typeof RPCLink>[0];

export const createApiClient = (options: ApiClientOptions): ApiClient =>
  createORPCClient(new RPCLink(options));

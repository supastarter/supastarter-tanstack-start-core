import { describe, expect, it } from "vitest";

import { createApiClient } from "./client";
import { handleApiRequest } from "./server";

const prefix = "/api/rpc";

const client = createApiClient({
  url: `http://localhost${prefix}`,
  fetch: (request) => handleApiRequest(request, prefix),
});

describe("handleApiRequest", () => {
  it("serves procedures to the typed client", async () => {
    await expect(client.greeting({ name: "Ada" })).resolves.toEqual({ message: "Hello, Ada!" });
  });

  it("surfaces validation errors to the client", async () => {
    await expect(client.greeting({ name: "" })).rejects.toMatchObject({
      code: "BAD_REQUEST",
      status: 400,
    });
  });

  it("answers GET health checks", async () => {
    const response = await handleApiRequest(
      new Request(`http://localhost${prefix}/health`),
      prefix,
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ json: { status: "ok" } });
  });

  it("returns 404 outside the prefix", async () => {
    const response = await handleApiRequest(new Request("http://localhost/other"), prefix);

    expect(response.status).toBe(404);
  });
});

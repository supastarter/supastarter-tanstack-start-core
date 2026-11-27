import { call } from "@orpc/server";
import { describe, expect, it } from "vitest";

import { router } from "./router";

const context = { headers: new Headers() };

describe("health", () => {
  it("reports ok", async () => {
    await expect(
      call(router.health, undefined, { context })
    ).resolves.toStrictEqual({
      status: "ok",
    });
  });
});

describe("greeting", () => {
  it("greets by the trimmed name", async () => {
    await expect(
      call(router.greeting, { name: "  Ada " }, { context })
    ).resolves.toStrictEqual({
      message: "Hello, Ada!",
    });
  });

  it("rejects a blank name", async () => {
    await expect(
      call(router.greeting, { name: "   " }, { context })
    ).rejects.toMatchObject({
      code: "BAD_REQUEST",
    });
  });
});

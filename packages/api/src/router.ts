import { z } from "zod";

import { procedure } from "./procedure";

export const router = {
  health: procedure
    .route({ method: "GET" })
    .handler(() => ({ status: "ok" as const })),

  greeting: procedure
    .input(z.object({ name: z.string().trim().min(1).max(50) }))
    .handler(({ input }) => ({ message: `Hello, ${input.name}!` })),
};

export type Router = typeof router;

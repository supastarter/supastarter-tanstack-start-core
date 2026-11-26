// The side-effect import loads Start's module augmentation so server routes type-check.
import "@tanstack/react-start";
import { createRouter } from "@tanstack/react-router";

import { NotFound } from "@/components/not-found";

import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
  });

  return router;
};

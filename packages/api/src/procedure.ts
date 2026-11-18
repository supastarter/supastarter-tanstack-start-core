import { os } from "@orpc/server";

export interface Context {
  headers: Headers;
}

export const procedure = os.$context<Context>();

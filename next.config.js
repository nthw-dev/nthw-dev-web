/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  // @sparticuz/chromium ships a Chromium binary for the /resume PDF route and
  // must stay out of the server bundle.
  serverExternalPackages: ["@sparticuz/chromium"],
};

export default config;

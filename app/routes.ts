import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/guide.tsx"),
  route("api/ai", "routes/api.ai.ts"),
  route("api/auth/*", "routes/api.auth.$.ts"),
  route("api/seed", "routes/api.seed.ts"),
  route("protected", "routes/protected.tsx"),
  route("chat", "routes/chat.tsx"),
  route("home", "routes/home.tsx"),
  route("entry/:slug", "routes/entry.$slug.tsx"),
] satisfies RouteConfig;

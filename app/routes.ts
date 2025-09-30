import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/ai", "routes/api.ai.ts"),
  route("api/auth/*", "routes/api.auth.$.ts"),
  route("protected", "routes/protected.tsx"),
  route("chat", "routes/chat.tsx"),
] satisfies RouteConfig;

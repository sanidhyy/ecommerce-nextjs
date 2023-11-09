import { authMiddleware } from "@clerk/nextjs";

// clerk auth middleware
export default authMiddleware({
  publicRoutes: ["/api/:path*"],
});

// middleware config
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

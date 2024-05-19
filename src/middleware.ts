// export { default } from "next-auth/middleware";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    // if (!token?.roles.includes("admin") && pathname === "/dashboard") {
    //   return NextResponse.rewrite(new URL("/", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/auth/login", "/dashboard"] };

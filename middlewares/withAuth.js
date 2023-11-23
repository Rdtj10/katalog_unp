import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default function withAuth(middleware, requireAuth) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)) {
      const token = await getToken({ 
        req,
        secret: process.env.NEXTAUHT_SECRET,
       });
      console.log(token)
      if (!token) {
        const url = new URL("/auth/login", req.url);
        return NextResponse.redirect(url);
      }
    }
    return middleware(req, next);
  };
}

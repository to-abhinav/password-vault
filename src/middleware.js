import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  const token = await getToken({ req });
  console.log("this is token", token);
  const url = req.nextUrl;
  console.log(
    "this is url.pathname.startsWith",
    url.pathname.startsWith("/login")
  );

  if (
    token &&
    (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // return NextResponse.redirect(new URL("/home", req.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup"],
};

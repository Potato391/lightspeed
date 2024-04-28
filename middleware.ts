import { NextResponse } from "next/server";

export function middleware(request: Request) {
  // Create a permanent redirect (HTTP 301) to the homepage
  const url = new URL(request.url);

  // If the request is already for the homepage, do not redirect
  if (url.pathname === "/") {
    // Allow the request to proceed without redirection
    return NextResponse.next();
  }

  // Otherwise, create a permanent redirect (HTTP 301) to the homepage
  const redirectResponse = NextResponse.redirect(
    new URL("/", request.url),
    301
  );

  // Return the redirect response
  return redirectResponse;
}

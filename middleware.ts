import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const url = new URL(request.url);
  if (
    url.pathname ===
    "/089d1bfdb4e54328a59574fb7ac4e473b32134ed9982a399929388d97e08f2dd/loader.js"
  ) {
    // Block the request by returning a 404 response
    return new NextResponse("Not Found", { status: 404 });
  }
  const cspHeader = `
  default-src 'none';
  base-uri 'self';
  child-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/;
  connect-src 'self' uploads.github.com www.githubstatus.com collector.github.com raw.githubusercontent.com api.github.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com api.githubcopilot.com objects-origin.githubusercontent.com *.actions.githubusercontent.com wss://*.actions.githubusercontent.com productionresultssa0.blob.core.windows.net/ productionresultssa1.blob.core.windows.net/ productionresultssa2.blob.core.windows.net/ productionresultssa3.blob.core.windows.net/ productionresultssa4.blob.core.windows.net/ productionresultssa5.blob.core.windows.net/ productionresultssa6.blob.core.windows.net/ productionresultssa7.blob.core.windows.net/ productionresultssa8.blob.core.windows.net/ productionresultssa9.blob.core.windows.net/ productionresultssa10.blob.core.windows.net/ productionresultssa11.blob.core.windows.net/ productionresultssa12.blob.core.windows.net/ productionresultssa13.blob.core.windows.net/ productionresultssa14.blob.core.windows.net/ productionresultssa15.blob.core.windows.net/ productionresultssa16.blob.core.windows.net/ productionresultssa17.blob.core.windows.net/ productionresultssa18.blob.core.windows.net/ productionresultssa19.blob.core.windows.net/ github-production-repository-image-32fea6.s3.amazonaws.com github-production-release-asset-2e65be.s3.amazonaws.com insights.github.com wss://alive.github.com github.githubassets.com edge.fullstory.com rs.fullstory.com;
  font-src github.githubassets.com;
  form-action 'self' github.com gist.github.com copilot-workspace.githubnext.com objects-origin.githubusercontent.com;
  frame-ancestors 'none';
  frame-src viewscreen.githubusercontent.com notebooks.githubusercontent.com;
  img-src 'self' data: github.githubassets.com media.githubusercontent.com camo.githubusercontent.com identicons.github.com avatars.githubusercontent.com github-cloud.s3.amazonaws.com objects.githubusercontent.com secured-user-images.githubusercontent.com/ user-images.githubusercontent.com/ private-user-images.githubusercontent.com opengraph.githubassets.com github-production-user-asset-6210df.s3.amazonaws.com customer-stories-feed.github.com spotlights-feed.github.com objects-origin.githubusercontent.com *.githubusercontent.com;
  manifest-src 'self';
  media-src github.com user-images.githubusercontent.com/ secured-user-images.githubusercontent.com/ private-user-images.githubusercontent.com github-production-user-asset-6210df.s3.amazonaws.com gist.github.com github.githubassets.com;
  script-src github.githubassets.com;
  style-src 'unsafe-inline' github.githubassets.com;
  upgrade-insecure-requests;
  worker-src github.com/assets-cdn/worker/ gist.github.com/assets-cdn/worker/
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  if (response.status === 307) {
    // If so, change the response to prevent the redirect
    return new NextResponse("OK", { status: 200 }); // Or choose another status code
  }

  return response;
}

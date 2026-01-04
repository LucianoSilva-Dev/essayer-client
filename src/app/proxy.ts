import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/shared/constants";

async function proxy(request: NextRequest, { params }: { params: Promise<{ proxy: string[] }> }) {
  const { proxy } = await params;
  const path = proxy.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const targetUrl = `${API_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ""}`;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");

  try {
    const body = request.method !== "GET" && request.method !== "HEAD" ? await request.blob() : null;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
    });

    const responseHeaders = new Headers(response.headers);
    
    // Handle Set-Cookie headers correctly
    // fetch API might merge them, but getSetCookie() retrieves them as an array
    const cookies = response.headers.getSetCookie();
    
    const newResponse = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

    // Ensure all Set-Cookie headers are preserved and correctly set
    if (cookies.length > 0) {
      newResponse.headers.delete("set-cookie");
      cookies.forEach(cookie => {
        // Sanitize cookie:
        // 1. Remove Domain so it defaults to the current domain (localhost)
        // 2. Remove Path so we can set a new one
        const sanitizedCookie = cookie
          .replace(/Domain=[^;]+;?/i, "")
          .replace(/Path=[^;]+;?/i, "");
        
        // Append Path=/ to ensure global access across the app
        const finalCookie = sanitizedCookie + "; Path=/api";

        newResponse.headers.append("set-cookie", finalCookie);
      });
    }

    return newResponse;

  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
export const PATCH = proxy;
export const HEAD = proxy;
export const OPTIONS = proxy;
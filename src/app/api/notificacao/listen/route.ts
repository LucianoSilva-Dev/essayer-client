import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/shared/constants";

export async function GET(request: NextRequest) {
  const controller = new AbortController();

  request.signal.addEventListener("abort", () => {
    controller.abort();
  });

  const targetUrl = `${API_BASE_URL}/notificacao/listen`;

  const response = await fetch(targetUrl, {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
      accept: "text/event-stream",
    },
    signal: controller.signal,
    cache: "no-store",
  });

  return new NextResponse(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

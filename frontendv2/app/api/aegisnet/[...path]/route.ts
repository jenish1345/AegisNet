import { NextRequest, NextResponse } from "next/server";

/**
 * BFF proxy for the AegisNet FastAPI backend.
 * Browser requests talk to /api/aegisnet/... so no CORS surface is opened directly,
 * and the upstream endpoint is configurable via AEGISNET_API_URL.
 */
const API_BASE = process.env.AEGISNET_API_URL ?? "http://127.0.0.1:8000";

/** Allowed top-level endpoints for security and routing cleanliness */
const ALLOWED = new Set([
  "health",
  "demo",
  "integrity",
  "truth-gate",
  "engine-features",
]);

function upstreamUrl(req: NextRequest, path: string[]): string {
  return `${API_BASE}/${path.join("/")}${req.nextUrl.search}`;
}

function refuse(path: string[]) {
  return NextResponse.json(
    { error: `Unknown route: /api/aegisnet/${path.join("/")}` },
    { status: 404 }
  );
}

function unreachable(err: unknown) {
  return NextResponse.json(
    {
      error:
        `Cannot reach the AegisNet backend at ${API_BASE}. ` +
        `Ensure it is running via \`uvicorn main:app --reload --port 8000\` in backend/. ` +
        `(${err instanceof Error ? err.message : String(err)})`,
    },
    { status: 502 }
  );
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  if (!ALLOWED.has(path[0] ?? "")) return refuse(path);

  try {
    const upstream = await fetch(upstreamUrl(req, path), {
      headers: { accept: "application/json" },
      cache: "no-store",
    });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return unreachable(err);
  }
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  if (!ALLOWED.has(path[0] ?? "")) return refuse(path);

  try {
    const upstream = await fetch(upstreamUrl(req, path), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: await req.text(),
    });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return unreachable(err);
  }
}

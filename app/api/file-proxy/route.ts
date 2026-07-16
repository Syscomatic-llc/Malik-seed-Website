import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const relativePath = searchParams.get("path");

  if (!relativePath) {
    return NextResponse.json({ error: "Missing path parameter" }, { status: 400 });
  }

  // Construct absolute backend URL on the server-side to hide it from clients
  const backendUrl = process.env.API_BACKEND_URL || "";
  let baseOrigin = "";
  try {
    baseOrigin = new URL(backendUrl).origin;
  } catch {
    baseOrigin = backendUrl;
  }

  const cleanPath = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  const fileUrl = `${baseOrigin}/${cleanPath}`;

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch file from source: ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("Content-Type") || "application/pdf";
    const data = await response.arrayBuffer();

    return new NextResponse(data, {
      headers: {
        "Content-Type": contentType,
        // Hint browser to download rather than display inline if necessary
        "Content-Disposition": `attachment; filename="${cleanPath.split("/").pop() || "document.pdf"}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("File proxy error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

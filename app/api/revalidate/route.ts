import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secretFromHeader =
      req.headers.get("x-revalidate-secret") ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    let secretFromBody: string | undefined;
    let path: string | string[] | undefined;
    let tag: string | string[] | undefined;

    try {
      const body = await req.json();
      secretFromBody = body?.secret;
      path = body?.path || body?.paths;
      tag = body?.tag || body?.tags;
    } catch {
      // Body may be empty if header auth was used
    }

    const secret = secretFromBody || secretFromHeader;
    const expectedSecret = process.env.REVALIDATE_SECRET || "malik-seed-revalidate-secret";

    if (!secret || secret !== expectedSecret) {
      return NextResponse.json(
        { message: "Invalid revalidation secret" },
        { status: 401 }
      );
    }

    if (!path && !tag) {
      return NextResponse.json(
        { message: "Must provide 'path'/'paths' or 'tag'/'tags' to revalidate" },
        { status: 400 }
      );
    }

    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];

    if (tag) {
      const tagList = Array.isArray(tag)
        ? tag
        : tag.split(",").map((t) => t.trim()).filter(Boolean);

      for (const t of tagList) {
        try {
          (revalidateTag as any)(t, "default");
        } catch {
          (revalidateTag as any)(t);
        }
        revalidatedTags.push(t);
      }
    }

    if (path) {
      const pathList = Array.isArray(path)
        ? path
        : path.split(",").map((p) => p.trim()).filter(Boolean);

      for (const p of pathList) {
        revalidatePath(p);
        revalidatedPaths.push(p);
      }
    }

    return NextResponse.json({
      revalidated: true,
      paths: revalidatedPaths,
      tags: revalidatedTags,
      now: Date.now(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error revalidating", error: err?.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method Not Allowed. Use POST to trigger revalidation." },
    { status: 405 }
  );
}

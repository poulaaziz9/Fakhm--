import { revalidateTag } from "next/cache";

// Called after editing products directly in Supabase so the site refreshes
// immediately instead of waiting for the cache to expire.
// POST /api/revalidate  with header  Authorization: Bearer <REVALIDATE_SECRET>
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }
  revalidateTag("products", "max");
  return Response.json({ ok: true });
}

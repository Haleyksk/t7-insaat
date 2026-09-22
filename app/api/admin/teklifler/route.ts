import { NextResponse } from "next/server";
import { teklifleriOku } from "@/lib/teklifler";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await teklifleriOku());
}

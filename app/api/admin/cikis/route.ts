import { NextResponse } from "next/server";
import { OTURUM_CEREZI } from "@/lib/admin-oturum";

export async function POST() {
  const yanit = NextResponse.json({ tamam: true });
  yanit.cookies.set(OTURUM_CEREZI, "", { path: "/", maxAge: 0 });
  return yanit;
}

import { NextResponse } from "next/server";
import { adminSifresi, OTURUM_CEREZI, oturumToken } from "@/lib/admin-oturum";

export async function POST(istek: Request) {
  const govde = (await istek.json()) as { sifre?: string };
  if (!govde.sifre || govde.sifre !== adminSifresi()) {
    return NextResponse.json({ hata: "Şifre hatalı" }, { status: 401 });
  }

  const yanit = NextResponse.json({ tamam: true });
  yanit.cookies.set(OTURUM_CEREZI, oturumToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return yanit;
}

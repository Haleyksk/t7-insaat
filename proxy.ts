/** Next 16'da middleware.ts yerine proxy.ts kullanılır. Yönetim paneli ve admin API oturum ister. */
import { NextRequest, NextResponse } from "next/server";
import { OTURUM_CEREZI, oturumToken } from "@/lib/admin-oturum";

export function proxy(istek: NextRequest) {
  const yol = istek.nextUrl.pathname;
  const token = istek.cookies.get(OTURUM_CEREZI)?.value;

  if (token === oturumToken()) return NextResponse.next();

  if (yol.startsWith("/api/")) {
    return NextResponse.json({ hata: "Yetkisiz" }, { status: 401 });
  }

  return NextResponse.redirect(new URL("/admin", istek.url));
}

export const config = {
  matcher: [
    "/admin/panel",
    "/admin/panel/:path*",
    "/api/admin/referanslar",
    "/api/admin/yukle",
    "/api/admin/icerik",
    "/api/admin/teklifler",
  ],
};

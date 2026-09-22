export const OTURUM_CEREZI = "t7_admin";

export function adminSifresi() {
  return process.env.ADMIN_SIFRE || "t7panel2026";
}

export function oturumToken() {
  return `ok-${adminSifresi()}`;
}

type Posta = {
  alici: string;
  ad: string;
  email: string;
  konu: string;
  mesaj: string;
};

export async function teklifPostala(posta: Posta) {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    await smtpGonder(posta);
    return;
  }
  await formSubmitGonder(posta);
}

async function smtpGonder({ alici, ad, email, konu, mesaj }: Posta) {
  const nodemailer = await import("nodemailer");
  const tasima = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === "465",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await tasima.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: alici,
    replyTo: email,
    subject: konu ? `Teklif: ${konu}` : `Teklif talebi — ${ad}`,
    text: `${ad} <${email}>\n\n${mesaj}`,
  });
}

async function formSubmitGonder({ alici, ad, email, konu, mesaj }: Posta) {
  const yanit = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(alici)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: ad,
      email,
      _subject: konu ? `Teklif: ${konu}` : `Teklif talebi — ${ad}`,
      _replyto: email,
      _template: "box",
      message: mesaj,
    }),
  });
  if (!yanit.ok) throw new Error("Posta gönderilemedi");
}

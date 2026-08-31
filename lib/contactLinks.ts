export function phoneHref(phone: string) {
  const trimmed = phone.trim();
  const hasLeadingPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");

  return `tel:${hasLeadingPlus ? "+" : ""}${digits}`;
}

export function gmailHref(email: string) {
  const recipient = email.trim();
  return `https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${encodeURIComponent(recipient)}`;
}

"use server"

import { Resend } from "resend"

const DESTINATION_EMAIL = "mohamedkhaliedkahk@gmail.com"

export type SendMessageState = {
  ok: boolean
  error?: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function sendMessage(
  _prevState: SendMessageState,
  formData: FormData,
): Promise<SendMessageState> {
  const name = String(formData.get("name") || "").trim()
  const senderEmail = String(formData.get("email") || "").trim()
  const subject = String(formData.get("subject") || "").trim()
  const message = String(formData.get("message") || "").trim()

  if (!name || !senderEmail || !message) {
    return { ok: false, error: "يرجى تعبئة الاسم والبريد الإلكتروني والرسالة." }
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(senderEmail)) {
    return { ok: false, error: "يرجى إدخال بريد إلكتروني صحيح." }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return {
      ok: false,
      error:
        "تعذّر إرسال رسالتك في الوقت الحالي بسبب صيانة مؤقتة في خدمة البريد. لا تقلق — يمكنك التواصل معي مباشرة عبر واتساب أو البريد الإلكتروني وسأرد عليك في أقرب وقت.",
    }
  }

  const resend = new Resend(apiKey)
  const mailSubject = subject || `رسالة جديدة من ${name}`

  const html = `
    <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; line-height: 1.7; color: #111;">
      <h2 style="margin:0 0 16px;">رسالة جديدة من نموذج التواصل</h2>
      <p><strong>الاسم:</strong> ${escapeHtml(name)}</p>
      <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(senderEmail)}</p>
      <p><strong>الموضوع:</strong> ${escapeHtml(mailSubject)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0;" />
      <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `

  try {
    const { error } = await resend.emails.send({
      from: "نموذج التواصل <onboarding@resend.dev>",
      to: [DESTINATION_EMAIL],
      replyTo: senderEmail,
      subject: mailSubject,
      html,
    })

    if (error) {
      return { ok: false, error: "تعذّر إرسال الرسالة. يرجى المحاولة مرة أخرى." }
    }

    return { ok: true }
  } catch {
    return { ok: false, error: "حدث خطأ غير متوقع أثناء الإرسال. يرجى المحاولة لاحقاً." }
  }
}

"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { validateString } from "@/lib/utils";
import ContactFormEmail from "@/email/contact-form-email";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_PATTERN = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;

// Best-effort, per-instance limiter. Serverless instances don't share memory,
// so this only slows down naive abuse; use a shared store for a hard limit.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export const sendEmail = async (formData: FormData) => {
  // Honeypot: real users never fill this hidden field. Pretend success to bots.
  if (formData.get("website")) {
    return { data: { id: "ignored" } };
  }

  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500) || !EMAIL_PATTERN.test(senderEmail)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid message",
    };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim();
  if (isRateLimited(ip || "unknown")) {
    return {
      error: "Too many messages. Please try again later.",
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "mitsakinoob@yahoo.gr",
      subject: "New message from your portfolio contact form",
      replyTo: senderEmail,
      react: React.createElement(ContactFormEmail, {
        message,
        senderEmail,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { error: "Could not send your message. Please try again later." };
    }

    return { data };
  } catch (error: unknown) {
    console.error("sendEmail failed:", error);
    return { error: "Could not send your message. Please try again later." };
  }
};

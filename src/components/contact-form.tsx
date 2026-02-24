"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ state: "loading" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus({
          state: "error",
          message: json.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      form.reset();
      setStatus({
        state: "success",
        message: "Thanks — we received your request and will contact you shortly.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm text-muted" htmlFor="name">
            Full name
          </label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-muted" htmlFor="phone">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            required
            placeholder="e.g. 06x xxx xxxx"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-muted" htmlFor="email">
          Email (optional)
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm text-muted" htmlFor="message">
          What do you need?
        </label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your kitchen/cupboard project, timeline, and any ideas you have."
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status.state === "loading"}>
          {status.state === "loading" ? "Sending…" : "Request a Quote"}
        </Button>

        {status.state === "success" ? (
          <div className="text-sm text-foreground/80">{status.message}</div>
        ) : null}
        {status.state === "error" ? (
          <div className="text-sm text-red-300">{status.message}</div>
        ) : null}
      </div>
    </form>
  );
}

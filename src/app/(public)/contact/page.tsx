import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";

import { FadeIn } from "@/components/fade-in";
import { StaggeredList } from "@/components/staggered-list";
import { ContactForm } from "@/components/contact-form";
import { Container, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { CALL_HREF, WHATSAPP_HREF, LOCATION, PHONE_CALL, PHONE_WHATSAPP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a quote for a kitchen or built-in cupboards in Pretoria North.",
};

export default function ContactPage() {
  return (
    <main>
      <Section className="pt-10 sm:pt-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <div className="max-w-xl">
                <div className="text-xs font-semibold tracking-[0.18em] text-foreground/60">
                  GET IN TOUCH
                </div>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Let’s plan your next kitchen.
                </h1>
                <p className="mt-4 text-base leading-7 text-muted">
                  Share a few details and we’ll get back to you with a tailored
                  quote. Prefer a quick chat? Call or WhatsApp us.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="rounded-full">
                    <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <a href={CALL_HREF}>
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  </Button>
                </div>

                <StaggeredList className="mt-8 grid gap-6">
                  <div className="grid gap-2 rounded-3xl border border-card-border bg-card p-6 text-sm">
                    <div className="text-muted">Location</div>
                    <div className="font-semibold">{LOCATION}</div>

                    <div className="mt-4 text-muted">Calls</div>
                    <a className="font-semibold hover:underline" href={CALL_HREF}>
                      {PHONE_CALL}
                    </a>

                    <div className="mt-4 text-muted">WhatsApp</div>
                    <a
                      className="font-semibold hover:underline"
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {PHONE_WHATSAPP}
                    </a>
                  </div>

                  <div className="overflow-hidden rounded-3xl border border-card-border bg-card">
                    <iframe
                      title="Map"
                      className="h-[260px] w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=Pretoria%20North&output=embed"
                    />
                  </div>
                </StaggeredList>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="rounded-3xl border border-card-border bg-card p-6 sm:p-8">
                <div className="text-sm font-semibold">Request a Quote</div>
                <div className="mt-2 text-sm leading-6 text-muted">
                  Tell us what you’re building. The more detail you share, the
                  quicker we can advise.
                </div>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </main>
  );
}

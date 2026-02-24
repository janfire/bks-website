import type { Metadata } from "next";

import { FadeIn } from "@/components/fade-in";
import { Container, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how BKS Kitchens & Cupboards approaches design, manufacturing and installation.",
};

export default function AboutPage() {
  return (
    <main>
      <Section className="pt-10 sm:pt-14">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <div className="text-xs font-semibold tracking-[0.18em] text-foreground/60">
                OUR APPROACH
              </div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Design-led. Detail-obsessed.
              </h1>
              <p className="mt-4 text-base leading-7 text-muted">
                We design and furnish kitchens and built-in cupboards with a
                focus on finish quality, storage efficiency and long-term
                durability. From first measurement to final fitment, we keep the
                process clear and the workmanship uncompromising.
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <FadeIn>
              <div className="rounded-3xl border border-card-border bg-card p-6">
                <div className="text-sm font-semibold">1. Consult & Measure</div>
                <div className="mt-2 text-sm leading-6 text-muted">
                  We discuss your needs, style preference and budget, then take
                  accurate site measurements.
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="rounded-3xl border border-card-border bg-card p-6">
                <div className="text-sm font-semibold">2. Design & Quote</div>
                <div className="mt-2 text-sm leading-6 text-muted">
                  A tailored layout and finish selection, with a transparent
                  quote and realistic timelines.
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="rounded-3xl border border-card-border bg-card p-6">
                <div className="text-sm font-semibold">3. Build & Install</div>
                <div className="mt-2 text-sm leading-6 text-muted">
                  Precise manufacturing and clean installation—aligned doors,
                  smooth drawers, and tidy handover.
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </main>
  );
}

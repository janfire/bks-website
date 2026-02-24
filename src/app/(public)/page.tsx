import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { FadeIn } from "@/components/fade-in";
import { StaggeredList } from "@/components/staggered-list";
import { ProjectCard } from "@/components/project-card";
import { Container, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/lib/projects";
import { CALL_HREF, WHATSAPP_HREF } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-[-140px] h-[520px] w-[520px] rounded-full bg-[rgba(231,199,154,0.18)] blur-3xl" />
          <div className="absolute -right-40 top-[-200px] h-[620px] w-[620px] rounded-full bg-white/10 blur-3xl" />
        </div>

        <Section className="pt-12 sm:pt-16">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <FadeIn>
                <div className="max-w-xl">
                  <div className="text-xs font-semibold tracking-[0.18em] text-foreground/60">
                    KITCHENS • CUPBOARDS • INSTALLATION
                  </div>
                  <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
                    A kitchen that feels engineered.
                    <span className="text-foreground/70"> Not improvised.</span>
                  </h1>
                  <p className="mt-5 text-base leading-7 text-muted">
                    We design and furnish premium kitchens and built-in cupboards
                    with clean lines, durable finishes and smart storage.
                    Crafted for homes in Pretoria North.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="rounded-full">
                      <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp for a Quote
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full">
                      <a href={CALL_HREF}>
                        <Phone className="h-4 w-4" />
                        Call Us
                      </a>
                    </Button>
                  </div>

                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl border border-card-border bg-card p-5">
                      <div className="text-sm font-semibold">Design-first</div>
                      <div className="mt-2 text-sm leading-6 text-muted">
                        Layouts that balance beauty and daily practicality.
                      </div>
                    </div>
                    <div className="rounded-3xl border border-card-border bg-card p-5">
                      <div className="text-sm font-semibold">Fine finishes</div>
                      <div className="mt-2 text-sm leading-6 text-muted">
                        Crisp edges, smooth drawers and clean alignment.
                      </div>
                    </div>
                    <div className="rounded-3xl border border-card-border bg-card p-5">
                      <div className="text-sm font-semibold">Neat install</div>
                      <div className="mt-2 text-sm leading-6 text-muted">
                        Respect for your home, from start to handover.
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <div className="grid gap-6">
                <StaggeredList className="grid gap-6 sm:grid-cols-2">
                  <ProjectCard project={featuredProjects[0]} />
                  <ProjectCard project={featuredProjects[1]} />
                </StaggeredList>
                <div className="sm:max-w-[64%]">
                  <FadeIn>
                    <ProjectCard project={featuredProjects[2]} />
                  </FadeIn>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <FadeIn>
              <div className="max-w-xl">
                <div className="text-xs font-semibold tracking-[0.18em] text-foreground/60">
                  PROCESS
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  From idea to installation — without the stress.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  A clear workflow keeps timelines realistic and decisions
                  simple. We focus on details that look great now and still feel
                  solid years later.
                </p>
                <div className="mt-7">
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/about">
                      How we work <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeIn>

            <StaggeredList className="grid gap-4">
              <div>
                <div className="rounded-3xl border border-card-border bg-card p-6">
                  <div className="text-sm font-semibold">1. Measure</div>
                  <div className="mt-2 text-sm leading-6 text-muted">
                    Site visit and accurate measurements to avoid surprises.
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-3xl border border-card-border bg-card p-6">
                  <div className="text-sm font-semibold">2. Design</div>
                  <div className="mt-2 text-sm leading-6 text-muted">
                    Layout planning, finish selection and a clear quote.
                  </div>
                </div>
              </div>
              <div>
                <div className="rounded-3xl border border-card-border bg-card p-6">
                  <div className="text-sm font-semibold">3. Build & install</div>
                  <div className="mt-2 text-sm leading-6 text-muted">
                    Precision build, clean installation and tidy handover.
                  </div>
                </div>
              </div>
            </StaggeredList>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-6 rounded-[40px] border border-card-border bg-card p-8 sm:p-10">
            <FadeIn>
              <div className="max-w-2xl">
                <div className="text-xs font-semibold tracking-[0.18em] text-foreground/60">
                  READY WHEN YOU ARE
                </div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Tell us what you want to build.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted">
                  Send a message on WhatsApp, or request a quote via our contact
                  form. We’ll respond with the next steps.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-full">
                  <a href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/contact">
                    Request a Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="rounded-full">
                  <Link href="/gallery">View Gallery</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </main>
  );
}

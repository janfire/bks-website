import type { Metadata } from "next";

import { prisma } from "@/lib/prisma"; // [NEW] Fetch from DB
import { FadeIn } from "@/components/fade-in";
import { Container, Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
// import { projects } from "@/lib/projects"; // [DELETE]

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore recent kitchens and cupboard installations by BKS Kitchens & Cupboards.",
};

export default async function GalleryPage() {
  // Fetch from Database
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <main>
      <Section className="pt-10 sm:pt-14">
        <Container>
          <FadeIn>
            <div className="max-w-2xl">
              <div className="text-xs font-semibold tracking-[0.18em] text-foreground/60">
                RECENT WORK
              </div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Craft you can see.
              </h1>
              <p className="mt-4 text-base leading-7 text-muted">
                A selection of our recent kitchen and cupboard projects. Clean
                lines, durable finishes, and details that hold up to everyday
                life.
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <FadeIn key={project.id}>
                <ProjectCard
                  project={{
                    ...project,
                    imageAlt: project.imageAlt || project.title,
                  }}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}

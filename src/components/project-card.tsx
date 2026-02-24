import Image from "next/image";

import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-card-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
      <div className="p-5">
        <div className="text-sm font-semibold tracking-tight">
          {project.title}
        </div>
        <div className="mt-1 text-sm text-muted">{project.location}</div>
      </div>
    </div>
  );
}

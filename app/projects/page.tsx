import type { Metadata } from "next";
import { ProjectRows } from "@/components/Rows";
import { Section } from "@/components/Section";

export const metadata: Metadata = { title: "projects" };

export default function ProjectsPage() {
  return (
    <Section id="projects" title="projects">
      <ProjectRows />
    </Section>
  );
}

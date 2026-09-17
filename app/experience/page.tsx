import type { Metadata } from "next";
import { ExperienceRows } from "@/components/Rows";
import { Section } from "@/components/Section";

export const metadata: Metadata = { title: "experience" };

export default function ExperiencePage() {
  return (
    <Section id="experience" title="experience">
      <ExperienceRows />
    </Section>
  );
}

import type { LinkKind } from "@/content/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./Icons";

const icons: Record<LinkKind, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
};

export function Chip({ kind, label, href }: { kind: LinkKind; label: string; href: string }) {
  const Icon = icons[kind];
  const external = href.startsWith("http");
  return (
    <a
      className="chip"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <Icon />
      {label}
    </a>
  );
}

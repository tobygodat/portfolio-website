"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { pages } from "@/content/site";

/** The site as a directory tree. Floats left on wide screens, sits inline above the content otherwise. */
export function Nav() {
  const pathname = usePathname();
  return (
    <nav className="tree" aria-label="Pages">
      <span className="tree-root" aria-hidden="true">
        ~
      </span>
      <ul>
        {pages.map((p) => {
          const active = pathname === p.href;
          return (
            <li key={p.slug}>
              <Link href={p.href} aria-current={active ? "page" : undefined}>
                {p.slug}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "line";
  external?: boolean;
  className?: string;
};

/** Square, flat, one fill. Inverts under the pointer. Internal routes use client navigation. */
export default function Button({ href, children, variant = "solid", external, className = "" }: Props) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      <span className="btn-label">{children}</span>
      <span className="btn-arrow" aria-hidden="true">
        {external ? "↗" : "→"}
      </span>
    </>
  );
  if (!external && href.startsWith("/")) {
    return (
      <Link className={cls} href={href}>
        {inner}
      </Link>
    );
  }
  return (
    <a className={cls} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {inner}
    </a>
  );
}

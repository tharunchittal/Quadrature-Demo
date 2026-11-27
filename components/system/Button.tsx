import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "line";
  external?: boolean;
  className?: string;
};

/** Square, flat, one fill. Inverts under the pointer. */
export default function Button({ href, children, variant = "solid", external, className = "" }: Props) {
  return (
    <a
      className={`btn btn-${variant} ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="btn-label">{children}</span>
      <span className="btn-arrow" aria-hidden="true">
        {external ? "↗" : "→"}
      </span>
    </a>
  );
}

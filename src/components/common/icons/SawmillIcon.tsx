import type { SVGProps } from "react";

export function SawmillIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
      <path d="M15 13 9 7l4-4 6 6h3l-3 3" />
      <path d="M18 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

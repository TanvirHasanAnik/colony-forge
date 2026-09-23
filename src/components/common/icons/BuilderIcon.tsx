import type { SVGProps } from "react";

export function BuilderIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
      <path d="m18 15 4-4a4 4 0 0 0-5.66-5.66l-4 4" />
      <path d="m2 2 4 4" />
    </svg>
  );
}

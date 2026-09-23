import type { SVGProps } from "react";

export function WoodIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M4 18v-4c0-2.5 3.5-4 8-4s8 1.5 8 4v4c0 2.5-3.5 4-8 4s-8-1.5-8-4Z" />
      <path d="M4 14c0-2.5 3.5-4 8-4s8 1.5 8 4" />
      <path d="M4 10c0-2.5 3.5-4 8-4s8 1.5 8 4" />
    </svg>
  );
}

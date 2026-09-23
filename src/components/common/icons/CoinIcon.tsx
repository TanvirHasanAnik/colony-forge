import type { SVGProps } from "react";

export function CoinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="10" className="opacity-30" />
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18a1 1 0 0 1-2 0v-1.07A4 4 0 0 1 9.4 10.4a1 1 0 0 1 1.4 1.42A2 2 0 0 0 12 15a2 2 0 0 0 0-4c-1.9 0-3.5-1.12-3.5-2.75A2.75 2.75 0 0 1 11 5.57V5a1 1 0 0 1 2 0v.57A4 4 0 0 1 14.6 13a1 1 0 0 1-1.4-1.42A2 2 0 0 0 12 8a2 2 0 0 0 0 4c1.9 0 3.5 1.12 3.5 2.75A2.75 2.75 0 0 1 13 16.93z" />
    </svg>
  );
}

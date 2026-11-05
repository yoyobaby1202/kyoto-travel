import type { SVGProps } from "react";
/** Rounded top-view airliner, nose points right so it can follow the flight path. */
export function PlaneArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 120" aria-label="飛機原創插畫" {...props}>
      <g
        stroke="#493c35"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M60 48 37 9q-2-5 4-5h13l41 44M60 72l-23 39q-2 5 4 5h13l41-44"
          fill="#ead3b3"
        />
        <path d="M27 50 9 26H0l8 31m19 13L9 94H0l8-31" fill="#d79178" />
        <path
          d="M9 50Q4 60 9 70l110 3q24 0 36-13-12-13-36-13Z"
          fill="#fffcf6"
        />
        <path d="m131 51 9 9-9 9" fill="#a8c9d0" />
        <path
          d="M44 55v10m13-10v10m13-10v10m13-10v10m13-10v10m13-10v10"
          stroke="#9cb7bc"
          strokeWidth="4"
        />
        <path d="M15 54v12" stroke="#bd624d" strokeWidth="6" />
      </g>
    </svg>
  );
}

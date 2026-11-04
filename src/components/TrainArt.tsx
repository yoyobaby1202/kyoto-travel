import type { SVGProps } from "react";
/** Canonical train drawing: all decorative Sagano trains use this component. */
export function TrainArt({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 150 80"
      className={`sagano-train ${className}`}
      role="img"
      aria-label="嵐山紅黃小火車原創插畫"
      {...props}
    >
      <g
        className="train-body"
        stroke="#493c35"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <rect x="7" y="18" width="93" height="45" rx="7" fill="#bd624d" />
        <path d="M8 48h91v14H8z" fill="#e5b762" />
        <path d="M5 15h97" strokeWidth="5" />
        <rect x="16" y="27" width="20" height="16" rx="3" fill="#fffcf6" />
        <rect x="43" y="27" width="20" height="16" rx="3" fill="#fffcf6" />
        <rect x="72" y="25" width="19" height="37" rx="3" fill="#edcc8a" />
        <path d="M77 31h9v12h-9z" fill="#fffcf6" />
        <path d="M100 56h9" />
        <rect x="109" y="35" width="34" height="28" rx="6" fill="#e5b762" />
        <path d="M111 15h24v34h-24z" fill="#bd624d" />
        <path d="M108 12h30" strokeWidth="5" />
        <rect x="117" y="23" width="12" height="16" rx="2" fill="#fffcf6" />
        <path d="M139 35V24h5v11" fill="#493c35" />
        <g className="train-wheel">
          <circle cx="27" cy="66" r="9" fill="#493c35" />
          <path d="M27 60v12m-6-6h12" stroke="#edcc8a" strokeWidth="2" />
        </g>
        <g className="train-wheel">
          <circle cx="81" cy="66" r="9" fill="#493c35" />
          <path d="M81 60v12m-6-6h12" stroke="#edcc8a" strokeWidth="2" />
        </g>
        <g className="train-wheel">
          <circle cx="125" cy="66" r="9" fill="#493c35" />
          <path d="M125 60v12m-6-6h12" stroke="#edcc8a" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}

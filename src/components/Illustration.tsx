import { useEffect, useState } from "react";
export function Illustration({
  kind = "town",
  className = "",
  zoom = false,
}: {
  kind?: string;
  className?: string;
  zoom?: boolean;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  const positions: Record<string, string> = {
    torii: "39% 65%",
    train: "20% 80%",
    temple: "78% 48%",
    sea: "92% 80%",
    river: "73% 85%",
    bamboo: "5% 65%",
    town: "93% 60%",
    food: "24% 62%",
  };
  return (
    <>
      <div
        className={`illustration art-${kind} ${className}`}
        style={{ backgroundPosition: positions[kind] }}
        role={zoom ? "group" : "img"}
        aria-label={`${kind === "torii" ? "京都鳥居" : kind === "train" ? "京都電車" : "京都風景"}原創插畫`}
      >
        {zoom && (
          <button
            className="zoom-art"
            onClick={() => setOpen(true)}
            aria-label="放大原創插畫"
          >
            ↗
          </button>
        )}
      </div>
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <section
            role="dialog"
            aria-modal="true"
            aria-label="原創京都插畫"
            className="image-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button autoFocus onClick={() => setOpen(false)}>
              關閉 ×
            </button>
            <img
              src={`${import.meta.env.BASE_URL}illustrations/kyoto.svg`}
              alt="原創京都冬日風景插畫"
            />
            <p>京都原創插畫 · 示意風景，非景點實拍</p>
          </section>
        </div>
      )}
    </>
  );
}

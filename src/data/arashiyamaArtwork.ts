export const arashiyamaArtwork = {
  width: 1019,
  height: 1543,
  cropTop: 140,
  trainPath: "M679 580C650 650 600 704 490 731S310 777 210 800",
  boatPath: "M144 612C210 620 245 680 300 745S360 805 420 830S490 870 540 895",
  trainDuration: 5000,
  boatStart: 5700,
  boatDuration: 6500,
  files: ["background.webp", "train.webp", "boat.webp"],
};
export function arashiyamaProgress(elapsed: number) {
  const clip = (n: number) => Math.max(0, Math.min(1, n));
  return {
    train: clip(elapsed / arashiyamaArtwork.trainDuration),
    boat: clip(
      (elapsed - arashiyamaArtwork.boatStart) / arashiyamaArtwork.boatDuration,
    ),
  };
}

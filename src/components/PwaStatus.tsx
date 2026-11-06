import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";
export function PwaStatus() {
  const [refresh, setRefresh] = useState<() => void>();
  useEffect(() => {
    const update = registerSW({
      onNeedRefresh() {
        setRefresh(() => () => void update(true));
      },
    });
  }, []);
  return (
    <>
      {refresh ? (
        <button className="pwa-update" onClick={refresh}>
          新版手帳已備妥，點此更新
        </button>
      ) : null}
    </>
  );
}

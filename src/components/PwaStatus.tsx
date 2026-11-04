import { useEffect, useState } from "react";
import { registerSW } from "virtual:pwa-register";
export function PwaStatus() {
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState<() => void>();
  const [error, setError] = useState(false);
  useEffect(() => {
    const update = registerSW({
      onOfflineReady() {
        setReady(true);
      },
      onNeedRefresh() {
        setRefresh(() => () => void update(true));
      },
      onRegisteredSW(_url, registration) {
        if (registration?.active) setReady(true);
      },
      onRegisterError() {
        setError(true);
      },
    });
  }, []);
  return (
    <>
      {refresh ? (
        <button className="pwa-update" onClick={refresh}>
          新版手帳已備妥，點此更新
        </button>
      ) : (
        <span className="cache-status">
          {ready
            ? "行程已備妥，可離線閱讀"
            : error
              ? "離線快取未完成，請稍後重試"
              : "首次開啟，準備離線行程中…"}
        </span>
      )}
    </>
  );
}

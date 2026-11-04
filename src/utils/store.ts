import { openDB } from "idb";
import { useEffect, useState } from "react";
const db = () =>
  openDB("kyoto-diary-v1", 1, {
    upgrade(d) {
      d.createObjectStore("local");
    },
  });
export async function getLocal<T>(key: string): Promise<T | undefined> {
  return (await db()).get("local", key);
}
export async function putLocal(key: string, value: unknown) {
  await (await db()).put("local", value, key);
  window.dispatchEvent(
    new CustomEvent("kyoto-storage", { detail: { key, value } }),
  );
}
export function useLocal<T>(
  key: string,
  initial: T,
): [T, (value: T) => Promise<void>, boolean, string] {
  const [value, set] = useState(initial);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    let alive = true;
    const onUpdate = (event: globalThis.Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail.key === key) set(detail.value);
    };
    window.addEventListener("kyoto-storage", onUpdate);
    getLocal<T>(key)
      .then((v) => {
        if (alive && v !== undefined) set(v);
      })
      .catch(() => setError("無法讀取本機儲存，請確認瀏覽器允許儲存資料。"))
      .finally(() => {
        if (alive) setReady(true);
      });
    return () => {
      alive = false;
      window.removeEventListener("kyoto-storage", onUpdate);
    };
  }, [key]);
  async function save(v: T) {
    try {
      await putLocal(key, v);
      set(v);
      setError("");
    } catch {
      setError("儲存失敗，可能空間不足。請先匯出備份並釋放容量。");
      throw new Error("儲存失敗");
    }
  }
  return [value, save, ready, error];
}

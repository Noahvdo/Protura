import { useState, useEffect } from "react";

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, (v: T) => void] {
  // 1) Always use defaultValue for initial render (server & first client pass)
  const [state, setState] = useState<T>(defaultValue);

  // 2) On mount only, read from localStorage
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item != null) {
        setState(JSON.parse(item) as T);
      }
    } catch {
      /* ignore */
    }
  }, [key]);

  // 3) Persist on state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [key, state]);

  return [state, setState];
}

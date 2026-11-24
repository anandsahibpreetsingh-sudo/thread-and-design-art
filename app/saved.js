"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "tda-saved";

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useSaved() {
  const [ids, setIds] = useState([]);
  useEffect(() => {
    setIds(read());
    const f = () => setIds(read());
    window.addEventListener("tda-saved", f);
    return () => window.removeEventListener("tda-saved", f);
  }, []);
  const toggle = useCallback((id) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    window.dispatchEvent(new Event("tda-saved"));
  }, []);
  return { ids, toggle };
}

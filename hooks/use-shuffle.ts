"use client";
import { useCallback, useState } from "react";

export function useShuffle<T>(items: T[], batchSize: number) {
  const [seen, setSeen] = useState<Set<number>>(() => new Set(range(Math.min(batchSize, items.length))));
  const [current, setCurrent] = useState<number[]>(() => range(Math.min(batchSize, items.length)));

  const shuffle = useCallback(() => {
    const allIdx = range(items.length);
    let pool = allIdx.filter((i) => !seen.has(i));
    let nextSeen = seen;
    if (pool.length < batchSize) {
      // Reset cycle — keep last batch out so we don't repeat it back to back
      nextSeen = new Set(current);
      pool = allIdx.filter((i) => !nextSeen.has(i));
      if (pool.length < batchSize) {
        // catalogue smaller than 2× batch, just allow repeats
        pool = allIdx.filter((i) => !current.includes(i));
        nextSeen = new Set();
      }
    }
    const picked: number[] = [];
    const poolCopy = [...pool];
    while (picked.length < batchSize && poolCopy.length > 0) {
      const idx = Math.floor(Math.random() * poolCopy.length);
      picked.push(poolCopy.splice(idx, 1)[0]);
    }
    const updated = new Set(nextSeen);
    picked.forEach((i) => updated.add(i));
    setSeen(updated);
    setCurrent(picked);
  }, [items.length, batchSize, seen, current]);

  return { items: current.map((i) => items[i]), shuffle, hasMore: items.length > batchSize };
}

function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

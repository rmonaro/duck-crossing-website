"use client";

import { useEffect, useRef } from "react";
import { paintCharacterIcon } from "@/lib/character-art";

/** A character (optionally wearing a hat) painted into a 2× canvas. `size` is the CSS size in px. */
export function CharacterIcon({ id, hat = null, size }: { id: string; hat?: string | null; size: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const w = size;
    paintCharacterIcon(ref.current, id, w / 2, w * 0.6, hat, w / 34);
  }, [id, hat, size]);

  return <canvas ref={ref} width={size * 2} height={size * 2} style={{ width: size, height: size }} aria-hidden="true" />;
}

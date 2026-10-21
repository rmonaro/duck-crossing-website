"use client";

import { useSyncExternalStore } from "react";
import { dailyChallenges } from "@/lib/game-data";

const TIERS = ["Easy", "Medium", "Hard"];

// The challenges are seeded by the viewer's local date, so they're computed on the client only.
const subscribe = () => () => {};
const getDateKey = () => {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};

export function useToday() {
  const key = useSyncExternalStore(subscribe, getDateKey, () => null);
  const label = key
    ? new Date(key + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "Today";
  return { key, label };
}

export function TodayLabel() {
  return <>{useToday().label}</>;
}

export function DailyChallenges() {
  const { key, label } = useToday();
  const challenges = key ? dailyChallenges(key) : [];

  return (
    <div className="stack" style={{ gap: 10, paddingTop: 8, maxWidth: "30em" }}>
      <div className="eyebrow on-dark">Today&apos;s challenges · {label}</div>
      {(key ? challenges : [0, 1, 2].map((tier) => ({ id: String(tier), tier, text: " " }))).map((c) => (
        <div
          key={c.id}
          style={{
            display: "flex", alignItems: "center", gap: 12, background: "var(--glass)",
            border: "1px solid var(--glass-line)", borderRadius: 12, padding: "11px 14px",
          }}
        >
          <div
            style={{
              fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
              color: "var(--duck)", width: 56, flexShrink: 0,
            }}
          >
            {TIERS[c.tier]}
          </div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{c.text}</div>
        </div>
      ))}
      <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)" }}>
        Finish all three on consecutive days to build a streak.
      </div>
    </div>
  );
}

// Duck Crossing design-system components, ported from the design project's _ds_bundle.js.
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

export function ButtonLink({
  href,
  variant = "primary",
  style,
  children,
  ...rest
}: {
  href: string;
  variant?: "primary" | "secondary";
  style?: CSSProperties;
  children: ReactNode;
  "aria-label"?: string;
}) {
  return (
    <Link href={href} className={`ds-btn ds-btn--${variant}`} style={style} {...rest}>
      {children}
    </Link>
  );
}

export function Steps({ items }: { items: string[] }) {
  return (
    <ul style={{ display: "grid", gap: 7, margin: 0, padding: 0, listStyle: "none" }}>
      {items.map((t, i) => (
        <li key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, fontWeight: 700 }}>
          <b
            style={{
              width: 24, height: 24, flex: "none", borderRadius: "50%", background: "var(--duck)",
              display: "grid", placeItems: "center", fontSize: 12,
            }}
          >
            {i + 1}
          </b>
          {t}
        </li>
      ))}
    </ul>
  );
}

export type Rule = string | { label: string; hot?: boolean };

export function RuleChips({ items }: { items: Rule[] }) {
  return (
    <ul style={{ display: "flex", flexWrap: "wrap", gap: 5, margin: 0, padding: 0, listStyle: "none" }}>
      {items.map((it, i) => {
        const o = typeof it === "string" ? { label: it } : it;
        return (
          <li
            key={i}
            style={{
              fontSize: 12, fontWeight: 700, padding: "4px 9px", borderRadius: 999,
              background: o.hot ? "var(--hot-bg)" : "var(--soft)",
              color: o.hot ? "var(--hot-ink)" : "var(--ink)",
            }}
          >
            {o.label}
          </li>
        );
      })}
    </ul>
  );
}

export function Tabs<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      role="tablist"
      style={{
        display: "grid", gridTemplateColumns: `repeat(${options.length}, 1fr)`, gap: 4, padding: 4,
        borderRadius: 14, background: "var(--soft)",
      }}
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(o.value)}
            style={{
              fontFamily: "var(--body)", cursor: "pointer", border: 0, padding: "9px 8px", fontSize: 14,
              fontWeight: 700, borderRadius: 11,
              background: on ? "var(--card)" : "transparent",
              color: on ? "var(--ink)" : "var(--muted)",
              boxShadow: on ? "0 1px 3px rgba(0,0,0,.12)" : "none",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export type BoardRow = { rank: number; name: string; meta?: string; points: number; me?: boolean };

export function LeaderboardList({ rows }: { rows: BoardRow[] }) {
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 2 }}>
      {rows.map((r) => (
        <li
          key={r.rank}
          style={{
            display: "grid", gridTemplateColumns: "28px 1fr auto", alignItems: "center", gap: 10,
            padding: "8px 10px", borderRadius: 12, background: r.me ? "var(--me-bg)" : "transparent",
          }}
        >
          <span
            style={{
              fontFamily: "var(--display)", fontWeight: 800, fontSize: 18, textAlign: "center",
              color: r.rank <= 3 ? "var(--red)" : "var(--muted)", fontVariantNumeric: "tabular-nums",
            }}
          >
            {r.rank}
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {r.name}
              {r.me ? " (you)" : ""}
            </div>
            {r.meta && (
              <div style={{ fontSize: 12, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {r.meta}
              </div>
            )}
          </div>
          <span style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 22, fontVariantNumeric: "tabular-nums" }}>
            {r.points}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function SiteBrand({ href }: { href: string }) {
  return (
    <Link href={href} style={{ display: "flex", alignItems: "center", gap: 10, color: "#FFFFFF" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/icon-only.png" alt="" width={40} height={40} style={{ borderRadius: 11 }} />
      <span style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 24, lineHeight: 1 }}>Duck Crossing</span>
    </Link>
  );
}

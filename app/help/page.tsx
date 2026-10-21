import type { Metadata } from "next";
import Link from "next/link";
import { SiteBrand } from "@/components/ds";
import { HelpTabs } from "./HelpTabs";

export const metadata: Metadata = {
  title: "Duck Crossing · Privacy, terms and support",
  description: "Privacy policy, terms of use and support for Duck Crossing.",
};

export default function HelpPage() {
  return (
    <div style={{ background: "var(--forest)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header className="wrap" style={{ width: "100%", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <SiteBrand href="/" />
        <Link href="/" style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700 }}>
          Back to home
        </Link>
      </header>

      <HelpTabs />

      <footer
        className="wrap"
        style={{
          width: "100%", padding: "0 24px 32px", display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          gap: 12, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.8)",
        }}
      >
        <div>© 2026 Duck Crossing</div>
        <div style={{ display: "flex", gap: 18, fontWeight: 700 }}>
          <a href="#privacy" style={{ color: "#FFFFFF" }}>Privacy</a>
          <a href="#terms" style={{ color: "#FFFFFF" }}>Terms</a>
          <a href="#support" style={{ color: "#FFFFFF" }}>Support</a>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { ButtonLink, Tabs } from "@/components/ds";

type Page = "privacy" | "terms" | "support";

const TABS: { value: Page; label: string }[] = [
  { value: "privacy", label: "Privacy" },
  { value: "terms", label: "Terms" },
  { value: "support", label: "Support" },
];

const SUPPORT_EMAIL = "support@duckcrossing.app";

const FAQS = [
  { q: "Can I move left or right?", a: "No. Every tap hops the duck forward one lane. Wait for a gap, then hop." },
  { q: "How do I unlock hats?", a: "Each hat has a milestone, like crossing 25 lanes or reaching Snow Valley. Open Hats from the title screen to see what each one needs." },
  { q: "My score wasn't posted", a: "Posting needs a connection. If a run couldn't be verified, it isn't posted. Your best is still saved on this device." },
  { q: "How do I change my nickname?", a: "Open settings from the gear on the title screen and edit your name. Names need at least 2 characters." },
  { q: "The game feels too bouncy", a: "Turn on Reduce motion in settings. It removes the bounces and keeps simple fades." },
  { q: "How do I unlock characters?", a: "Each character unlocks with an achievement, like River Rat for the Frog. Open Characters & Hats from the title screen to see your progress." },
  { q: "I reinstalled. Where are my achievements?", a: "Achievements and your equipped character are stored with your player record and come back after a reinstall once you're online." },
  { q: "What are daily challenges?", a: "Three goals each day, the same for everyone. Finish all three on consecutive days to build a streak." },
];

// The selected tab lives in the URL hash so footer links like /help#terms open the right page.
function subscribe(cb: () => void) {
  const onHash = () => {
    cb();
    window.scrollTo(0, 0);
  };
  window.addEventListener("hashchange", onHash);
  return () => window.removeEventListener("hashchange", onHash);
}
function getPage(): Page {
  const h = window.location.hash.slice(1);
  return h === "terms" || h === "support" ? h : "privacy";
}

export function HelpTabs() {
  const page = useSyncExternalStore(subscribe, getPage, () => "privacy" as Page);
  const setPage = (v: Page) => {
    window.location.hash = v;
  };

  return (
    <main style={{ flex: 1, width: "100%", maxWidth: 760, margin: "0 auto", padding: "24px 24px 80px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ maxWidth: 420, width: "100%" }}>
        <Tabs options={TABS} value={page} onChange={setPage} />
      </div>

      <article
        className="card stack"
        style={{ padding: "clamp(24px, 5vw, 44px)", gap: 28, boxShadow: "var(--shadow-card)", lineHeight: 1.6, fontSize: 16 }}
      >
        {page === "privacy" && <Privacy />}
        {page === "terms" && <Terms />}
        {page === "support" && <Support />}
      </article>
    </main>
  );
}

function Head({ updated, title, lede }: { updated?: string; title: string; lede: string }) {
  return (
    <div className="stack" style={{ gap: 8 }}>
      {updated && <div className="eyebrow">Updated {updated}</div>}
      <h1 style={{ margin: 0, fontFamily: "var(--display)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 56px)", lineHeight: 0.95 }}>{title}</h1>
      <p style={{ margin: 0, color: "var(--ink-2)", fontSize: 17 }}>{lede}</p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="stack" style={{ gap: 8 }}>
      <h2 style={{ margin: 0, fontFamily: "var(--display)", fontWeight: 800, fontSize: 26, lineHeight: 1.1 }}>{title}</h2>
      {children}
    </section>
  );
}

const P = ({ children }: { children: ReactNode }) => <p style={{ margin: 0, color: "var(--ink-2)" }}>{children}</p>;

const mailLink = { color: "var(--pond)", fontWeight: 700 } as const;

function Privacy() {
  return (
    <>
      <Head updated="Oct 20, 2026" title="Privacy policy" lede="Duck Crossing collects as little as it needs to run the game and the leaderboard." />
      <Block title="What stays on your device">
        <P>Settings, tip progress and your chosen scenery are saved locally. Your best score, hats and character are also kept on this device.</P>
      </Block>
      <Block title="What we receive when you post a score">
        <ul style={{ margin: 0, paddingLeft: 20, color: "var(--ink-2)", display: "flex", flexDirection: "column", gap: 4 }}>
          <li>The nickname you choose for the board</li>
          <li>Your run result: points, lanes, ducklings and the date</li>
          <li>Run totals used for achievements and daily challenges, like logs ridden and road lanes crossed</li>
          <li>Your equipped character and hat</li>
          <li>A random device ID, used to keep one entry per player and check that runs are valid</li>
        </ul>
        <P>Nicknames and scores are public on the leaderboard. We don&apos;t ask for your real name, email or location.</P>
      </Block>
      <Block title="Usage stats and notifications">
        <P>
          If Usage stats is on in settings, the game sends simple gameplay events, like a run starting or an achievement earned,
          with your platform and app version. No third-party analytics SDK is used. Turn it off at any time and queued events
          are deleted. If you allow notifications, we store a push token to send reminders, which you can turn off in your
          device settings.
        </P>
      </Block>
      <Block title="What we don't do">
        <P>We don&apos;t sell your data, and we don&apos;t use it for advertising profiles.</P>
      </Block>
      <Block title="Deleting your data">
        <P>
          Uninstalling the app removes everything stored on your device. To remove your leaderboard entries, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} style={mailLink}>{SUPPORT_EMAIL}</a> with your nickname.
        </P>
      </Block>
      <Block title="Children">
        <P>Duck Crossing is suitable for all ages and does not knowingly collect personal information from children.</P>
      </Block>
    </>
  );
}

function Terms() {
  return (
    <>
      <Head updated="Oct 9, 2026" title="Terms of use" lede="By playing Duck Crossing you agree to these terms." />
      <Block title="Using the game">
        <P>You can play Duck Crossing for personal, non-commercial use. The game, its art and its code belong to Duck Crossing.</P>
      </Block>
      <Block title="Nicknames">
        <P>Names on the board must be at least 2 characters and must not be offensive, impersonate someone or include personal details. We may rename or remove entries that break this rule.</P>
      </Block>
      <Block title="Fair play">
        <P>Runs are checked before they&apos;re posted. Scores from modified apps, scripts or other tricks are removed, and the device may be blocked from the board.</P>
      </Block>
      <Block title="Availability">
        <P>The game works offline. The leaderboard and daily crossing need a connection and may sometimes be unavailable. We may change or reset boards, hats and features over time.</P>
      </Block>
      <Block title="Liability">
        <P>Duck Crossing is provided as is. To the extent the law allows, we aren&apos;t liable for losses from using the game, including lost scores or progress.</P>
      </Block>
    </>
  );
}

function Support() {
  return (
    <>
      <Head title="Support" lede="Stuck on a river or missing a hat? Check below, or write to us." />
      <div
        style={{
          background: "var(--soft)", borderRadius: 14, padding: "18px 20px", display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: 14,
        }}
      >
        <div className="stack" style={{ gap: 2 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" }}>Email</div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>{SUPPORT_EMAIL}</div>
        </div>
        <ButtonLink href={`mailto:${SUPPORT_EMAIL}`} variant="primary" style={{ padding: "12px 22px", fontSize: 18 }}>
          Send an email
        </ButtonLink>
      </div>
      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: -16 }}>
        Include your device model and nickname. We usually reply within two working days.
      </div>
      {FAQS.map((f) => (
        <section key={f.q} className="stack" style={{ gap: 6, paddingTop: 20, borderTop: "1px solid var(--divider)" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--display)", fontWeight: 800, fontSize: 22, lineHeight: 1.15 }}>{f.q}</h2>
          <P>{f.a}</P>
        </section>
      ))}
    </>
  );
}

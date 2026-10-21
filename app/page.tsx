import Image from "next/image";
import Link from "next/link";
import { ButtonLink, LeaderboardList, RuleChips, SiteBrand, Steps } from "@/components/ds";
import { CharacterIcon } from "@/components/CharacterIcon";
import { DailyChallenges, TodayLabel } from "@/components/DailyChallenges";
import { board, characters, hats, rules, steps, tiers, zones } from "@/lib/game-data";
import hero from "@/public/assets/hero-gameplay-v3.jpg";
import logo from "@/public/assets/logo.png";

// Store links aren't live yet.
const APP_STORE_URL = "#";
const PLAY_STORE_URL = "#";

const NAV = [
  ["#how", "How to play"],
  ["#zones", "Areas"],
  ["#characters", "Characters"],
  ["#achievements", "Achievements"],
  ["#board", "Leaderboard"],
];

export default function Home() {
  return (
    <div style={{ background: "var(--forest)", minHeight: "100vh" }}>
      <header className="wrap" style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <SiteBrand href="#top" />
        <nav style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", alignItems: "center", columnGap: 22, rowGap: 8, fontWeight: 700, fontSize: 14 }}>
          {NAV.map(([href, label]) => (
            <a key={href} href={href} style={{ color: "#FFFFFF" }}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section
        id="top"
        className="wrap"
        style={{
          padding: "40px 24px 96px", display: "grid", gap: 56, alignItems: "center",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
        }}
      >
        <div className="stack" style={{ gap: 24, color: "#FFFFFF" }}>
          <div className="eyebrow on-dark">Free on iOS and Android</div>
          <h1 style={{ margin: 0, fontFamily: "var(--display)", fontWeight: 800, fontSize: "clamp(52px, 7vw, 84px)", lineHeight: 0.9, textWrap: "balance" }}>
            Tap to hop. Keep moving.
          </h1>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, maxWidth: "30em", color: "rgba(255,255,255,.88)", textWrap: "pretty" }}>
            A one-button road-crossing game. Hop a duck forward one lane at a time, dodge cars, ride logs across rivers and
            beat the train. A fox is closing in, so don&apos;t wait too long.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, paddingTop: 6 }}>
            <ButtonLink href={APP_STORE_URL} variant="primary" style={{ padding: "16px 26px" }}>
              Get it on the App Store
            </ButtonLink>
            <ButtonLink href={PLAY_STORE_URL} variant="secondary" style={{ padding: "16px 26px" }}>
              Get it on Google Play
            </ButtonLink>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.8)" }}>
            12 characters · 22 hats · 3 new challenges every day
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 320, maxWidth: "100%", background: "var(--ink)", borderRadius: 48, padding: 12,
              boxShadow: "0 10px 0 rgba(0,0,0,.18), 0 30px 60px rgba(0,0,0,.35)",
            }}
          >
            <div style={{ position: "relative", width: "100%", aspectRatio: "1179 / 2556", borderRadius: 37, overflow: "hidden", background: "var(--forest)" }}>
              <Image
                src={hero}
                alt="Duck Crossing gameplay: the duck rides a log across a river on The Farm"
                fill
                priority
                sizes="296px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="section" style={{ background: "var(--soft)" }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 16 }}>
            <div className="eyebrow">How to play</div>
            <h2 className="h2">One button. Forward only.</h2>
            <p className="lede" style={{ maxWidth: "30em" }}>
              There&apos;s no left, right or back. Every tap is one lane forward, so timing is the whole game. Hop fast to
              build a chain and multiply your score.
            </p>
          </div>
          <div className="card stack" style={{ padding: "26px 24px", gap: 18, boxShadow: "var(--shadow-card-soft)" }}>
            <Steps items={steps} />
            <RuleChips items={rules} />
          </div>
        </div>
      </section>

      <section id="zones" className="section" style={{ background: "var(--forest)", color: "#FFFFFF" }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="intro">
            <div className="eyebrow on-dark">Areas</div>
            <h2 className="h2">Nine areas, one every 50 lanes.</h2>
            <p className="lede on-dark">
              Start on the farm. Keep going and the rivers freeze, the lights go out, the river turns to lava and the road
              ends up on the moon. Any area you&apos;ve reached can be your scenery for a whole run.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {zones.map(({ name, lanes, c: [grass, road, line, grass2, water, log] }) => (
              <div key={name} style={{ background: "#FFFFFF", color: "var(--ink)", borderRadius: 20, overflow: "hidden", boxShadow: "0 6px 0 rgba(0,0,0,.14)" }}>
                <div aria-hidden="true" style={{ display: "grid", gridTemplateRows: "20px 16px 16px 18px 20px 18px", height: 108 }}>
                  <div style={{ background: grass }} />
                  <div style={{ background: road }} />
                  <div style={{ background: road, borderTop: `2px dashed ${line}` }} />
                  <div style={{ background: grass2 }} />
                  <div style={{ background: water, display: "flex", alignItems: "center", paddingLeft: "28%" }}>
                    <div style={{ width: "44%", height: 10, borderRadius: 5, background: log }} />
                  </div>
                  <div style={{ background: grass }} />
                </div>
                <div className="stack" style={{ padding: "16px 18px 18px", gap: 4 }}>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{name}</div>
                  <div className="meta">{lanes}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.88)" }}>
            <span>Holiday lanes on the right dates:</span>
            {["🎃 Halloween", "🦃 Thanksgiving", "🎄 Christmas", "🎆 New Year"].map((h) => (
              <span key={h} style={{ background: "var(--glass)", borderRadius: 999, padding: "6px 12px" }}>
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="characters" className="section" style={{ background: "var(--soft)" }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="intro">
            <div className="eyebrow">Characters</div>
            <h2 className="h2">Twelve animals. Same hop.</h2>
            <p className="lede">
              Each character unlocks with an achievement and brings its own babies along. Every one has the duck&apos;s
              hitbox and speed, so the board stays fair.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
            {characters.map((ch) => (
              <div
                key={ch.id}
                className="stack"
                style={{ background: "#FFFFFF", borderRadius: 14, padding: "16px 14px", alignItems: "center", gap: 8, textAlign: "center", boxShadow: "0 4px 0 rgba(0,0,0,.06)" }}
              >
                <CharacterIcon id={ch.id} size={80} />
                <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 20, lineHeight: 1 }}>{ch.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.35 }}>{ch.req}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hats" className="section" style={{ background: "#FFFFFF" }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="intro">
            <div className="eyebrow">Hats</div>
            <h2 className="h2">22 hats. Any animal can wear any of them.</h2>
            <p className="lede">Hats unlock from milestones and achievements. Mix and match with any character.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))", gap: 12 }}>
            {hats.map((hat) => (
              <div
                key={hat.id}
                className="stack"
                style={{ background: "var(--soft)", borderRadius: 14, padding: "14px 10px", alignItems: "center", gap: 6, textAlign: "center" }}
              >
                <CharacterIcon id={hat.char} hat={hat.id} size={64} />
                <div style={{ fontWeight: 700, fontSize: 14 }}>{hat.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.35 }}>{hat.req}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="section" style={{ background: "var(--soft)" }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <div className="intro">
            <div className="eyebrow">Achievements</div>
            <h2 className="h2">29 achievements. One is a secret.</h2>
            <p className="lede">
              They&apos;re checked on the server from verified runs, so they can&apos;t be faked and they come back after a
              reinstall.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 16, alignItems: "start" }}>
            {tiers.map((t) => (
              <div key={t.label} className="card stack" style={{ padding: "22px 20px 18px", gap: 13, boxShadow: "var(--shadow-card-soft)" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 26, lineHeight: 1 }}>{t.label}</div>
                  <div className="meta">{t.count}</div>
                </div>
                <div className="stack">
                  {t.items.map((a, i) => (
                    <div
                      key={i}
                      style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "2px 12px", padding: "9px 0", borderTop: "1px solid var(--divider)" }}
                    >
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{a.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-2)", textAlign: "right" }}>{a.reward}</div>
                      <div style={{ gridColumn: "1 / -1", fontSize: 13, color: "var(--muted)", lineHeight: 1.35 }}>{a.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="board" className="section" style={{ background: "var(--forest)", color: "#FFFFFF" }}>
        <div className="wrap split">
          <div className="stack" style={{ gap: 16 }}>
            <div className="eyebrow on-dark">Daily crossing</div>
            <h2 className="h2">Same road for everyone, every day.</h2>
            <p className="lede on-dark" style={{ maxWidth: "30em" }}>
              The daily crossing uses one seed worldwide. Post your best run to today&apos;s board, or chase the all-time
              list.
            </p>
            <DailyChallenges />
          </div>
          <div
            className="card stack"
            style={{ padding: "22px 20px 18px", gap: 13, boxShadow: "var(--shadow-card)", maxWidth: 420, width: "100%", justifySelf: "center" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontFamily: "var(--display)", fontWeight: 800, fontSize: 28, lineHeight: 1 }}>Today&apos;s board</div>
              <div className="meta">
                Daily · <TodayLabel />
              </div>
            </div>
            <LeaderboardList rows={board} />
          </div>
        </div>
      </section>

      <footer style={{ background: "var(--duck)", padding: "80px 24px" }}>
        <div className="wrap stack" style={{ alignItems: "center", textAlign: "center", gap: 22 }}>
          <Image src={logo} alt="Duck Crossing" width={140} height={140} />
          <h2 className="h2" style={{ fontSize: "clamp(38px, 5vw, 60px)" }}>
            Get the duck as far as she can go.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            <ButtonLink href={APP_STORE_URL} variant="secondary" style={{ padding: "16px 26px" }}>
              Get it on the App Store
            </ButtonLink>
            <ButtonLink href={PLAY_STORE_URL} variant="secondary" style={{ padding: "16px 26px" }}>
              Get it on Google Play
            </ButtonLink>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18, fontSize: 13, fontWeight: 700 }}>
            <Link href="/help#privacy">Privacy</Link>
            <Link href="/help#terms">Terms</Link>
            <Link href="/help#support">Support</Link>
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)" }}>© 2026 Duck Crossing</div>
        </div>
      </footer>
    </div>
  );
}

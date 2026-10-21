// Canvas2D character and hat drawing, ported from the design project's character-art.js (itself from the game).
// (x, y) is the body center; characters are top-down-ish and face up the screen, about 22 × 28 px at k = 1.

type Ctx = CanvasRenderingContext2D;
type Pose = "idle0" | "idle1" | "hop" | "happy" | "fail";

const TAU = Math.PI * 2;

function rr(c: Ctx, x: number, y: number, w: number, h: number, r: number) {
  c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
function ell(c: Ctx, x: number, y: number, rx: number, ry: number, rot = 0) { c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, TAU); c.fill(); }
function circ(c: Ctx, x: number, y: number, r: number) { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); }
const shadow = (c: Ctx, w = 11) => { c.fillStyle = "rgba(0,0,0,.18)"; ell(c, 1, 9, w, 5); };

function drawHat(c: Ctx, id: string) {
  if (id === "party") { c.fillStyle = "#FF5D8F"; c.beginPath(); c.moveTo(-5, -11); c.lineTo(0, -24); c.lineTo(5, -11); c.closePath(); c.fill(); c.fillStyle = "#FFE066"; c.fillRect(-3, -16, 6, 2); c.beginPath(); c.arc(0, -24, 2, 0, 7); c.fill(); }
  else if (id === "shades") { c.fillStyle = "#14161C"; rr(c, -7, -12, 6, 3.6, 1.5); c.fill(); rr(c, 1, -12, 6, 3.6, 1.5); c.fill(); c.fillRect(-1, -11.4, 2, 1); c.fillStyle = "rgba(255,255,255,.5)"; c.fillRect(-6, -11.5, 2, 1); }
  else if (id === "cowboy") { c.fillStyle = "#9A6234"; c.beginPath(); c.ellipse(0, -13, 11, 3.2, 0, 0, 7); c.fill(); rr(c, -5, -21, 10, 8, 3); c.fill(); c.fillStyle = "#6E4220"; c.fillRect(-5, -15, 10, 2); }
  else if (id === "tophat") { c.fillStyle = "#1B1D24"; c.beginPath(); c.ellipse(0, -13.5, 9, 2.6, 0, 0, 7); c.fill(); c.fillRect(-5.5, -26, 11, 13); c.fillStyle = "#C93838"; c.fillRect(-5.5, -17, 11, 2.5); }
  else if (id === "beanie") { c.fillStyle = "#2E9CCA"; c.beginPath(); c.arc(0, -13, 7, Math.PI, 0); c.fill(); c.fillStyle = "#FFFFFF"; c.fillRect(-7.5, -14, 15, 3); c.beginPath(); c.arc(0, -21, 3, 0, 7); c.fill(); }
  else if (id === "chef") { c.fillStyle = "#FFFFFF"; c.strokeStyle = "#D5DED0"; c.lineWidth = .8; c.fillRect(-5, -18, 10, 6); c.strokeRect(-5, -18, 10, 6); c.beginPath(); c.arc(-3.5, -20, 3.5, 0, 7); c.arc(0, -22, 4, 0, 7); c.arc(3.5, -20, 3.5, 0, 7); c.fill(); }
  else if (id === "visor") { c.fillStyle = "#2EC4B6"; c.beginPath(); c.ellipse(0, -15.5, 8.5, 4.2, 0, Math.PI, 0); c.fill(); c.fillStyle = "#FFFFFF"; c.fillRect(-7.5, -13.6, 15, 2.2); c.fillStyle = "rgba(255,255,255,.45)"; c.beginPath(); c.ellipse(-2.5, -17, 3, 1.2, -.2, 0, 7); c.fill(); }
  else if (id === "laurel") { c.fillStyle = "#E8B923"; for (let i = 0; i < 5; i++) { const a = Math.PI * (.15 + i * .17); for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * Math.cos(a) * 7.2, -8 - Math.sin(a) * 7.2, 2.6, 1.3, s * (a + Math.PI / 2), 0, 7); c.fill(); } } c.fillStyle = "#FFD95A"; c.beginPath(); c.arc(0, -15.6, 1.5, 0, 7); c.fill(); }
  else if (id === "flower") {
    c.fillStyle = "#5FA845"; for (const x of [-6, -2, 2, 6]) { c.beginPath(); c.ellipse(x, -14.2, 2, 1.1, x * .1, 0, 7); c.fill(); }
    ([[-6.5, -13, "#FF7EB6"], [-3.3, -15.4, "#FFE066"], [0, -16.2, "#FFFFFF"], [3.3, -15.4, "#B388FF"], [6.5, -13, "#FF7EB6"]] as [number, number, string][]).forEach(([x, y, col]) => {
      c.fillStyle = col; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(x + Math.cos(k * 1.26) * 1.3, y + Math.sin(k * 1.26) * 1.3, 1.2, 0, 7); c.fill(); }
      c.fillStyle = "#FFB300"; c.beginPath(); c.arc(x, y, .8, 0, 7); c.fill();
    });
  }
  else if (id === "detective") {
    c.fillStyle = "#8B6A45"; c.beginPath(); c.ellipse(0, -11, 4.5, 2, 0, 0, 7); c.ellipse(0, -21, 4, 1.8, 0, 0, 7); c.fill();
    c.fillStyle = "#A07A50"; c.beginPath(); c.arc(0, -15.5, 7, Math.PI, 0); c.fill(); c.fillRect(-7, -15.5, 14, 2);
    c.strokeStyle = "#6E5236"; c.lineWidth = .7; c.beginPath();
    for (const x of [-4, 0, 4]) { c.moveTo(x, -22); c.lineTo(x, -13.5); }
    c.moveTo(-6.5, -18); c.lineTo(6.5, -18); c.stroke();
  }
  else if (id === "pirate") {
    c.fillStyle = "#1B1D24"; c.beginPath(); c.moveTo(-11, -13); c.quadraticCurveTo(0, -27, 11, -13); c.quadraticCurveTo(0, -16, -11, -13); c.fill();
    c.strokeStyle = "#E8B923"; c.lineWidth = .9; c.beginPath(); c.moveTo(-10, -13.4); c.quadraticCurveTo(0, -16.2, 10, -13.4); c.stroke();
    c.fillStyle = "#FFFFFF"; c.beginPath(); c.arc(0, -18.6, 1.9, 0, 7); c.fill(); c.fillRect(-1.2, -17.2, 2.4, 1.4);
  }
  else if (id === "hardhat") {
    c.fillStyle = "#F6C026"; c.beginPath(); c.ellipse(0, -13, 10.5, 2.6, 0, 0, 7); c.fill();
    c.beginPath(); c.arc(0, -13.5, 7.6, Math.PI, 0); c.fill();
    c.fillStyle = "#E0A800"; c.fillRect(-1.3, -21, 2.6, 7.6);
    c.fillStyle = "rgba(255,255,255,.45)"; c.beginPath(); c.ellipse(-3.5, -17.5, 2.2, 1.2, -.5, 0, 7); c.fill();
  }
  else if (id === "headphones") {
    c.strokeStyle = "#2B3038"; c.lineWidth = 2.2; c.beginPath(); c.arc(0, -9, 9, Math.PI * 1.05, Math.PI * 1.95); c.stroke();
    c.fillStyle = "#E8423A"; c.beginPath(); c.ellipse(-8.6, -9, 2.6, 3.6, 0, 0, 7); c.ellipse(8.6, -9, 2.6, 3.6, 0, 0, 7); c.fill();
    c.fillStyle = "#2B3038"; c.beginPath(); c.ellipse(-8.6, -9, 1.2, 2, 0, 0, 7); c.ellipse(8.6, -9, 1.2, 2, 0, 0, 7); c.fill();
  }
  else if (id === "propeller") {
    const cols = ["#E8423A", "#FFD23F", "#2E9CCA", "#45C49B"];
    for (let i = 0; i < 4; i++) { c.fillStyle = cols[i]; c.beginPath(); c.moveTo(0, -13); c.arc(0, -13, 7, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); c.closePath(); c.fill(); }
    c.fillStyle = "#3A3F4A"; c.fillRect(-.6, -24, 1.2, 4.4);
    c.fillStyle = "#E8423A"; c.beginPath(); c.ellipse(-4, -24, 4, 1.3, .15, 0, 7); c.fill();
    c.fillStyle = "#2E9CCA"; c.beginPath(); c.ellipse(4, -24, 4, 1.3, -.15, 0, 7); c.fill();
    c.fillStyle = "#FFD23F"; c.beginPath(); c.arc(0, -24, 1.2, 0, 7); c.fill();
  }
  else if (id === "viking") {
    c.fillStyle = "#F2EBDD";
    c.beginPath(); c.moveTo(-6, -15); c.quadraticCurveTo(-13, -17, -12, -25); c.quadraticCurveTo(-9.5, -19, -5, -18); c.fill();
    c.beginPath(); c.moveTo(6, -15); c.quadraticCurveTo(13, -17, 12, -25); c.quadraticCurveTo(9.5, -19, 5, -18); c.fill();
    c.fillStyle = "#9AA3AE"; c.beginPath(); c.arc(0, -13.5, 7.5, Math.PI, 0); c.fill();
    c.fillStyle = "#7A5838"; c.fillRect(-7.5, -14.5, 15, 2.4);
    c.fillStyle = "#C9D1D9"; c.fillRect(-.8, -21, 1.6, 6.5);
  }
  else if (id === "halo") {
    c.fillStyle = "rgba(255,226,122,.3)"; c.beginPath(); c.ellipse(0, -21, 9.5, 3.8, 0, 0, 7); c.fill();
    c.strokeStyle = "#FFD23F"; c.lineWidth = 1.8; c.beginPath(); c.ellipse(0, -21, 7, 2.4, 0, 0, 7); c.stroke();
  }
  else if (id === "sweatband") {
    c.fillStyle = "#E8423A"; rr(c, -7.6, -14.6, 15.2, 3.4, 1.5); c.fill();
    c.fillStyle = "#FFFFFF"; c.fillRect(-7.6, -13.4, 15.2, 1);
    c.fillStyle = "#E8423A"; c.beginPath(); c.ellipse(8.6, -11.5, 1.4, 3, .5, 0, 7); c.ellipse(9.4, -10, 1.2, 2.6, .9, 0, 7); c.fill();
  }
  else if (id === "conductor") {
    c.fillStyle = "#1A2E4A"; c.beginPath(); c.ellipse(0, -13.4, 8.6, 2.6, 0, 0, 7); c.fill();
    c.fillStyle = "#23395B"; rr(c, -6, -20.5, 12, 7.5, 2.5); c.fill();
    c.fillStyle = "#E8B923"; c.fillRect(-6, -15.8, 12, 1.6); c.beginPath(); c.arc(0, -18.4, 1.3, 0, 7); c.fill();
  }
  else if (id === "grad") {
    c.fillStyle = "#1B1D24"; rr(c, -5.5, -17, 11, 4.5, 1.5); c.fill();
    c.beginPath(); c.moveTo(0, -24.5); c.lineTo(11, -19.5); c.lineTo(0, -15); c.lineTo(-11, -19.5); c.closePath(); c.fill();
    c.strokeStyle = "#E8B923"; c.lineWidth = .9; c.beginPath(); c.moveTo(0, -19.8); c.lineTo(8, -18.4); c.lineTo(8.6, -13.4); c.stroke();
    c.fillStyle = "#E8B923"; c.beginPath(); c.ellipse(8.6, -12.6, 1.1, 1.8, 0, 0, 7); c.fill();
  }
  else if (id === "sombrero") {
    c.fillStyle = "#D9A54A"; c.beginPath(); c.ellipse(0, -13, 14, 4.2, 0, 0, 7); c.fill();
    c.fillStyle = "#E8BC62"; c.beginPath(); c.ellipse(0, -14.5, 6.4, 6.8, 0, Math.PI, 0); c.fill(); c.fillRect(-6.4, -14.6, 12.8, 1.8);
    c.strokeStyle = "#C9302C"; c.lineWidth = 1.2; c.beginPath();
    for (let i = 0; i <= 8; i++) { const x = -6 + i * 1.5, y = -15.4 + (i % 2 ? -1.1 : 0); if (i) c.lineTo(x, y); else c.moveTo(x, y); }
    c.stroke();
    c.strokeStyle = "#B9862F"; c.lineWidth = .8; c.beginPath(); c.ellipse(0, -13, 12, 3.2, 0, 0, 7); c.stroke();
  }
  else if (id === "astronaut") {
    c.fillStyle = "rgba(190,225,255,.28)"; c.beginPath(); c.arc(0, -8, 11, 0, 7); c.fill();
    c.strokeStyle = "#E9EEF2"; c.lineWidth = 1.6; c.beginPath(); c.arc(0, -8, 11, 0, 7); c.stroke();
    c.fillStyle = "rgba(255,255,255,.75)"; c.beginPath(); c.ellipse(-5, -14, 3, 1.6, -.6, 0, 7); c.fill();
    c.fillStyle = "#C9D1D9"; rr(c, -8, 1.5, 16, 3, 1.4); c.fill();
  }
  else if (id === "crown") { c.fillStyle = "#FFC93C"; c.beginPath(); c.moveTo(-6, -13); c.lineTo(-6, -20); c.lineTo(-3, -16.5); c.lineTo(0, -21.5); c.lineTo(3, -16.5); c.lineTo(6, -20); c.lineTo(6, -13); c.closePath(); c.fill(); c.fillStyle = "#F0533F"; c.beginPath(); c.arc(0, -15.5, 1.3, 0, 7); c.fill(); }
}

/** Eyes for each pose: dots with a highlight, happy ^ ^, or crash X X. */
function eyes(c: Ctx, pose: Pose, x: number, y: number, r = 1.6, ink = "#1F2D3A") {
  if (pose === "happy") {
    c.strokeStyle = ink; c.lineWidth = 1.2; c.lineCap = "round";
    for (const s of [-1, 1]) { c.beginPath(); c.arc(s * x, y + .8, r, Math.PI * 1.1, Math.PI * 1.9); c.stroke(); }
  } else if (pose === "fail") {
    c.strokeStyle = ink; c.lineWidth = 1.1; c.lineCap = "round";
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * x - r, y - r); c.lineTo(s * x + r, y + r); c.moveTo(s * x + r, y - r); c.lineTo(s * x - r, y + r); c.stroke(); }
  } else {
    c.fillStyle = ink; circ(c, -x, y, r); circ(c, x, y, r);
    c.fillStyle = "#fff"; c.fillRect(-x + .2, y - .8, .9, .9); c.fillRect(x + .2, y - .8, .9, .9);
  }
}

type BirdLook = {
  body: string; shade: string; beak: string; beakLine: string; feet: string;
  wing?: string; head?: string; headY?: number; eyeInk?: string; beakShape?: "pointy" | "bill";
  under?: (c: Ctx, pose: Pose) => void;
  crown?: (c: Ctx, pose: Pose, hy: number) => void;
  over?: (c: Ctx, pose: Pose, bob: number) => void;
};

/** The duck's anatomy, re-coloured and decorated per character. */
function bird(c: Ctx, L: BirdLook, pose: Pose) {
  const bob = pose === "idle1" ? .8 : 0, hy = (L.headY ?? -8) + bob;
  shadow(c);
  if (pose !== "hop") { c.fillStyle = L.feet; ell(c, -5, 8, 3.5, 2.2); ell(c, 5, 8, 3.5, 2.2); }
  L.under?.(c, pose);
  c.fillStyle = L.shade; ell(c, 0, 2, 11, 10);
  c.fillStyle = L.body; ell(c, 0, 1, 10, 9);
  c.fillStyle = L.wing ?? L.shade;
  if (pose === "happy" || pose === "fail") { ell(c, -10, -1, 3.6, 6.5, pose === "happy" ? 1.1 : .7); ell(c, 10, -1, 3.6, 6.5, pose === "happy" ? -1.1 : -.7); }
  else if (pose === "hop") { ell(c, -8, 2, 4, 6, .55); ell(c, 8, 2, 4, 6, -.55); }
  else { ell(c, -7, 3, 4, 6, .3); ell(c, 7, 3, 4, 6, -.3); }
  c.fillStyle = L.head ?? L.body; circ(c, 0, hy, 7.5);
  L.crown?.(c, pose, hy);
  c.fillStyle = L.beak;
  if (L.beakShape === "pointy") { c.beginPath(); c.moveTo(-2.6, hy - 6); c.lineTo(0, hy - 10.5); c.lineTo(2.6, hy - 6); c.closePath(); c.fill(); }
  else if (L.beakShape === "bill") { rr(c, -5, hy - 12, 10, 6, 2.6); c.fill(); }
  else { ell(c, 0, hy - 7, 4.2, 3); c.fillStyle = L.beakLine; c.fillRect(-3.6, hy - 7.2, 7.2, 1); }
  eyes(c, pose, 3.2, hy - 2, 1.6, L.eyeInk);
  L.over?.(c, pose, bob);
}

const DUCK: BirdLook = { body: "#FFFFFF", shade: "#DDE3E8", beak: "#FF9A1F", beakLine: "#E07800", feet: "#FF9A1F" };
const DUCKLING: BirdLook = { body: "#FFE066", shade: "#F2C230", beak: "#FF9A1F", beakLine: "#E07800", feet: "#FF9A1F" };

function spikes(c: Ctx, r0: number, r1: number, n: number, color: string, cx = 0, cy = 0, rot = 0) {
  c.fillStyle = color; c.beginPath();
  for (let i = 0; i < n * 2; i++) { const a = rot + i / (n * 2) * TAU, r = i % 2 ? r0 : r1; c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r * .95); }
  c.closePath(); c.fill();
}

type Art = { hat: { dx: number; dy: number; k: number }; draw: (c: Ctx, p: Pose, baby: boolean) => void };

const ART: Record<string, Art> = {
  duck: { hat: { dx: 0, dy: 0, k: 1 }, draw: (c, p, baby) => bird(c, baby ? DUCKLING : DUCK, p) },

  hen: {
    hat: { dx: 0, dy: -1, k: 1 },
    draw: (c, p, baby) => {
      if (baby) return bird(c, { body: "#FFE680", shade: "#F0C93A", beak: "#F5A623", beakLine: "#D98A00", feet: "#F5A623", beakShape: "pointy" }, p);
      bird(c, {
        body: "#FFFDF8", shade: "#E8DFD2", beak: "#F5B323", beakLine: "#D98A00", feet: "#F2A43A", beakShape: "pointy",
        crown: (g, pose, hy) => { // red comb on top of the head, peeking up behind the beak
          const w = pose === "idle1" ? .5 : 0;
          g.fillStyle = "#E8423A"; circ(g, -2.8, hy - 6.6 + w, 2.1); circ(g, 0, hy - 7.6 - w, 2.4); circ(g, 2.8, hy - 6.6 + w, 2.1);
        },
        over: (g, pose) => { if (pose === "fail") { g.fillStyle = "#FFFDF8"; for (const s of [-1, 1]) ell(g, s * 14, -2, 3, 7, s * 1.3); } }, // flapping
      }, p);
    },
  },

  goose: {
    hat: { dx: 0, dy: -6, k: .95 },
    draw: (c, p, baby) => {
      if (baby) return bird(c, { body: "#E3DA8C", shade: "#C9BE62", beak: "#4A4A42", beakLine: "#2E2E28", feet: "#9B8F4C" }, p);
      const neck = (g: Ctx) => { g.fillStyle = "#5E6670"; rr(g, -3, -14, 6, 12, 3); g.fill(); };
      bird(c, {
        body: "#C9CED6", shade: "#A4ACB7", wing: "#9AA3AE", head: "#5E6670", beak: "#FF9A1F", beakLine: "#E07800", feet: "#FF9A1F", headY: -14,
        under: neck,
        over: (g, _pose, bob) => { g.fillStyle = "#FFFFFF"; ell(g, -5.6, -13 + bob, 1.4, 2.6, .3); ell(g, 5.6, -13 + bob, 1.4, 2.6, -.3); }, // cheek patches
      }, p);
    },
  },

  frog: {
    hat: { dx: 0, dy: 1, k: 1 },
    draw: (c, p, baby) => {
      const body = baby ? "#8FDB6E" : "#5DBB4A", shade = baby ? "#6CBF52" : "#3F9535", belly = baby ? "#C9F0A8" : "#A8E08C";
      shadow(c, 12);
      c.fillStyle = shade;
      if (p === "hop") { ell(c, -6, 12, 2.6, 7, .25); ell(c, 6, 12, 2.6, 7, -.25); ell(c, -9, -6, 2.4, 4, -.4); ell(c, 9, -6, 2.4, 4, .4); }
      else if (p === "fail") { ell(c, -12, 6, 6, 2.4, .3); ell(c, 12, 6, 6, 2.4, -.3); ell(c, -11, -4, 5, 2, -.3); ell(c, 11, -4, 5, 2, .3); }
      else { ell(c, -9.5, 5.5, 4.5, 6, .5); ell(c, 9.5, 5.5, 4.5, 6, -.5); ell(c, -8, -4, 2.6, 3.4); ell(c, 8, -4, 2.6, 3.4); }
      const squat = p === "idle1" ? .5 : 0;
      c.fillStyle = shade; ell(c, 0, 1 + squat, 11.5, 9.5);
      c.fillStyle = body; ell(c, 0, squat, 10.5, 8.8);
      c.fillStyle = belly; ell(c, 0, 3 + squat, 6, 4.5);
      c.fillStyle = body; circ(c, -4.8, -8.5 + squat, 4.4); circ(c, 4.8, -8.5 + squat, 4.4);
      c.fillStyle = "#FFFFFF"; circ(c, -4.8, -9 + squat, 3.2); circ(c, 4.8, -9 + squat, 3.2);
      eyes(c, p, 4.8, -9 + squat, 1.7);
      c.strokeStyle = shade; c.lineWidth = 1; c.beginPath(); c.arc(0, -4.5 + squat, 4, Math.PI * 1.15, Math.PI * 1.85); c.stroke();
    },
  },

  penguin: {
    hat: { dx: 0, dy: 0, k: 1 },
    draw: (c, p, baby) => {
      if (baby) return bird(c, {
        body: "#AEB5BE", shade: "#8E96A1", head: "#AEB5BE", beak: "#2B3038", beakLine: "#11151B", feet: "#5E656E",
        over: (g, pose, bob) => { g.fillStyle = "#FFFFFF"; ell(g, 0, -7.4 + bob, 4.2, 3.2); eyes(g, pose, 3, -10 + bob, 1.4); },
      }, p);
      const tilt = p === "idle0" ? -.1 : p === "idle1" ? .1 : 0;
      c.save(); c.rotate(tilt);
      if (p === "hop") c.scale(.92, 1.15); // belly slide / stretched waddle
      bird(c, {
        body: "#2B3038", shade: "#14181D", wing: "#1E2329", head: "#2B3038", beak: "#FF9A1F", beakLine: "#E07800", feet: "#FF9A1F", eyeInk: "#0B0E12",
        over: (g, pose, bob) => {
          g.fillStyle = "#FFFFFF"; ell(g, 0, 4, 6.5, 5.5); ell(g, 0, -6.8 + bob, 4.6, 3.6);
          g.fillStyle = "#FFC93C"; ell(g, -5.2, -6.5 + bob, 1.6, 2.2, .4); ell(g, 5.2, -6.5 + bob, 1.6, 2.2, -.4);
          eyes(g, pose, 3.1, -10 + bob, 1.5);
        },
      }, p);
      c.restore();
    },
  },

  raccoon: {
    hat: { dx: 0, dy: 0, k: 1 },
    draw: (c, p, baby) => {
      const fur = baby ? "#B6BAC0" : "#9A9FA6", shade = baby ? "#9A9FA6" : "#7C8189", ring = "#3A3D42";
      shadow(c, 11);
      // striped tail behind
      const sway = p === "idle1" ? 1.2 : p === "idle0" ? -1.2 : 0;
      c.save(); c.translate(sway, 0);
      c.fillStyle = fur; ell(c, 0, 14, 4.2, 8);
      c.fillStyle = ring; for (const y of [10, 14.5, 19]) { c.fillRect(-4, y, 8, 1.8); }
      c.restore();
      c.fillStyle = ring; if (p !== "hop") { ell(c, -5, 8, 3.2, 2.2); ell(c, 5, 8, 3.2, 2.2); }
      c.fillStyle = shade; ell(c, 0, 2, 11, 10);
      c.fillStyle = fur; ell(c, 0, 1, 10, 9);
      c.fillStyle = shade; ell(c, -7, 3, 3.6, 5.6, .3); ell(c, 7, 3, 3.6, 5.6, -.3);
      const bob = p === "idle1" ? .8 : 0;
      c.fillStyle = fur; circ(c, -5.4, -12.6 + bob, 2.6); circ(c, 5.4, -12.6 + bob, 2.6); // ears
      c.fillStyle = "#5A5E66"; circ(c, -5.4, -12.6 + bob, 1.3); circ(c, 5.4, -12.6 + bob, 1.3);
      c.fillStyle = fur; circ(c, 0, -8 + bob, 7.5);
      c.fillStyle = "#2A2C31"; rr(c, -7, -11.6 + bob, 14, 4, 2); c.fill(); // mask
      c.fillStyle = "#F1F1EE"; ell(c, 0, -14 + bob, 3.6, 2.8); circ(c, -3.4, -6 + bob, 1.4); circ(c, 3.4, -6 + bob, 1.4);
      c.fillStyle = "#1F2D3A"; circ(c, 0, -15.6 + bob, 1.3);
      eyes(c, p, 3.2, -9.8 + bob, 1.5, "#F1F1EE");
    },
  },

  flamingo: {
    hat: { dx: 0, dy: -7, k: .95 },
    draw: (c, p, baby) => {
      if (baby) return bird(c, { body: "#FBE0EA", shade: "#EDBFD0", beak: "#3E3A3E", beakLine: "#222", feet: "#C99AAC", beakShape: "pointy" }, p);
      const oneLeg = p === "idle0";
      shadow(c);
      c.fillStyle = "#E3709A";
      if (p !== "hop") { if (!oneLeg) ell(c, -4, 9, 3.2, 1.8); ell(c, 4, 9, 3.2, 1.8); }
      c.strokeStyle = "#F7A1C4"; c.lineWidth = 3.4; c.lineCap = "round";
      c.beginPath(); c.moveTo(0, -3); c.quadraticCurveTo(-5, -9, 0, -15); c.stroke(); // S-neck
      c.fillStyle = "#E77FAA"; ell(c, 0, 2, 11, 10);
      c.fillStyle = "#F7A1C4"; ell(c, 0, 1, 10, 9);
      c.fillStyle = "#E77FAA";
      const wr = p === "happy" ? 1.1 : p === "fail" ? .7 : p === "hop" ? .55 : .3;
      ell(c, -7, 3, 4, 6, wr); ell(c, 7, 3, 4, 6, -wr);
      c.fillStyle = "#2B2B2E"; ell(c, -8, 7.5, 1.8, 1.4, wr); ell(c, 8, 7.5, 1.8, 1.4, -wr); // black wing tips
      const bob = p === "idle1" ? .8 : 0;
      c.fillStyle = "#F7A1C4"; circ(c, 0, -15 + bob, 5.6);
      c.fillStyle = "#F4EDE2"; rr(c, -1.8, -24 + bob, 3.6, 6, 1.6); c.fill();
      c.fillStyle = "#2B2B2E"; rr(c, -1.8, -25.5 + bob, 3.6, 3, 1.4); c.fill(); // bent black tip
      eyes(c, p, 2.6, -16.5 + bob, 1.3);
    },
  },

  platypus: {
    hat: { dx: 0, dy: 1, k: 1 },
    draw: (c, p, baby) => {
      const body = baby ? "#E9B9A6" : "#5E7C73", shade = baby ? "#D49C87" : "#4B655D";
      shadow(c, 11);
      c.fillStyle = baby ? "#D49C87" : "#7A5838"; ell(c, 0, 13 + (p === "idle1" ? .8 : 0), 6, 7.5); // beaver tail
      if (!baby) { c.strokeStyle = "#5C4128"; c.lineWidth = .6; for (const y of [10, 13, 16]) { c.beginPath(); c.moveTo(-4, y); c.lineTo(4, y); c.stroke(); } }
      c.fillStyle = "#8A6A4E"; if (p !== "hop") { ell(c, -8, 5, 3.4, 2.4, .5); ell(c, 8, 5, 3.4, 2.4, -.5); ell(c, -7, -4, 3, 2, -.5); ell(c, 7, -4, 3, 2, .5); }
      c.fillStyle = shade; ell(c, 0, 2, 10.5, 10);
      c.fillStyle = body; ell(c, 0, 1, 9.5, 9);
      const bob = p === "idle1" ? .8 : 0;
      c.fillStyle = body; circ(c, 0, -8 + bob, 6.8);
      c.fillStyle = baby ? "#B98A79" : "#4A5866"; rr(c, -7, -21 + bob, 14, 6, 3); c.fill(); // wide flat bill, out in front
      c.fillStyle = baby ? "#A57868" : "#323D48"; circ(c, -2, -19.3 + bob, .8); circ(c, 2, -19.3 + bob, .8); // nostrils
      eyes(c, p, 3, -9.5 + bob, 1.4);
    },
  },

  hedgehog: {
    hat: { dx: 0, dy: 1, k: .95 },
    draw: (c, p, baby) => {
      const dark = baby ? "#B48B66" : "#6B4A2E", mid = baby ? "#D2AE88" : "#8A6440", face = "#E8C9A0";
      shadow(c, 11);
      if (p === "hop" || p === "fail") { // curled into a spiky ball
        spikes(c, 9, 12.5, 16, dark, 0, 1, p === "fail" ? .2 : 0);
        c.fillStyle = mid; circ(c, 0, 1, 8.6);
        c.strokeStyle = dark; c.lineWidth = 1; c.beginPath(); c.arc(0, 1, 4.6, .4, 4.6); c.stroke();
        if (p === "fail") eyes(c, p, 2.2, -1, 1.2);
        return;
      }
      c.fillStyle = "#C9A27E"; ell(c, -5, 8, 3, 2); ell(c, 5, 8, 3, 2);
      spikes(c, 9.5, 12.5, 14, dark, 0, 3, p === "idle1" ? .12 : 0);
      c.fillStyle = mid; ell(c, 0, 3, 9.5, 8.5);
      const bob = p === "idle1" ? .7 : 0;
      c.fillStyle = face; ell(c, 0, -9 + bob, 5.6, 5.2); ell(c, 0, -13 + bob, 3, 2.6);
      c.fillStyle = "#1F2D3A"; circ(c, 0, -15.2 + bob, 1.4);
      eyes(c, p, 2.4, -10 + bob, 1.3);
    },
  },

  turtle: {
    hat: { dx: 0, dy: -3, k: .75 },
    draw: (c, p, baby) => {
      const skin = baby ? "#B8DD8C" : "#9CCB6B", shell = baby ? "#7CC27A" : "#4E9A4B", plate = baby ? "#5FA65E" : "#3B7A39", rim = baby ? "#4F8F4E" : "#2F6A2E";
      shadow(c, 11);
      if (p !== "fail") {
        const tuck = p === "hop" ? 2 : 0;
        c.fillStyle = skin;
        ell(c, -9 + tuck, -5 + tuck, 3, 2.4, -.6); ell(c, 9 - tuck, -5 + tuck, 3, 2.4, .6);
        ell(c, -9 + tuck, 8 - tuck, 3, 2.4, .6); ell(c, 9 - tuck, 8 - tuck, 3, 2.4, -.6);
        ell(c, 0, 12, 1.6, 2.4);
        const bob = p === "idle1" ? .9 : 0;
        circ(c, 0, -11.5 + bob, 4.6);
        eyes(c, p, 2.2, -12.5 + bob, 1.2);
      }
      c.fillStyle = rim; ell(c, 0, 2, 11, 11);
      c.fillStyle = shell; ell(c, 0, 1.4, 10, 10);
      c.strokeStyle = plate; c.lineWidth = 1.2;
      c.beginPath();
      for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + Math.PI / 6; c.lineTo(Math.cos(a) * 4, 1.4 + Math.sin(a) * 4); }
      c.closePath(); c.stroke();
      for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + Math.PI / 6; c.beginPath(); c.moveTo(Math.cos(a) * 4, 1.4 + Math.sin(a) * 4); c.lineTo(Math.cos(a) * 9, 1.4 + Math.sin(a) * 9); c.stroke(); }
      c.fillStyle = "rgba(255,255,255,.2)"; ell(c, -3, -3, 3, 1.6, -.5);
    },
  },

  robot: {
    hat: { dx: 0, dy: 0, k: 1 },
    draw: (c, p, baby) => {
      bird(c, {
        body: baby ? "#D8DEE5" : "#C9D1D9", shade: "#98A3AF", wing: "#AAB4BF", beak: "#F2A33A", beakLine: "#C77F1E", feet: "#7C8792", eyeInk: "#1F2D3A",
        over: (g, pose, bob) => {
          g.strokeStyle = "#7C8792"; g.lineWidth = 1;
          g.beginPath(); g.moveTo(4, -9 + bob); g.lineTo(8.5, -16 + bob); g.stroke();
          g.fillStyle = pose === "idle1" || pose === "happy" ? "#FF5A4E" : "#FFB3AD"; circ(g, 8.5, -16.5 + bob, 1.8);
          // visor eyes over the dots: blink on idle1, bright when happy, red on fail
          g.fillStyle = "#1F2D3A"; rr(g, -6, -12 + bob, 12, 4, 1.6); g.fill();
          g.fillStyle = pose === "fail" ? "#FF5A4E" : "#5BE7FF";
          if (pose === "idle1") { g.fillRect(-4.6, -10.4 + bob, 3, .8); g.fillRect(1.6, -10.4 + bob, 3, .8); }
          else { g.fillRect(-4.6, -11.2 + bob, 3, 2.2); g.fillRect(1.6, -11.2 + bob, 3, 2.2); }
          if (!baby) { g.fillStyle = "#8F9AA6"; for (const [x, y] of [[-5, 1], [5, 1], [0, 6]]) circ(g, x, y, .9); }
        },
      }, p);
    },
  },

  golden: {
    hat: { dx: 0, dy: 0, k: 1 },
    draw: (c, p, baby) => {
      bird(c, {
        body: baby ? "#FFE27A" : "#FFD54A", shade: "#E0A800", wing: "#F0BC1C", beak: "#FF8A1F", beakLine: "#D96F00", feet: "#FF8A1F",
        over: (g, _pose, bob) => { g.fillStyle = "rgba(255,255,255,.75)"; circ(g, -3.5, -12 + bob, 1.2); ell(g, -4, -2, 2.6, 1.2, -.5); },
      }, p);
    },
  },
};

function drawHatOn(c: Ctx, id: string, hat: string) {
  const a = ART[id].hat;
  c.save(); c.translate(a.dx, a.dy - 8 * (1 - a.k)); c.scale(a.k, a.k); drawHat(c, hat); c.restore();
}

/** Draws a character at (x, y) with an optional hat. */
function drawCharacter(c: Ctx, id: string, x: number, y: number, hat: string | null, pose: Pose = "idle0", k = 1, baby = false) {
  const art = ART[id];
  c.save(); c.translate(x, y); c.scale(k, k);
  art.draw(c, pose, baby);
  if (hat && !baby && !(id === "turtle" && pose === "fail") && !(id === "hedgehog" && (pose === "hop" || pose === "fail"))) drawHatOn(c, id, hat);
  c.restore();
}

/** Draws a character into a small DOM canvas at 2× resolution. */
export function paintCharacterIcon(cv: HTMLCanvasElement, id: string, cx: number, cy: number, hat: string | null, k: number) {
  const g = cv.getContext("2d"); if (!g) return;
  g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, cv.width, cv.height); g.setTransform(2, 0, 0, 2, 0, 0);
  drawCharacter(g, id, cx, cy, hat, "idle0", k);
}

// Game content shown on the landing page. Mirrors the game's characters, hats, achievements and daily challenges.

export type Tier = "bronze" | "silver" | "gold";

/** [id, name, babies, unlocking achievement id] */
export const CHARS: [string, string, string, string | null][] = [
  ["duck", "Duck", "ducklings", null],
  ["hen", "Hen", "chicks", "first_steps"],
  ["goose", "Goose", "goslings", "honk_honk"],
  ["frog", "Frog", "froglets", "river_rat"],
  ["penguin", "Penguin", "penguin chicks", "snow_day"],
  ["raccoon", "Raccoon", "kits", "night_owl"],
  ["flamingo", "Flamingo", "pink chicks", "flock_together"],
  ["platypus", "Platypus", "puggles", "train_spotter"],
  ["hedgehog", "Hedgehog", "hoglets", "rush_hour"],
  ["turtle", "Turtle", "hatchlings", "regular"],
  ["robot", "Robot Duck", "mini bots", "daily_duck"],
  ["golden", "Golden Duck", "golden ducklings", "hall_of_fame"],
];

const HAT_CHARS = ["duck", "hen", "goose", "frog", "penguin", "raccoon", "flamingo", "platypus", "hedgehog", "turtle", "robot"];

/** [id, name, requirement] */
const HATS: [string, string, string][] = [
  ["party", "Party Hat", "Cross 25 lanes"],
  ["shades", "Sunglasses", "Hop chain of 10"],
  ["cowboy", "Cowboy Hat", "Rescue 3 ducklings in a run"],
  ["tophat", "Top Hat", "Reach Small Town (50)"],
  ["beanie", "Bobble Beanie", "Reach Snow Valley (150)"],
  ["chef", "Chef Hat", "Hop chain of 20"],
  ["crown", "Crown", "Score 300 in one run"],
  ["visor", "Sun Visor", "7-day daily challenge streak"],
  ["laurel", "Golden Laurel", "30-day daily challenge streak"],
  ["sombrero", "Sombrero", "Reach Desert Canyon (300)"],
  ["astronaut", "Space Helmet", "Reach Moon Base (400)"],
  ["flower", "Flower Crown", "Achievement: Mama Duck"],
  ["detective", "Detective Cap", "Achievement: Leaf Peeper"],
  ["pirate", "Pirate Hat", "Achievement: Lily Hopper"],
  ["hardhat", "Hard Hat", "Achievement: Marathon"],
  ["headphones", "Headphones", "Achievement: Speed Demon"],
  ["propeller", "Propeller Beanie", "Achievement: Close Shave"],
  ["viking", "Viking Helmet", "Achievement: High Roller"],
  ["halo", "Halo", "Achievement: Duckling Daycare"],
  ["sweatband", "Sweatband", "Achievement: Hot Streak"],
  ["conductor", "Conductor Cap", "Achievement: ??? (secret)"],
  ["grad", "Graduation Cap", "Achievement: Hall of Fame"],
];

/** [id, name, description, tier, reward?, secret?] */
const ACH: [string, string, string, Tier, string?, boolean?][] = [
  ["first_steps", "First Steps", "Cross 10 lanes in one run", "bronze", "Hen"],
  ["road_warrior", "Road Warrior", "Reach Small Town (lane 50)", "bronze"],
  ["leaf_peeper", "Leaf Peeper", "Reach Autumn Park (lane 100)", "silver", "Detective Cap"],
  ["snow_day", "Snow Day", "Reach Snow Valley (lane 150)", "silver", "Penguin"],
  ["night_owl", "Night Owl", "Reach Night City (lane 200)", "gold", "Raccoon"],
  ["marathon", "Marathon", "Cross 1,000 lanes in total", "silver", "Hard Hat"],
  ["honk_honk", "Honk Honk", "Hop chain of 15", "silver", "Goose"],
  ["speed_demon", "Speed Demon", "Hop chain of 30", "gold", "Headphones"],
  ["mama_duck", "Mama Duck", "Rescue 5 ducklings in one run", "bronze", "Flower Crown"],
  ["flock_together", "Flock Together", "Rescue 10 ducklings in one run", "gold", "Flamingo"],
  ["daycare", "Duckling Daycare", "Rescue 100 ducklings in total", "silver", "Halo"],
  ["bread_winner", "Bread Winner", "Eat 50 pieces of bread in total", "bronze"],
  ["river_rat", "River Rat", "Ride 100 logs in total", "silver", "Frog"],
  ["lily_hopper", "Lily Hopper", "Land on 50 lily pads in total", "bronze", "Pirate Hat"],
  ["train_spotter", "Train Spotter", "Cross 100 rail lanes in total", "silver", "Platypus"],
  ["rush_hour", "Rush Hour", "Cross 500 road lanes in total", "silver", "Hedgehog"],
  ["close_shave", "Close Shave", "Hop forward 5 times in one run with the fox one lane behind you", "silver", "Propeller Beanie"],
  ["century", "Century", "Score 100 in one run", "bronze"],
  ["high_roller", "High Roller", "Score 500 in one run", "gold", "Viking Helmet"],
  ["regular", "Regular", "Play 25 runs", "bronze", "Turtle"],
  ["daily_duck", "Daily Duck", "Play the daily crossing on 7 different days", "silver", "Robot Duck"],
  ["hot_streak", "Hot Streak", "Play on 5 days in a row", "silver", "Sweatband"],
  ["fashionista", "Fashionista", "Unlock 5 hats", "bronze"],
  ["fowl_play", "Fowl Play", "Get hit by a train 10 times", "bronze", "Conductor Cap", true],
  ["hall_of_fame", "Hall of Fame", "Earn 20 other achievements", "gold", "Golden Duck + Graduation Cap"],
  ["challenger", "Challenger", "Complete 10 daily challenges", "bronze"],
  ["on_a_roll", "On a Roll", "Finish all 3 daily challenges 3 days in a row", "bronze"],
  ["committed", "Committed", "Finish all 3 daily challenges 7 days in a row", "silver", "Sun Visor"],
  ["unstoppable", "Unstoppable", "Finish all 3 daily challenges 30 days in a row", "gold", "Golden Laurel"],
];

export const characters = CHARS.map(([id, name, babies, ach]) => ({
  id,
  name,
  req: ach ? ACH.find((a) => a[0] === ach)![1] + " · " + babies : "Starter · " + babies,
}));

export const hats = HATS.map(([id, name, req], i) => ({ id, name, req, char: HAT_CHARS[i % HAT_CHARS.length] }));

export const tiers = (
  [
    ["bronze", "🥉 Bronze"],
    ["silver", "🥈 Silver"],
    ["gold", "🥇 Gold"],
  ] as [Tier, string][]
).map(([t, label]) => {
  const items = ACH.filter((a) => a[3] === t).map(([, name, description, , reward, secret]) =>
    secret
      ? { name: "???", description: "Keep playing to find this one", reward: "" }
      : { name, description, reward: reward || "" },
  );
  return { label, count: items.length + " achievements", items };
});

/** Lane-strip swatches: [grass, road, line, grass2, water, log]. */
export const zones: { name: string; lanes: string; c: [string, string, string, string, string, string] }[] = [
  { name: "🌾 The Farm", lanes: "Lanes 0–49", c: ["#5DBB63", "#5A5F66", "#F4F1E6", "#55B05B", "#3FA9D6", "#8B5A2B"] },
  { name: "🏘️ Small Town", lanes: "Lanes 50–99", c: ["#6CC070", "#4A4F57", "#FFD23F", "#62B566", "#3A9FCB", "#7C4F25"] },
  { name: "🍂 Autumn Park", lanes: "Lanes 100–149", c: ["#C9A44A", "#555049", "#F4F1E6", "#BE9940", "#3C8FB5", "#6E4220"] },
  { name: "❄️ Snow Valley", lanes: "Lanes 150–199", c: ["#EEF4F8", "#5E656E", "#FFFFFF", "#E2ECF2", "#6FB6D9", "#D9EEF8"] },
  { name: "🌃 Night City", lanes: "Lanes 200–249", c: ["#2C4A3A", "#24272E", "#FFE27A", "#284434", "#1F4A6E", "#4E3420"] },
  { name: "🏖️ Sunny Beach", lanes: "Lanes 250–299", c: ["#F2DC9B", "#7A7F86", "#FFFFFF", "#EBD28C", "#2FC2D6", "#C9A27A"] },
  { name: "🏜️ Desert Canyon", lanes: "Lanes 300–349", c: ["#E3B577", "#6E5F55", "#FFE6B0", "#D9AA6A", "#4FB3BF", "#8B6A45"] },
  { name: "🌋 Volcano Isle", lanes: "Lanes 350–399", c: ["#4A3F3D", "#2E2A2A", "#FF8A3D", "#433836", "#E8571E", "#3A3433"] },
  { name: "🚀 Moon Base", lanes: "Lanes 400+", c: ["#B9BCC7", "#3A3F52", "#7CF5FF", "#AEB2BE", "#232A4D", "#8F96B3"] },
];

export const steps = [
  "Tap to hop forward one lane",
  "Wait for a gap, then hop",
  "Ride logs across rivers",
  "Flashing light? A train is coming",
  "Grab 🐣 ducklings and 🍞 bread on the way",
];

export const rules = ["No left, right or back", "⚡ Chains multiply", { label: "🦊 Fox behind you", hot: true }];

export const board = [
  { rank: 1, name: "Quackers", meta: "131 lanes · 🐣5", points: 248 },
  { rank: 2, name: "mallard_mike", meta: "118 lanes · 🐣4", points: 212 },
  { rank: 3, name: "Puddles", meta: "97 lanes · 🐣2", points: 171 },
  { rank: 4, name: "Drake", meta: "74 lanes · 🐣2", points: 126 },
  { rank: 5, name: "Waddle", meta: "52 lanes · 🐣1", points: 88 },
];

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CDEFS: [string, number[], (n: number) => string][] = [
  ["run_lanes", [20, 35, 55], (n) => "Cross " + n + " lanes in one run"],
  ["run_ducklings", [1, 2, 4], (n) => (n === 1 ? "Rescue a duckling" : "Rescue " + n + " ducklings in one run")],
  ["run_chain", [6, 10, 15], (n) => "Hop a chain of " + n],
  ["run_points", [40, 80, 140], (n) => "Score " + n + " in one run"],
  ["run_close", [1, 2, 4], (n) => (n === 1 ? "Hop away with the fox right behind you" : "Hop away " + n + " times in one run with the fox right behind you")],
  ["day_logs", [5, 12, 25], (n) => "Ride " + n + " logs today"],
  ["day_road", [15, 35, 70], (n) => "Cross " + n + " road lanes today"],
  ["day_rail", [2, 5, 10], (n) => "Cross " + n + " railroad tracks today"],
  ["day_bread", [1, 3, 6], (n) => (n === 1 ? "Eat a piece of bread" : "Eat " + n + " pieces of bread today")],
  ["day_ducklings", [2, 4, 8], (n) => "Rescue " + n + " ducklings today"],
  ["day_runs", [3, 6, 10], (n) => "Play " + n + " runs today"],
  ["day_pads", [2, 4, 8], (n) => "Land on " + n + " lily pads today"],
  ["day_daily", [1, 1, 2], (n) => (n === 1 ? "Play the daily crossing" : "Play the daily crossing " + n + " times")],
];

/** Today's three challenges, seeded by the local date (YYYY-MM-DD) exactly like the game. */
export function dailyChallenges(dateKey: string) {
  const seed = (Number(dateKey.replace(/-/g, "")) * 2654435761) >>> 0;
  const rng = mulberry32(seed ^ 0x5bd1e995);
  const order = CDEFS.map((d) => ({ d, k: rng() }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.d);
  const picked: { id: string; tier: number; text: string }[] = [];
  for (const [id, targets, text] of order) {
    const tier = picked.length;
    if (id === "day_daily" && tier === 2) continue;
    if (id === "day_pads" && tier === 0) continue;
    picked.push({ id, tier, text: text(targets[tier]) });
    if (picked.length === 3) break;
  }
  return picked;
}

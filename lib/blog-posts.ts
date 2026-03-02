export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  slug: string;
  featured?: boolean;
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "What to Do When Your Car Breaks Down on the Highway",
    excerpt: "A step-by-step guide to staying safe when your vehicle breaks down on busy roads. Learn the essential safety measures every driver should know.",
    date: "February 10, 2026",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800",
    slug: "what-to-do-car-breaks-down-highway",
    featured: true,
    keywords: ["car breakdown highway", "vehicle breakdown safety", "highway emergency BC"],
    content: `
Breaking down on a busy highway is stressful, but knowing what to do can keep you safe until a tow truck arrives. Here's a step-by-step guide for BC drivers.

## Step 1: Move Your Vehicle to Safety

As soon as you notice your car struggling, activate your hazard lights immediately. Steer gently toward the right shoulder or the nearest emergency bay. If you can't move under your own power, stay in your lane with hazards on until you come to a stop, then do not attempt to push the vehicle on a live lane.

## Step 2: Stay Inside or Get Clear

On a highway, the safest option depends on traffic conditions. If the shoulder is wide and clear, exit via the passenger-side door and stand well behind the guard rail. If traffic is heavy or the shoulder is narrow, stay buckled in your vehicle with hazards on — inside is often safer than standing beside a highway.

## Step 3: Set Up Warning Signals

If you carry emergency triangles or flares, place them 30–60 metres behind your vehicle to warn approaching drivers. Keep your hazard lights running until help arrives.

## Step 4: Call for Help

In BC, dial **#77** on your cell to reach RCMP and highway patrol, or call us directly at **(778) 859-1457** for immediate 24/7 towing and roadside assistance. Share your exact location, the highway number, and the nearest kilometre marker if visible.

## Step 5: Wait Safely

While waiting for a tow truck, stay alert and visible. If night-time, hold a flashlight or use your phone's torch. Avoid attempting repairs on a live highway shoulder.

---

**TowingNo.1 responds to highway breakdowns across the Lower Mainland, Delta, Langley, Surrey, Burnaby, and White Rock. Average response time: under 15 minutes.**
    `,
  },
  {
    id: 2,
    title: "How to Prepare Your Vehicle for Winter in BC",
    excerpt: "Winter driving in British Columbia requires preparation. Discover essential maintenance tips to keep your vehicle running smoothly during cold weather.",
    date: "February 5, 2026",
    image: "https://images.unsplash.com/photo-1511994714008-b6d68a8b32c2?q=80&w=800",
    slug: "prepare-vehicle-winter-bc",
    keywords: ["winter driving BC", "winter car maintenance", "winter tires BC", "prepare car winter"],
    content: `
British Columbia winters can be unpredictable — from icy roads in the Lower Mainland to heavy snowfall in the Fraser Valley. Preparing your vehicle before the cold sets in can prevent breakdowns and keep you safe.

## 1. Switch to Winter Tires

BC law requires winter tires (or chains) on many highways from October 1 to April 30. But even in Metro Vancouver, all-season tires lose grip below 7°C. Winter tires improve stopping distance by up to 40% on snow and ice. Look for the mountain/snowflake symbol.

## 2. Check Your Battery

Cold weather significantly reduces battery capacity. If your battery is more than three years old, have it tested before winter. A weak battery is the leading cause of cold-weather breakdowns — our drivers provide free battery tests during any roadside call.

## 3. Top Up Antifreeze

Make sure your coolant mixture is rated for temperatures well below freezing. The 50/50 mix of antifreeze and water provides protection down to −37°C, which more than covers BC conditions.

## 4. Test Lights and Wipers

With shorter days, working lights are essential for safety and staying legal. Replace worn wiper blades with winter-rated ones before the first frost. Keep your washer fluid reservoir filled with a freeze-resistant formula.

## 5. Keep a Winter Emergency Kit

A well-stocked kit should include: ice scraper and snow brush, jumper cables or a jump pack, warm blanket, traction sand or kitty litter, and a small shovel. If you get stuck, these supplies can be the difference between waiting 15 minutes or 2 hours.

---

**Need a battery boost or stuck in snow? Call TowingNo.1 at (778) 859-1457 — we're available 24/7 across the Lower Mainland.**
    `,
  },
  {
    id: 3,
    title: "5 Signs Your Car Battery is Dying",
    excerpt: "Don't get caught with a dead battery. Learn to recognize the warning signs that your car battery needs replacement before it fails.",
    date: "January 28, 2026",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=800",
    slug: "signs-car-battery-dying",
    keywords: ["car battery dying signs", "dead battery symptoms", "battery replacement BC"],
    content: `
A dead battery is one of the most common reasons drivers call for roadside assistance in BC. The good news: your battery usually gives warning signs before it completely fails.

## 1. Slow Engine Crank

When you turn the key and the engine cranks slowly ("rrrr... rrrr..." instead of the quick "vr-vroom"), your battery is struggling to deliver enough current. This is the most reliable early warning sign.

## 2. Dim Headlights and Interior Lights

A weak battery can't maintain proper voltage, causing lights to appear noticeably dimmer — especially when the engine is idling. If your headlights brighten when you rev the engine, the battery is failing to hold charge.

## 3. Warning Light on Dashboard

Most modern vehicles have a battery light (looks like a rectangle with + and − terminals). If it illuminates while driving, have your charging system tested immediately — it could also indicate a failing alternator.

## 4. Clicking Sound When Starting

A rapid clicking when you turn the ignition (without the engine cranking) typically means the battery doesn't have enough power to engage the starter motor. A single loud click usually points to a failed starter, but multiple fast clicks = battery.

## 5. Battery Age Over 4 Years

Car batteries typically last 3–5 years in the Lower Mainland climate. If yours is approaching or past that mark, have it tested proactively — especially before winter. A free battery test takes less than 5 minutes.

---

**Battery dead? TowingNo.1 offers 24/7 battery boost and jump-start service across Delta, Surrey, Langley, White Rock, and Burnaby. Call (778) 859-1457.**
    `,
  },
  {
    id: 4,
    title: "Emergency Kit Essentials Every Driver Needs",
    excerpt: "Be prepared for any roadside emergency with these must-have items. A well-stocked emergency kit can make all the difference.",
    date: "January 20, 2026",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800",
    slug: "emergency-kit-essentials",
    keywords: ["car emergency kit", "roadside emergency supplies", "car breakdown kit BC"],
    content: `
Whether you're driving through the Lower Mainland or heading up to Whistler, a roadside emergency kit could save your life or at least save you hours of waiting. Here's exactly what to keep in your vehicle.

## The Core Kit (Fit in a Sports Bag)

**Safety First:**
- Reflective warning triangles (×3) or LED road flares
- High-visibility vest (required by law if you exit your vehicle on a BC highway)
- Work gloves to protect your hands during any roadside task

**Jump-Start Gear:**
- Heavy-duty jumper cables (at least 4-metre length, 4-gauge wire) OR
- Compact lithium jump starter pack (can restart most vehicles without another car)

**Tire Emergency:**
- Tire pressure gauge
- Can of tire inflator/sealant for small punctures
- Spare tire, lug wrench, and automotive jack if your vehicle doesn't already have one

**Basic Repairs:**
- Duct tape, zip ties
- Fuses assortment (matches your vehicle's fuse box specs)
- Tow strap (2–3 tonne rated)

## Comfort and Survival Items
- Warm blanket or emergency mylar blanket
- Bottled water (at least 1L per person)
- Granola bars or non-perishable snacks
- Portable phone charger (power bank)
- Small first-aid kit

## Seasonal Additions

**Winter:** Ice scraper, kitty litter (traction), snow chains, hand warmers  
**Summer:** Extra water, sunscreen, small umbrella

---

**Even with the best kit, some situations require professional help. Save TowingNo.1 in your contacts: (778) 859-1457 — available 24/7 across the Lower Mainland.**
    `,
  },
  {
    id: 5,
    title: "When to Call for a Tow vs. Fix it Yourself",
    excerpt: "Some roadside issues can be handled yourself, while others require professional help. Learn when it's safe to DIY and when to call for assistance.",
    date: "January 12, 2026",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800",
    slug: "when-call-tow-vs-fix-yourself",
    keywords: ["when to call tow truck", "roadside DIY vs tow", "tow truck BC"],
    content: `
Not every breakdown needs a tow truck — but knowing the difference can save you money and keep you safe. Here's a practical guide for BC drivers.

## DIY is Fine For:

**Flat tire (with a working spare):** If you have a proper spare tire and a safe location to change it (flat surface, away from traffic), a tire change is a safe DIY task. If you're on a busy highway shoulder or don't have a spare, call for help.

**Dead battery (with jumper cables):** If a passing driver agrees to help and the connection points are accessible, a jump-start is straightforward. However, on newer vehicles with complex electronics, improper jump-starting can cause expensive damage — when in doubt, call a professional.

**Running out of fuel:** A short walk to a gas station is fine if it's safe and close. Otherwise, call for fuel delivery rather than leaving your vehicle unattended.

## Call TowingNo.1 For:

**Any mechanical failure beyond your skill level** — grinding noises, steam from the hood, unusual smells. These require diagnosis before driving further.

**Warning lights for oil, coolant, or transmission** — driving with these illuminated can cause thousands of dollars in engine damage.

**Vehicle stuck in mud, snow, or a ditch** — improper extraction attempts can worsen damage. Our winching crews use the right equipment.

**Accident damage** — even if the car appears driveable, internal damage may make it unsafe. A professional assessment before driving is essential.

**Any situation where you feel unsafe** — at night, in poor weather, or in an isolated location, waiting in your locked vehicle for a professional is always the right call.

---

**TowingNo.1 is available 24/7 at (778) 859-1457. We serve Delta, Surrey, Langley, Burnaby, White Rock, and all of Metro Vancouver.**
    `,
  },
  {
    id: 6,
    title: "Understanding Different Types of Towing Services",
    excerpt: "Not all towing is the same. Explore the different types of towing services available and when each one is appropriate for your situation.",
    date: "January 5, 2026",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800",
    slug: "understanding-towing-services",
    keywords: ["types of towing services", "flatbed tow truck", "emergency towing BC", "towing services explained"],
    content: `
When you call for a tow, the right type of service makes a difference for your vehicle's safety. Here's an overview of the main towing methods and when each is used.

## Flatbed Towing

The safest and most commonly recommended type for most passenger vehicles. Your car is loaded onto a flat platform and transported completely off the ground — no wheels touching the road. Ideal for:
- All-wheel-drive and four-wheel-drive vehicles
- Low-clearance sports cars
- Electric vehicles (which must not be towed with wheels down)
- Accident-damaged vehicles
- Luxury and collector cars

## Wheel-Lift Towing

A metal yoke cradles the drive wheels and lifts the front or rear of the vehicle off the ground while the other two wheels roll on the surface. It's fast to deploy and cost-effective for:
- Short-distance moves (e.g., from a parking lot to a nearby shop)
- Standard rear-wheel-drive and front-wheel-drive sedans when flatbed isn't available

## Hook-and-Chain (Legacy Method)

Rarely used for modern vehicles because chains can damage frames, bumpers, and drivetrains. Still occasionally used for salvage or total-loss vehicles where cosmetic damage is not a concern.

## Heavy-Duty Towing

Specialized rigs for commercial trucks, buses, RVs, and large SUVs that exceed the capacity of standard tow trucks. These require rotator trucks or large flatbeds rated for 10–50+ tonnes.

## Winching and Extraction

Not technically a tow — winching uses a cable and pulley system to drag a stuck vehicle onto solid ground before the tow begins. Essential for vehicles in ditches, mud, snow banks, or off-road.

---

**TowingNo.1 operates flatbed, wheel-lift, and heavy-duty trucks across the Lower Mainland. Call (778) 859-1457 for fast, professional service any time of day.**
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

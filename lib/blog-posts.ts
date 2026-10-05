export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  /** Original publish date (human string, e.g. "February 10, 2026"). */
  date: string;
  /**
   * Optional last-updated date. Set this ONLY when the post's content was
   * meaningfully revised — it drives `dateModified` in schema and the visible
   * "Updated" label. Leaving it unset keeps dateModified === datePublished
   * (an honest "not updated since publication"). Never set a future date.
   */
  updatedDate?: string;
  image: string;
  slug: string;
  featured?: boolean;
  keywords: string[];
  /** Content-cluster label shown as a badge (Road Safety, Seasonal, Maintenance, Towing Advice). */
  category?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "Road Safety",
    title: "Car Breakdown on the Highway: What to Do",
    excerpt: "A step-by-step guide to staying safe when your vehicle breaks down on busy roads. Learn the essential safety measures every driver should know.",
    date: "February 10, 2026",
    image: "/blog/car-breaks-down-highway.jpg",
    slug: "what-to-do-car-breaks-down-highway",
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

In BC, dial **#77** on your cell to reach RCMP and highway patrol, or call us directly at **(778) 838-0014** for immediate 24/7 towing and roadside assistance. Share your exact location, the highway number, and the nearest kilometre marker if visible.

## Step 5: Wait Safely

While waiting for a tow truck, stay alert and visible. If night-time, hold a flashlight or use your phone's torch. Avoid attempting repairs on a live highway shoulder.

## Why Highways Are So Dangerous After a Breakdown

Most drivers underestimate how quickly a stationary car becomes a hazard on a route like Highway 1, the Coquihalla, or Highway 99. Traffic approaching at 100 km/h or more covers the length of a football field in just a few seconds, leaving a tired or distracted driver almost no time to react to a vehicle stopped on the shoulder. That is exactly why provincial guidance urges you to get as far right as possible and, where one exists, to use a designated pull-out or emergency bay rather than stopping in a live lane.

## Common Causes of Highway Breakdowns in BC

Knowing what tends to go wrong helps you respond calmly. Overheating is common on long summer climbs like the Coquihalla, where a struggling cooling system finally gives up under load. Flat tires and blowouts often follow potholes or road debris on busy commuter corridors. Dead batteries and alternator faults can strike with little warning, and running low on fuel between distant Interior stations happens more often than drivers like to admit. None of these is worth risking your safety to diagnose beside fast-moving traffic.

## Protecting Yourself While You Wait

If you must remain near the vehicle, position yourself well away from the traffic side — ideally up an embankment or behind a barrier. Keep children and pets with you rather than letting them wander, and never stand directly behind the car where you are most exposed. Note nearby landmarks, exit numbers, or kilometre markers so you can describe your location precisely when you call for help. That one detail often shaves several minutes off the response time and gets a tow truck to you faster.

---

**TowingNo.1 responds to highway breakdowns across the Lower Mainland, Delta, Langley, Surrey, Burnaby, and White Rock. Call (778) 838-0014 for 24/7 towing and roadside assistance.**
    `,
  },
  {
    id: 2,
    category: "Seasonal",
    title: "How to Prepare Your Vehicle for Winter in BC",
    excerpt: "Winter driving in British Columbia requires preparation. Discover essential maintenance tips to keep your vehicle running smoothly during cold weather.",
    date: "February 5, 2026",
    image: "/blog/prepare-vehicle-winter-bc.jpg",
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

## 6. Check Your Tire Pressure Regularly

Cold air is denser, so tire pressure drops roughly one psi for every six-degree fall in temperature. Underinflated tires wear unevenly, hurt fuel economy, and handle poorly on slick roads. Check pressures with a gauge on a cold morning at least once a month through the winter, and don't forget the spare — a flat spare is no help on a freezing night.

## Plan Ahead for Mountain and Highway Travel

If your winter plans include the Coquihalla, the Sea-to-Sky to Whistler, or the drive to the Interior, treat those routes with extra respect. Carry chains even if your winter tires are excellent, check DriveBC for closures and avalanche control before you leave, and keep your fuel tank at least half full so a long delay in cold weather doesn't leave you stranded without heat. Tell someone your route and expected arrival time before heading into areas with patchy cell coverage.

## Don't Ignore the Small Stuff

A frozen door lock, a sticky parking brake, or a washer system spraying plain water can each turn a routine morning into a frustrating one. Use a winter-rated washer fluid, keep a small de-icer in your bag rather than locked inside the car, and give the cabin and glass a few minutes to warm before you drive. Clearing every window fully — not just a porthole in the frost — is both safer and required under BC's rules of the road.

---

**Need a battery boost or stuck in snow? Call TowingNo.1 at (778) 838-0014 — we're available 24/7 across the Lower Mainland.**
    `,
  },
  {
    id: 3,
    category: "Maintenance",
    title: "5 Signs Your Car Battery is Dying",
    excerpt: "Don't get caught with a dead battery. Learn to recognize the warning signs that your car battery needs replacement before it fails.",
    date: "January 28, 2026",
    image: "/blog/car-battery-dying.jpg",
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

## What Shortens Battery Life in the Lower Mainland

Our mild but damp climate is harder on batteries than many drivers expect. Short trips around Surrey, Burnaby, or Vancouver rarely give the alternator enough time to fully recharge the battery, so it slowly drains over weeks of stop-start commuting. Heavy use of heated seats, defrosters, and headlights through the dark winter months adds to the load, and a vehicle left parked at the airport or a ferry terminal for a week can quietly lose enough charge to refuse to start.

## How to Make a Battery Last Longer

A few simple habits genuinely extend battery life. Take your car for a longer drive at least once a week to top up the charge, switch off accessories before shutting the engine down, and keep the terminals clean and free of the powdery white corrosion that interferes with the connection. If you store a vehicle over the winter, a smart trickle charger keeps the battery healthy without overcharging it.

## When a Boost Isn't Enough

A jump-start will usually get you moving again, but it treats the symptom rather than the cause. If your battery is more than four years old, repeatedly goes flat, or fails a load test, replacement is the only reliable fix. Charging-system faults are a separate issue: if the alternator isn't keeping up, even a brand-new battery will soon die, which is why a proper test of both the battery and the charging output matters before you spend money on parts.

---

**Battery dead? TowingNo.1 offers 24/7 battery boost and jump-start service across Delta, Surrey, Langley, White Rock, and Burnaby. Call (778) 838-0014.**
    `,
  },
  {
    id: 4,
    category: "Road Safety",
    title: "Emergency Kit Essentials Every Driver Needs",
    excerpt: "Be prepared for any roadside emergency with these must-have items. A well-stocked emergency kit can make all the difference.",
    date: "January 20, 2026",
    image: "/blog/emergency-kit-essentials.jpg",
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

## How to Organize Your Kit

A kit you can't reach in a hurry isn't much use. Keep the safety items — vest, triangles, flashlight — near the top of the bag or in a door pocket so you can grab them before you even step out of the vehicle. Heavier recovery gear and tools can live lower down or in the trunk. Check the bag twice a year, replace any dead batteries, and rotate the water and snacks so nothing is expired the day you finally need it.

## Tailor the Kit to Your Driving

A commuter who rarely leaves Metro Vancouver needs less than someone regularly driving the Coquihalla or heading into the backcountry. If your routes take you well beyond reliable cell coverage, add a paper map, extra warm layers, and more food and water than you think you'll need. Families should pack for the youngest passenger, including any medication, and pet owners should keep water and a spare leash on hand.

## What Not to Rely On

Phones die, and a low battery drains even faster in freezing weather, so a power bank is not optional. Tire sealant only handles small tread punctures — not blowouts or sidewall damage — and a tiny scissor jack is no substitute for a stable surface and patience. The kit buys you time and safety, but it doesn't replace professional help when a breakdown is beyond a quick roadside fix.

---

**Even with the best kit, some situations require professional help. Save TowingNo.1 in your contacts: (778) 838-0014 — available 24/7 across the Lower Mainland.**
    `,
  },
  {
    id: 5,
    category: "Towing Advice",
    title: "When to Call for a Tow vs. Fix it Yourself",
    excerpt: "Some roadside issues can be handled yourself, while others require professional help. Learn when it's safe to DIY and when to call for assistance.",
    date: "January 12, 2026",
    image: "/blog/when-to-call-tow.jpg",
    slug: "when-call-tow-vs-fix-yourself",
    keywords: ["when to call tow truck", "roadside DIY vs tow", "tow truck BC", "towing services BC"],
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

## Weigh the Risk, Not Just the Cost

It's tempting to save money by handling a problem yourself, but the real question is what a mistake could cost. Driving a few kilometres on a flat ruins the tire and can damage the wheel and brakes; ignoring a temperature warning can warp a cylinder head; a botched jump-start can fry sensitive electronics. In each case the DIY "saving" is dwarfed by the repair bill. When the downside is expensive or dangerous, calling a professional is usually the cheaper choice in the long run.

## Conditions That Change the Answer

The same problem can call for very different responses depending on where and when it happens. Changing a tire in a quiet, level driveway on a clear afternoon is reasonable; doing it on the shoulder of Highway 1 in the rain at night is not. Weather, traffic, lighting, and your own confidence all matter. If any part of the situation feels unsafe, treat that feeling as useful information and make the call rather than pressing on.

## A Simple Rule of Thumb

If the fix is quick, you have the right tools, and you are somewhere safe, a careful DIY repair is fine. If it involves the engine, the drivetrain, the brakes, or any warning light you don't fully understand — or if you are stranded somewhere exposed — let a trained technician take over. Getting it wrong at the roadside rarely ends well, and a short wait beats a long tow to a body shop.

---

**TowingNo.1 is available 24/7 at (778) 838-0014. We serve Delta, Surrey, Langley, Burnaby, White Rock, and all of Metro Vancouver.**
    `,
  },
  {
    id: 6,
    category: "Towing Advice",
    title: "Types of Towing Services Explained",
    excerpt: "Not all towing is the same. Explore the different types of towing services available and when each one is appropriate for your situation.",
    date: "January 5, 2026",
    image: "/blog/types-of-towing.jpg",
    slug: "understanding-towing-services",
    keywords: ["types of towing services", "flatbed tow truck", "emergency towing BC", "towing services explained", "towing services BC"],
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

## How the Right Method Protects Your Vehicle

Choosing the correct tow is about more than convenience — it prevents avoidable damage. All-wheel-drive and four-wheel-drive vehicles can suffer expensive drivetrain harm if towed with wheels turning, which is why a flatbed is the safe default. Electric vehicles add another layer: their motors can generate current when the wheels spin, so manufacturers insist on full flatbed transport. Telling the dispatcher your exact make, drive type, and whether the car still rolls lets us send the right truck the first time.

## What to Expect When the Truck Arrives

A professional operator will confirm the destination, give you a clear price before loading, and check that the vehicle is secured at rated points rather than fragile body panels. Loading takes only a few minutes once the right equipment shows up, and you can usually ride along to the shop or your home. Knowing this in advance makes a stressful moment feel routine rather than overwhelming.

## Questions Worth Asking First

Before you agree to a tow, it is fair to ask whether the company is licensed and insured, how the price is calculated, and whether the chosen method suits your specific vehicle. A reputable operator answers plainly and never pressures you. If a quote sounds vague, or a driver wants to hook your all-wheel-drive car up by the wheels, treat that as a good reason to call someone else.

---

**TowingNo.1 operates flatbed, wheel-lift, and heavy-duty trucks across the Lower Mainland. Call (778) 838-0014 for fast, professional service any time of day.**
    `,
  },
  {
    id: 7,
    category: "Road Safety",
    title: "What to Do After a Car Accident in BC",
    excerpt: "A step-by-step guide for BC drivers covering the immediate actions at the scene, ICBC reporting, when to call police, and how to arrange a safe tow after a collision.",
    date: "October 1, 2026",
    image: "/blog/car-accident-bc.jpg",
    slug: "what-to-do-after-car-accident-bc",
    keywords: ["car accident bc", "what to do after accident bc", "icbc claims", "accident towing surrey", "car accident lower mainland"],
    content: `
A collision is disorienting even when nobody is seriously hurt. Knowing the sequence of actions in advance means you can work through it calmly rather than improvising at the roadside.

## Step 1: Check for Injuries and Move to Safety

Before anything else, check whether anyone in your vehicle — or the other vehicle — is injured. If anyone is hurt, unconscious, or trapped, call **911 immediately**. Do not attempt to move an injured person unless they are in immediate danger from fire or traffic.

If the vehicles are driveable and the collision is minor, BC law requires you to move them out of traffic before exchanging information. Turn on your hazard lights and pull to the shoulder or a nearby parking lot. Leaving vehicles in a live lane creates a secondary hazard.

## Step 2: Call 911 — or Not

You must call 911 if:
- Anyone is injured or unconscious
- A driver appears impaired
- A driver leaves the scene (hit-and-run)
- A commercial vehicle, bus, or dangerous-goods vehicle is involved
- The road is blocked and vehicles cannot be moved

For property-damage collisions where everyone is uninjured and cooperative, you do not need to call police. Report directly to ICBC instead.

## Step 3: Exchange Information at the Scene

BC law requires both drivers to exchange:
- Full name and address
- Driver's licence number
- Vehicle plate number
- Vehicle registration information
- Insurance details (your ICBC policy number is on your insurance card)

Do not leave the scene without exchanging this information. Do not admit fault — that determination belongs to ICBC, not to either driver at the roadside.

## Step 4: Document Everything

Before the vehicles move, photograph:
- All vehicles involved, showing the damage and their positions on the road
- Both licence plates
- The road conditions, traffic signs, and any skid marks
- Any visible injuries (with consent where applicable)
- The nearest kilometre marker, street sign, or landmark for your location record
- Any witnesses who stop

Even a quick set of photos on your phone takes under two minutes and gives ICBC the visual record they need.

## Step 5: Report to ICBC Within 24 Hours

Since May 1, 2021, BC operates under Enhanced Care — a no-fault insurance system. You report your claim to ICBC regardless of who caused the collision, and ICBC covers injury benefits and vehicle repair based on the facts of the incident.

**ICBC claims:** 604-520-8222 (Metro Vancouver) or 1-800-910-4222 (toll-free)

You can also start a claim online at icbc.com. Have your policy number, the other driver's information, and your photos ready before you call.

## Step 6: Decide Whether the Vehicle Needs a Tow

If your vehicle is not driveable, call a tow truck before the scene clears. A few things to know:

- **Ask for a quote before authorising the tow.** A reputable towing company provides an upfront price.
- **Choose your destination.** You have the right to specify which repair shop or storage facility the vehicle goes to. A tow operator cannot compel you to use a specific shop.
- **Accident damage and ICBC.** ICBC's Enhanced Care policy covers some towing costs for accident-related tows. Keep your receipt and submit it with your claim.
- **Never drive a vehicle that feels unsafe.** Pulling noises, steering changes, or visible structural damage mean the vehicle needs a professional assessment before going back on the road.

## What Not to Do

- Do not post about the accident on social media before your ICBC claim is resolved.
- Do not sign any documents from a tow company or repair shop under pressure at the roadside.
- Do not leave the scene before exchanging information, even for a minor impact — it becomes a hit-and-run.
- Do not assume your vehicle is fine because the exterior damage looks minor. Bumper structures, airbag sensors, and fuel systems can be affected by impacts that leave small visible marks.

## After the Scene

Follow up with your body shop or ICBC repair facility within a day or two. Keep copies of all paperwork, receipts, and correspondence. If your vehicle is a total loss, ICBC will assess its actual cash value based on comparable vehicles in the BC market.

---

**Need an accident tow in Surrey or the Lower Mainland? TowingNo.1 dispatches 24/7. Call (778) 838-0014 for an upfront quote before we move your vehicle.**
    `,
  },
  {
    id: 8,
    category: "Seasonal",
    title: "BC Winter Roadside Safety Checklist",
    excerpt: "A practical pre-season checklist for Lower Mainland and BC drivers — vehicle preparation, emergency kit, highway-specific advice, and what to do if you get stranded in winter conditions.",
    date: "September 24, 2026",
    image: "/blog/winter-safety-checklist.jpg",
    slug: "bc-winter-roadside-safety-checklist",
    featured: true,
    keywords: ["bc winter driving checklist", "winter roadside safety bc", "winter car kit bc", "winter tires bc", "lower mainland winter driving"],
    content: `
BC winters vary from icy highway corridors on the Coquihalla to wet but mild commutes through Surrey and Burnaby — but the Lower Mainland gets its share of freezing rain, overnight ice, and the occasional heavy snowfall that catches drivers off guard. This checklist covers what to do before the cold arrives and what to carry if things go wrong on the road.

## Vehicle Preparation — Do This Before October

**Tires**
- [ ] Switch to winter tires (marked with the mountain/snowflake symbol or M+S) by October 1 — required on many provincial routes from October 1 to April 30
- [ ] Check tread depth on winter tires (minimum 3.5 mm for legal use; replace under 4 mm for real-world winter performance)
- [ ] Check all four tire pressures — cold air drops pressure roughly 1 psi per 6°C temperature drop

**Battery**
- [ ] Have your battery tested if it is 3 years or older — cold weather reduces battery capacity significantly, and a battery that passes a summer test can fail on a January morning
- [ ] Inspect battery terminals for white corrosion and clean if present

**Fluids and Belts**
- [ ] Confirm engine coolant mixture is rated for well below freezing (a 50/50 antifreeze-to-water mix protects to approximately -37°C)
- [ ] Top up windshield washer fluid with a formula rated for at least -40°C
- [ ] Check engine oil — if due for a change, do it before the cold season

**Visibility**
- [ ] Replace windshield wipers with winter-rated blades
- [ ] Test all exterior lights — headlights, brake lights, reverse lights
- [ ] Keep a small bottle of de-icer in your bag (not locked in the car where you can't reach it on a frozen morning)

**Brakes**
- [ ] If you hear squealing or feel pulsing when braking, have the brakes inspected before winter — stopping distances increase on wet or icy roads even with good brakes

## Emergency Kit — Keep This in the Vehicle All Winter

**Safety and Signalling**
- [ ] High-visibility vest (required by law if you exit your vehicle on a BC highway)
- [ ] LED road flares or reflective triangles (×3)
- [ ] Flashlight and spare batteries

**Traction and Recovery**
- [ ] Ice scraper with a long handle
- [ ] Snow brush
- [ ] Small folding shovel
- [ ] Traction aid: bag of kitty litter, sand, or traction boards

**Jump-Starting**
- [ ] Heavy-duty jumper cables (4-gauge, 4-metre minimum) OR a lithium jump starter pack
- [ ] Note: some modern vehicles with complex electronics require a professional boost — when in doubt, call a roadside service

**Warmth and Survival**
- [ ] Emergency blanket or wool blanket
- [ ] Extra warm clothing: hat, gloves, waterproof boots in the trunk
- [ ] Non-perishable snacks and at least one litre of water per person
- [ ] Portable phone charger / power bank

**Navigation**
- [ ] DriveBC saved in your phone bookmarks: **drivebc.ca** or call **511**
- [ ] BC highway patrol number saved: **#77** from any BC cell

## Highway-Specific Advice

**Coquihalla (Highway 5):** Chains are required frequently in winter even with winter tires. Check DriveBC before departure. Keep your fuel tank above half — service areas are spread out and closures happen.

**Sea-to-Sky (Highway 99 to Whistler):** Watch for icy sections above Squamish, especially overnight and in shaded areas. The highway closes occasionally after heavy snowfall or rockfall.

**Highway 1 through Langley to Abbotsford:** Morning black ice after overnight freeze is common on the lower sections through the Fraser Valley. Drive for conditions even when the road looks clear.

**Lower Mainland commuting:** Even metro-area roads freeze overnight in January and February. The bridges over the Fraser River (Port Mann, Alex Fraser, Pattullo, Golden Ears) can ice faster than the roads leading to them because cold air circulates underneath.

## If You Get Stranded in Winter

1. **Stay in the vehicle** unless you are in immediate danger — your car is visible, sheltered, and a heat source
2. **Turn on hazard lights** so other drivers see you
3. **Run the engine in short intervals** (10 minutes every hour) to stay warm — first check that the exhaust pipe is not blocked by snow, which can allow carbon monoxide to enter the cabin
4. **Keep a window cracked slightly** when running the engine to maintain fresh air circulation
5. **Signal for help:** a bright cloth tied to the antenna or door handle, or your phone's torch facing traffic
6. **Call for help:** TowingNo.1 at **(778) 838-0014** dispatches 24/7, or BCAA if you are a member

## Before Any Mountain Route

- Check DriveBC (drivebc.ca or 511) for chain requirements and closures
- Tell someone your route and expected arrival time
- Carry more food, water, and warm clothing than you think you will need
- Keep the fuel tank above half

---

**Stranded in BC winter conditions? TowingNo.1 dispatches 24/7 across the Lower Mainland — Surrey, Langley, Burnaby, Richmond, White Rock, and beyond. Call (778) 838-0014.**
    `,
  },
  {
    id: 9,
    category: "Towing Advice",
    title: "EV and Hybrid Vehicle Towing: What BC Drivers Need to Know",
    excerpt: "Electric and hybrid vehicles cannot be towed the same way as conventional cars. Learn why flatbed transport is required, how Transport Mode works on major EV brands, and what to do when your EV runs out of charge in BC.",
    date: "September 17, 2026",
    image: "/blog/electric-vehicle-towing.jpg",
    slug: "electric-vehicle-towing-bc",
    keywords: ["ev towing bc", "electric vehicle towing", "tesla towing bc", "hybrid towing lower mainland", "ev breakdown bc"],
    content: `
Electric vehicle ownership in the Lower Mainland has grown faster than almost anywhere else in Canada, and with it has come a category of towing calls that catches both drivers and unprepared tow operators off guard. If you drive an EV or a plug-in hybrid, the rules for towing your vehicle are fundamentally different from those for a conventional car — and getting it wrong can cause serious drivetrain damage.

## Why EVs Cannot Be Towed with Wheels Turning

When an electric motor's wheels spin, the motor acts as a generator, producing current. In a conventional tow with the drive wheels on the ground (wheel-lift tow, or tow dolly on the wrong axle), this current flows back into the battery and the motor control systems continuously during the journey. Depending on the vehicle and tow distance, this can overheat the motor controller, damage the battery management system, or in some cases cause a thermal event.

Every major EV manufacturer specifies flatbed transport for their vehicles. This is not a preference — it is a hard engineering requirement. A tow operator who tells you wheel-lift is fine for an EV either does not know EVs or is cutting corners with your vehicle.

The same consideration applies to **all-wheel-drive and four-wheel-drive EVs**, which have drive motors on both axles. Even if only the rear wheels are on the ground during a wheel-lift tow, the front motors can still spin and generate current from road vibration.

## Transport Mode — Why It Matters

Most modern EVs have a software mode that disconnects the drive motors from the wheels to prevent generation during transport. This must be activated before the vehicle is loaded. When it is not activated, even a flatbed can cause problems if the wheels roll during loading.

**Tesla (Model 3, Model Y, Model S, Model X):**
Go to Controls > Service > Towing on the touchscreen to enable Transport Mode. The vehicle can then be winched or rolled onto the flatbed safely. Consult your Tesla app or manual for your specific model year — the menu path varies slightly.

**Ford F-150 Lightning and Mach-E:**
Put the vehicle in Park and use the Settings menu to locate the towing or service mode option. The Lightning in particular must be on a flatbed — it is AWD and neither axle should roll under power.

**Chevrolet Bolt / GMC Hummer EV:**
Use flatbed transport. Check the owner's manual for any specific transport mode — the Bolt's procedure differs from the Hummer EV.

**Hyundai Ioniq 5 and 6, Kia EV6:**
Flatbed required. Both models have a specific towing procedure described in their manuals — notify the tow operator that it is an EV before they begin setup so they send the right truck.

**Rivian R1T and R1S:**
Navigate to Vehicle > Service > Tow Mode before loading. Rivian specifically warns against towing with wheels contacting the ground.

**General rule:** When you call for a tow, tell the dispatcher it is an electric or plug-in hybrid vehicle and state the make and model. This ensures a flatbed is dispatched and the driver arrives prepared.

## What Happens When an EV Runs Out of Charge

Unlike a gas vehicle where a fuel delivery gets you moving in minutes, an EV that runs to zero cannot be topped up at the roadside with a portable charger — the current available from a portable unit is too low to provide meaningful range in a short time. The practical solution is a flatbed transport to the nearest DC fast charger or your home/destination charger.

In the Lower Mainland, DC fast chargers are available at many major retail centres, transit park-and-rides, and along the major highway corridors. Tesla Supercharger stations are concentrated in shopping areas in Surrey, Langley, Burnaby, and Vancouver. Other brands use the CCS or CHAdeMO standards available at ChargePoint, FLO, and BC Hydro EV fast charger stations.

If you are stranded on a BC highway without charge, call us at **(778) 838-0014** and let us know it is an EV and where you need to be taken. We will send a flatbed and transport you safely to the nearest appropriate charger.

## Hybrid Vehicles — A Note

Standard (non-plug-in) hybrids like the Toyota Prius or Honda Insight can generally be towed on a flatbed without special transport mode activation, because the hybrid battery recharges from the engine rather than regenerative load. However, AWD hybrids — such as the RAV4 Hybrid or any hybrid with a rear electric motor — still require flatbed transport for the same reasons as full EVs.

When in doubt, treat any hybrid with an electric drive motor on either axle as requiring a flatbed and follow the manufacturer's towing specification in the owner's manual.

## For Towing Companies and Drivers

If you are a tow operator, the key points are:
- Always ask whether the disabled vehicle is an EV or hybrid before dispatch
- Send a flatbed to all EV calls
- Ask the owner or driver to activate Transport Mode before loading when possible
- Never use a wheel-lift on an EV — not even for a short distance or a simple repositioning

---

**TowingNo.1 dispatches flatbed trucks for EVs across Surrey, Langley, Burnaby, Richmond, White Rock, and the wider Lower Mainland. When you call, tell us it's an EV and we will send the right truck. (778) 838-0014, available 24/7.**
    `,
  },
  {
    id: 10,
    category: "Road Safety",
    title: "Highway 1 and Highway 99 Breakdown Guide for Lower Mainland Drivers",
    excerpt: "What to do when your vehicle breaks down on BC's two busiest highway corridors — safe pull-off procedures, how to report your location, RCMP and roadside contacts, and what to expect from a highway tow.",
    date: "September 10, 2026",
    image: "/blog/highway-breakdown-bc.jpg",
    slug: "highway-breakdown-guide-bc",
    keywords: ["highway breakdown bc", "highway 1 breakdown", "highway 99 breakdown", "bc highway towing", "lower mainland highway safety"],
    content: `
Highway 1 and Highway 99 carry the highest traffic volumes in British Columbia and are where breakdowns are the most dangerous. A stalled vehicle on a live highway shoulder, especially in low light or poor weather, can become a secondary collision risk within seconds. This guide walks through the correct actions, the right contacts, and how to communicate your location accurately so a tow reaches you as fast as possible.

## Highway 1 — Trans-Canada Through the Lower Mainland

Highway 1 runs east-west through Burnaby, Surrey, Langley, Abbotsford, and beyond into the Fraser Canyon. The most congested and highest-risk breakdown sections in the Lower Mainland are:

**Burnaby — SFU and Willingdon interchange area:** The uphill grade toward the SFU exit and through the Grandview Cut is hard on cooling systems in summer and on batteries in winter. Tight shoulders in this corridor mean a stalled vehicle is very exposed.

**Surrey — 160th Street to 200th Street (Langley boundary):** Heavy westbound morning commuter traffic and eastbound afternoon traffic. Some shoulder space, but the speed limit is 100 km/h through this section.

**Langley — 200th Street and 232nd Street interchanges:** Common stall points where vehicles merging or braking from highway speed in stop-and-go conditions overheat.

## Highway 99 — From the Border to Vancouver

Highway 99 runs from the Peace Arch / Pacific Highway border crossings in South Surrey north through Richmond and into Vancouver via the Oak Street / Granville bridges.

**South Surrey / White Rock (176th Street to 8th Avenue):** The corridor narrows near the border approaches and shoulders are inconsistent. Border-crossing traffic backs up significantly on weekends and holidays.

**Richmond — Massey Tunnel area (Highway 99 at Steveston Highway to Oak Street):** Historically one of the most congested single points on BC's highway network. A breakdown near the tunnel approach blocks multiple lanes quickly and requires fast response.

**Richmond to Vancouver (Oak Street Bridge approaches):** No real shoulder on the bridges themselves. A stalled vehicle here is a full lane closure and requires police coordination.

## How to Report Your Location on a BC Highway

The most important thing you can tell a tow dispatcher or RCMP is a **kilometre marker number**. Blue and white signs on BC provincial highways are posted every kilometre and show the route number and the distance in kilometres from a reference point. When you call, say: "I am on Highway 1 eastbound, kilometre marker 58" — this gets a truck to you in far less time than an address.

If you cannot see a marker, use the nearest interchange number, a visible overpass or bridge, or describe your direction and the last exit you passed.

## Key Contacts — Save These Before You Drive

| Contact | How to reach |
|---|---|
| BC RCMP / highway patrol | **#77** from any BC cell phone |
| Emergency (injuries, criminal behaviour) | **911** |
| TowingNo.1 — 24/7 Lower Mainland towing | **(778) 838-0014** |
| ICBC claims | 604-520-8222 |
| DriveBC road conditions | **511** or drivebc.ca |

**#77 from your cell** connects you to BC RCMP dispatch for highway incidents — road debris, stalled vehicles blocking lanes, collisions. They will coordinate traffic control and, if needed, request a tow through CVSE-licensed operators.

## Safe Breakdown Procedure on a BC Highway

1. **Activate hazard lights immediately** — before you have fully stopped
2. **Steer to the right shoulder** and get as far from the live lane as possible. If there is a formal pullout or emergency bay nearby, aim for it
3. **Do not stop on a bridge, overpass, or in a tunnel** — exit the structure first if at all possible
4. **Stay in the vehicle with your seatbelt on** if the shoulder is narrow or traffic is fast. Being inside the vehicle is often safer than standing beside it
5. **Exit from the passenger side** if you must leave the vehicle, so you step away from traffic
6. **Put on your high-visibility vest** before exiting — BC law requires this if you exit your vehicle on a highway
7. **Place warning triangles** 30–60 metres behind your vehicle if you carry them and it is safe to deploy them

## BC's Move Over Law

BC drivers are legally required to slow down and move over one lane — or as far right as safely possible — when passing a stopped emergency vehicle, tow truck, or CVSE vehicle with flashing lights. Violating this law carries a fine and penalty points. When a tow truck is working beside your vehicle, the same protection applies to the tow operator.

## What to Expect From a Highway Tow

A tow operator on a live highway shoulder will:
- Position their truck to shield your vehicle from passing traffic
- Work as quickly as safety allows — they are exposed to highway traffic during the whole operation
- Load your vehicle onto a flatbed (most highway tows use flatbeds for stability and speed)
- Confirm a destination with you before leaving the scene

You will be given an upfront quote before the tow begins. If you are unsure where to take the vehicle, we can deliver it to any repair shop, dealership, or address you specify, or to a safe storage location while you arrange repairs.

## Coquihalla and Sea-to-Sky Appendix

These two major mountain routes deserve special mention:

**Coquihalla (Highway 5):** Chain-up areas before the summit. Cell coverage is patchy. Pull off at a designated chain-up bay or highway pullout — the shoulders narrow significantly at higher elevations. The Coquihalla Summit rest area (km 114.6) and the Zopkios brake check are reference points tow operators and highway patrol use regularly.

**Sea-to-Sky (Highway 99 — Horseshoe Bay to Whistler):** A two-lane mountain highway with minimal shoulder in many sections. Breakdowns between Squamish and Whistler often require a tow back down to a facility in Squamish rather than forward — check that your tow operator can reach the location before you commit.

---

**TowingNo.1 responds to highway breakdowns on Highway 1 and Highway 99 across the Lower Mainland. Call (778) 838-0014 — 24/7, upfront quote before we dispatch.**
    `,
  },
  {
    id: 11,
    category: "Road Safety",
    title: "Surrey Emergency Towing and Roadside Resource Guide",
    excerpt: "A practical reference for Surrey drivers — key road corridors, local emergency contacts, ICBC reporting, and what to do in every common roadside situation across the city.",
    date: "September 3, 2026",
    image: "/blog/surrey-emergency-guide.jpg",
    slug: "surrey-emergency-towing-roadside-guide",
    keywords: ["surrey emergency towing", "surrey roadside assistance", "surrey breakdown guide", "emergency contacts surrey bc", "towing surrey bc"],
    content: `
Surrey is the most densely networked city we serve — six distinct communities, two major highway corridors, dozens of arterials, and a mix of high-rise parkades, suburban streets, and semi-rural roads near Cloverdale and South Surrey. This guide brings together the contacts, road-specific advice, and step-by-step actions that Surrey drivers are most likely to need.

## Emergency Contacts for Surrey Drivers

Save these in your phone before you need them:

| Situation | Contact |
|---|---|
| Injuries, fire, or immediate danger | **911** |
| Highway breakdown — RCMP / highway patrol | **#77** (any BC cell) |
| Surrey RCMP non-emergency | 604-599-0502 |
| ICBC claims (accident or towing) | 604-520-8222 |
| TowingNo.1 — 24/7 towing and roadside | **(778) 838-0014** |
| DriveBC road conditions | **511** or drivebc.ca |
| Surrey Emergency Program (non-emergency) | 604-591-4370 |

## Surrey's Major Road Corridors — What to Know

**Highway 99 (South Surrey / White Rock approach)**
The Highway 99 corridor through South Surrey and toward the Peace Arch border is one of the most heavily travelled in the Lower Mainland. Northbound backups regularly extend from the approach to the Oak Street / Granville bridges all the way back through the 8th Avenue interchange. Breakdowns here need fast response to prevent secondary incidents — call with your direction and the nearest green highway sign number.

**King George Boulevard (North-South arterial)**
King George runs from the US border at the Peace Arch all the way through Newton, Whalley, and into Burnaby. It passes through Surrey Central, the highest-density part of the city, and has constant commercial and transit traffic. Narrow shoulders through the downtown core mean a dead battery or flat tire here requires quick relocation.

**Highway 10 and South Fraser Perimeter Road**
Highway 10 connects Surrey to Delta and the Ladner area. The South Fraser Perimeter Road (SFPR) runs east-west along the river and carries a lot of commercial truck traffic. Both routes see regular breakdowns from commercial vehicles, and heavy equipment tows on the SFPR are a routine call for our larger trucks.

**Fraser Highway (East-West through Cloverdale)**
Fraser Highway connects Surrey to Langley and runs through the Cloverdale community. This is a mixed-use arterial with farms, light industrial areas, and residential neighbourhoods. Breakdowns near the 88th Avenue and 168th Street interchanges are common evening calls.

**152nd and 160th Street (North-South through Fleetwood and Newton)**
These arterials connect the Highway 10 corridor to Guildford and are primarily residential and commercial. Common calls here are lockouts and battery-related roadside failures in the retail strips and residential blocks.

## Common Surrey Breakdown Scenarios

**Parkade lockouts at Guildford Town Centre and Central City**
Mall and retail parkade lockouts are among our most frequent calls in Surrey. Low-clearance underground parkades require a compact wheel-lift or slim-jim entry kit — equipment we carry specifically for these locations. We open the vehicle without touching the paint or weatherstripping.

**Highway 99 and Highway 10 stalls**
A vehicle stalling on either of these corridors at speed needs both a fast response and a careful setup — the tow operator positions the truck to shield your vehicle from passing traffic before loading. Tell us your exact kilometre marker or the name of the nearest interchange.

**Cold-weather battery failures (Newton, Fleetwood, Whalley)**
Newton and Fleetwood see the highest volume of winter battery calls in Surrey because of their density and the number of vehicles that sit unused in driveways through the cold months. We test the battery and charging system after every boost so you know whether it will hold or whether replacement is overdue.

**Cloverdale farm-road recoveries**
The rural roads east of Cloverdale have soft, muddy shoulders in wet weather. A vehicle that slides into a ditch here is a winching job, not a standard tow — our winch-equipped trucks pull the vehicle back onto firm ground without the bumper damage that improvised recovery attempts often cause.

## ICBC and Towing in Surrey

ICBC covers some towing costs after a collision (accident tow), but not for mechanical breakdowns unless you have the optional roadside coverage in your policy. When calling ICBC after an accident, have ready:

- Your ICBC policy number (on your pink insurance card)
- The other driver's information (name, DL number, plate, insurance)
- Your location at the time of the accident
- Photos from the scene if available

ICBC will confirm your towing entitlement and advise on your repair shop options. If you are not sure whether your policy covers a tow, call us first — we provide an upfront quote and you can verify your ICBC coverage while we are en route.

## Surrey Emergency Preparedness Resources

For broader local emergency information beyond roadside incidents:

- **Surrey Emergency Program:** surrey.ca/safety — includes emergency preparedness guides, flood zones, and wildfire information
- **Fraser Health winter safety:** fraserhealth.ca — winter preparedness for health emergencies
- **Personal Emergency Preparedness:** surrey.ca/about-surrey/surrey-emergency-program/personal-emergency-preparedness — 72-hour preparedness kits and family plans

---

**TowingNo.1 covers all of Surrey 24 hours a day — Cloverdale, Fleetwood, Guildford, Newton, South Surrey, Whalley, and the highways connecting them. Call (778) 838-0014 for an upfront quote before we dispatch.**
    `,
  },
  {
    id: 12,
    category: "Towing Advice",
    title: "Towing and Roadside Consumer Rights in BC",
    excerpt: "What BC drivers have the right to expect from a towing company — quotes before dispatch, destination choice, storage rights, and how to handle predatory towing practices and overcharging.",
    date: "August 27, 2026",
    image: "/blog/towing-consumer-rights.jpg",
    slug: "towing-consumer-rights-bc",
    keywords: ["towing consumer rights bc", "bc towing laws", "predatory towing bc", "towing overcharge bc", "tow truck rights bc"],
    content: `
Most towing calls are straightforward — a driver calls, a truck arrives, a quote is given, and the vehicle gets where it needs to go. But some drivers encounter tow operators who arrive unsolicited at accident scenes, add charges after the fact, or pressure them to sign paperwork at the roadside. Knowing your rights in BC before that happens means you can handle it calmly and correctly.

## Your Right to a Quote Before Dispatch

In BC, you are entitled to know the price before you authorize a tow. A reputable towing company provides an upfront price — typically a flat rate based on your vehicle type and the distance to your chosen destination. You are not obligated to accept a verbal quote that is vague ("it depends on how long it takes") — ask for a firm number.

If a tow operator refuses to give you a price before they begin loading your vehicle, you can decline the service. Do not let a tow begin under the assumption you will "sort it out" at the destination.

## Your Right to Choose Your Destination

You can direct a tow operator to take your vehicle to any licensed repair facility, dealership, or private address you choose, within reasonable distance. A tow operator cannot compel you to use a specific repair shop, and they cannot increase the quote because you choose a destination they prefer not to go to.

If you are not sure where to take the vehicle, you can have it towed to your home or a storage location while you decide — you do not have to commit to a repair shop at the roadside.

## Your Right to Ride in the Truck

If there is room in the tow truck cab and you are not under a legal restriction (such as a police-directed tow after a collision where officers are managing the scene), you are generally entitled to ride with your vehicle to its destination. Ask the driver whether you can ride along before the truck leaves the scene.

## Your Right to Retrieve Personal Belongings

If your vehicle is impounded or stored following an accident, CVSE directive, or court order, you have the right to retrieve your personal belongings from the vehicle. This includes medication, identification, child car seats, and other necessities. Contact the storage facility directly and ask to arrange access. Storage operators in BC are required to allow reasonable access to personal property.

## Predatory Towing — What It Looks Like

Predatory towing practices — sometimes called "bandit towing" — involve tow trucks appearing at accident scenes without being called and pressuring drivers into using their service. Signs of this practice include:

- A tow truck arriving before police or EMS when you did not call one
- A driver pressuring you to sign a release or work order quickly before you have spoken to ICBC or police
- A verbal quote at the scene that is significantly higher than expected when you arrive at the destination
- The operator insisting on a specific repair shop and refusing to take the vehicle elsewhere
- Charges for "storage" beginning within hours of the vehicle arriving at a lot you did not choose

If you experience any of these, write down the operator's name, the truck number, the company name, and the time. Take a photo of the truck and any documents you are asked to sign.

## How to Dispute a Towing Charge in BC

If you believe you have been overcharged or treated unfairly by a towing company, you have several options:

**1. Contact the company first.** Put your complaint in writing (email is fine) and request an itemised invoice. Sometimes billing errors are resolved at this stage.

**2. CVSE (Commercial Vehicle Safety and Enforcement).** CVSE licenses commercial vehicles in BC, including tow trucks. You can file a complaint about a licensed operator at cvse.ca. CVSE investigates licensing violations and unsafe practices.

**3. Consumer Protection BC.** For broader consumer contract disputes, Consumer Protection BC (consumerprotectionbc.ca) provides guidance and, in some cases, dispute resolution for BC consumers.

**4. Better Business Bureau.** Filing a BBB complaint creates a public record and often prompts a response from businesses concerned with their rating.

**5. Small Claims Court.** For disputed charges, BC Small Claims Court handles claims up to $35,000. The BC government's website (gov.bc.ca) has a guide to the small claims process.

## How to Protect Yourself at the Roadside

- **Save a towing company's number before you need it.** Having a trusted contact means you are not relying on whoever shows up first.
- **Do not sign anything under pressure.** You have the right to read any document before signing it. If a driver pressures you to sign quickly, that is a red flag.
- **Photograph the vehicle before loading.** This gives you a record of the vehicle's condition at the time of the tow, which matters if any damage occurs during transport.
- **Get a receipt.** You are entitled to an itemised receipt for any towing or storage charges.

## ICBC and Towing Charges

ICBC's Basic Autoplan covers towing costs in some circumstances — the specifics depend on your policy and whether the tow is accident-related or a mechanical breakdown. If you have the Roadside Plus optional coverage, that extends to mechanical breakdowns. Check your policy details or call ICBC at 604-520-8222 to confirm what your coverage includes before you call a tow for a non-accident situation.

---

**TowingNo.1 gives you an upfront quote before we dispatch. No hidden charges, no pressure, no surprises. Call (778) 838-0014, 24/7 across the Lower Mainland.**
    `,
  },
  {
    id: 13,
    category: "Towing Advice",
    title: "Towing and Vehicle Recovery Terminology — A Plain-Language Guide",
    excerpt: "From flatbed to winching, snatch block to recovery point — a clear explanation of the terms tow operators use, so you understand exactly what is happening to your vehicle at the roadside.",
    date: "August 20, 2026",
    image: "/blog/towing-terminology.jpg",
    slug: "towing-vehicle-recovery-terminology",
    keywords: ["towing terminology", "vehicle recovery terms", "flatbed towing explained", "winching terms", "tow truck types bc"],
    content: `
When a tow truck arrives and the driver starts talking about the rig, the rigging, and whether the vehicle is a runner, you want to understand what is going on with your car. This glossary explains the most common towing and vehicle recovery terms in plain language.

## Tow Truck Types

**Flatbed (rollback)**
A truck with a flat, tilting platform. The bed tilts toward the ground and the vehicle is winched onto it or driven up, then transported completely off the road surface. The safest and most versatile type for most passenger vehicles — required for EVs, all-wheel-drive vehicles, and low-clearance sports cars.

**Wheel-lift**
A metal yoke extends from the back of the truck and cradles either the front or rear wheels, lifting that end of the vehicle while the other two wheels roll on the road. Fast to deploy and suitable for short-distance moves with standard rear-wheel-drive or front-wheel-drive vehicles. Not appropriate for EVs or AWD.

**Hook-and-chain**
A legacy method where chains wrap around the vehicle frame or axle. Rarely used on modern vehicles because chains can damage bumpers, bodywork, and frame rails. Occasionally used for salvage or total-loss vehicles where cosmetic damage is not a concern.

**Integrated / heavy-duty rotator**
A specialised rig with a 360-degree boom capable of rotating, extending, and lifting in multiple directions. Used for complex recoveries — overturned commercial trucks, vehicles over embankments, or loads too heavy for a standard flatbed.

**Underlift**
An arm that extends beneath the vehicle and lifts from the frame or subframe rather than the wheels. Used when wheel damage prevents safe loading by wheel-lift.

## Recovery and Winching Terms

**Winching**
Using a motorised drum and cable to pull a stuck vehicle. The winch is typically mounted at the front or rear of the recovery truck and the cable attaches to a rated recovery point on the stuck vehicle.

**Extraction**
Recovering a vehicle from a ditch, mud, snow bank, or off-road position before a tow begins. Extraction is the process of returning the vehicle to firm, level ground.

**Snatch block**
A pulley that attaches to a fixed anchor point and redirects the winch cable. Using a snatch block doubles the pulling force available and changes the recovery angle when a straight pull is not possible.

**Recovery angle**
The angle between the winch cable and the axis of the stuck vehicle. The ideal is a straight pull along the vehicle's long axis — angled pulls reduce effective force and risk bending the vehicle. A snatch block allows a straight pull when the recovery truck cannot position directly in line with the stuck vehicle.

**Recovery strap (kinetic strap)**
A high-stretch nylon strap used for kinetic (dynamic) recovery — typically between two vehicles where the moving vehicle's momentum stores energy in the stretch of the strap and delivers it as a sharp tug to free the stuck vehicle. Different from a tow strap, which does not stretch.

**Tow strap / tow rope**
A non-stretching strap or rope used for attaching a disabled vehicle to a tow truck for short-distance repositioning. Not intended for kinetic recovery.

**D-ring / shackle**
A steel connector shaped like the letter D, used to attach recovery straps, chains, or cables to recovery points on a vehicle. Rated in load capacity — using an undersized shackle can cause a failure under load.

**Recovery point**
A reinforced attachment point on the vehicle's frame, typically rated for the vehicle's weight plus the force of recovery. These are the correct connection points for recovery straps and winch cables. Bumpers, tow balls, tie-down hooks, and suspension components are not recovery points and can fail or cause damage under recovery loads.

## Vehicle Status Terms

**Non-runner / non-drive**
A vehicle that cannot move under its own power. This may be due to mechanical failure, accident damage, flat tires, or a dead battery. A non-runner typically requires winching onto a flatbed rather than driving it up.

**Drive-ready / runner**
A vehicle that can be driven but should not be — for example, after an accident where the vehicle is technically mobile but has safety concerns, or where the owner cannot legally drive it (suspended licence, medical situation). These are often loaded by driving onto a flatbed under the operator's direction.

**Transport mode**
A software setting on electric vehicles that disconnects the drive motors to prevent electricity generation when the vehicle's wheels spin during transport. Must be activated before loading on most EV models. See the manufacturer's owner manual for the specific procedure on each make and model.

## Weight and Capacity Terms

**GVWR (Gross Vehicle Weight Rating)**
The maximum safe total weight of a vehicle when fully loaded — passengers, cargo, and fuel included. A tow truck's capacity rating must exceed the GVWR of the vehicle being towed. This is why heavy SUVs and trucks often require a larger rig than a standard passenger car.

**GCW (Gross Combination Weight)**
The combined weight of the tow truck plus the towed vehicle. Relevant for commercial towing, where regulations set maximum GCW limits on BC roads.

## Rigging and Load Securement

**Safety chain**
Chains that cross under the towed vehicle and attach to the tow truck as a secondary retention system, in case the primary attachment — wheel-lift yoke, tie-downs, or winch cable — fails during transport.

**Wheel chock**
A wedge placed against a tyre to prevent rolling. Used when loading or positioning a vehicle on a flatbed and when leaving a vehicle in storage on a sloped surface.

**Tie-down / ratchet strap**
Straps used to secure a vehicle to a flatbed platform at multiple points, preventing movement during transport. Four-point tie-down — one strap at each wheel or frame point — is standard practice for safe transport.

---

**Now that you know the terms, you know what to ask for. TowingNo.1 dispatches flatbed, wheel-lift, and winch-equipped trucks across the Lower Mainland. Call (778) 838-0014, 24/7.**
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

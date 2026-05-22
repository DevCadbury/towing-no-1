export interface ServiceArea {
  slug: string;
  city: string;
  headline: string;
  summary: string;
  nearbyCities: string[];
  neighborhoods: string[];
  highways: string[];
  localLandmarks: string[];
  faq: { q: string; a: string }[];
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "surrey",
    city: "Surrey",
    headline: "Tow Truck Surrey — 24/7 Emergency Towing & Roadside Assistance",
    summary:
      "Fast tow truck dispatch across Surrey for breakdowns, collisions, lockouts, battery issues, and flat tires. We cover all Surrey neighbourhoods including Guildford, Newton, Fleetwood, Cloverdale, and South Surrey with an average response time under 15 minutes.",
    nearbyCities: ["Delta", "White Rock", "Langley", "Burnaby"],
    neighborhoods: ["Guildford", "Newton", "Fleetwood", "Cloverdale", "South Surrey", "Whalley", "City Centre"],
    highways: ["Highway 99", "King George Boulevard", "152nd Street", "Highway 10", "Fraser Highway"],
    localLandmarks: ["Surrey Central SkyTrain", "Guildford Town Centre", "Newton Exchange", "Cloverdale Fairgrounds"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Surrey?",
        a: "Our average response time in Surrey is under 15 minutes. We dispatch the nearest available driver immediately when you call (778) 838-0014.",
      },
      {
        q: "How much does towing cost in Surrey?",
        a: "We use flat-rate pricing with no hidden fees. The cost depends on vehicle type and distance. Call (778) 838-0014 for an instant quote before we dispatch.",
      },
      {
        q: "Do you cover South Surrey and White Rock?",
        a: "Yes. We serve all of Surrey including South Surrey, and we also cover White Rock, Delta, and Langley with the same 24/7 response.",
      },
      {
        q: "Are you available on holidays in Surrey?",
        a: "Yes. TowingNo.1 operates 24 hours a day, 7 days a week, including all statutory holidays.",
      },
      {
        q: "Do you tow on Highway 99 and King George Boulevard in Surrey?",
        a: "Yes. We respond to breakdowns on Highway 99, King George Boulevard, 152nd Street, and all major Surrey corridors. Call us and give your nearest cross-street or kilometre marker.",
      },
    ],
  },
  {
    slug: "langley",
    city: "Langley",
    headline: "Tow Truck Langley — 24/7 Towing & Roadside Assistance",
    summary:
      "24/7 towing service in Langley with quick ETAs, upfront quotes, and trained operators for all vehicle types. We cover Willoughby, Walnut Grove, Murrayville, Brookswood, and Aldergrove with fast dispatch.",
    nearbyCities: ["Surrey", "Aldergrove", "Cloverdale", "Abbotsford"],
    neighborhoods: ["Willoughby", "Walnut Grove", "Murrayville", "Brookswood", "Aldergrove", "Fort Langley"],
    highways: ["Highway 1 (Trans-Canada)", "Fraser Highway", "200th Street", "Highway 10"],
    localLandmarks: ["Willowbrook Shopping Centre", "Langley Events Centre", "Fort Langley National Historic Site"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Langley?",
        a: "Our average response time in Langley is under 20 minutes. We dispatch the nearest available driver immediately when you call.",
      },
      {
        q: "Do you cover Aldergrove and Fort Langley?",
        a: "Yes. We serve all of Langley City and Langley Township including Aldergrove, Fort Langley, Willoughby, and Walnut Grove.",
      },
      {
        q: "Can you tow on Highway 1 near Langley?",
        a: "Yes. We respond to breakdowns on Highway 1 (Trans-Canada) through Langley. Call us with your location and we'll dispatch immediately.",
      },
      {
        q: "Do you offer roadside assistance in Langley without towing?",
        a: "Yes. If your issue can be solved on the spot — flat tire, dead battery, out of fuel, locked out — we fix it right there. Towing is only arranged when the vehicle truly can't be driven.",
      },
    ],
  },
  {
    slug: "burnaby",
    city: "Burnaby",
    headline: "Tow Truck Burnaby — 24/7 Emergency Towing & Roadside Help",
    summary:
      "Reliable towing and roadside help in Burnaby including battery boosts, lockouts, and accident recovery. We serve Metrotown, Brentwood, Edmonds, and Lougheed with fast 24/7 dispatch.",
    nearbyCities: ["Vancouver", "New Westminster", "Coquitlam", "Surrey"],
    neighborhoods: ["Metrotown", "Brentwood", "Edmonds", "Lougheed", "Burnaby Heights", "Capitol Hill"],
    highways: ["Highway 1 (Trans-Canada)", "Lougheed Highway", "Kingsway", "Canada Way"],
    localLandmarks: ["Metrotown Shopping Centre", "Brentwood Town Centre", "SFU Burnaby Campus", "Burnaby Lake"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Burnaby?",
        a: "Our average response time in Burnaby is under 15 minutes. We dispatch the nearest available driver immediately.",
      },
      {
        q: "Do you tow on the Trans-Canada Highway through Burnaby?",
        a: "Yes. We respond to breakdowns on Highway 1 through Burnaby, Lougheed Highway, and Kingsway. Call with your location and we'll dispatch right away.",
      },
      {
        q: "Can you help with a lockout in Burnaby?",
        a: "Yes. Our lockout service opens your vehicle safely without damage. We cover all of Burnaby including Metrotown, Brentwood, and Edmonds.",
      },
      {
        q: "Do you offer battery boost service in Burnaby?",
        a: "Yes. We provide 24/7 battery boost and jump-start service across all Burnaby neighbourhoods. Average arrival time is under 15 minutes.",
      },
    ],
  },
  {
    slug: "coquitlam",
    city: "Coquitlam",
    headline: "Tow Truck Coquitlam — 24/7 Emergency Towing Near You",
    summary:
      "Need towing near you in Coquitlam? We dispatch quickly for emergency towing and roadside support across Burke Mountain, Westwood Plateau, Maillardville, and Austin Heights.",
    nearbyCities: ["Port Coquitlam", "Port Moody", "Burnaby", "Maple Ridge"],
    neighborhoods: ["Burke Mountain", "Westwood Plateau", "Maillardville", "Austin Heights", "Ranch Park", "Chineside"],
    highways: ["Lougheed Highway", "Barnet Highway", "Highway 7", "United Boulevard"],
    localLandmarks: ["Coquitlam Centre", "Town Centre Park", "Lafarge Lake", "Lincoln SkyTrain Station"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Coquitlam?",
        a: "Our average response time in Coquitlam is under 20 minutes. We dispatch the nearest available driver immediately when you call.",
      },
      {
        q: "Do you cover Port Coquitlam and Port Moody?",
        a: "Yes. We serve Coquitlam, Port Coquitlam, and Port Moody with the same 24/7 dispatch and upfront pricing.",
      },
      {
        q: "Can you tow on Lougheed Highway near Coquitlam?",
        a: "Yes. We respond to breakdowns on Lougheed Highway, Barnet Highway, and all major Coquitlam corridors.",
      },
      {
        q: "Do you offer winching service in Coquitlam?",
        a: "Yes. If your vehicle is stuck in a ditch, mud, or snow in Coquitlam, our winching and extraction team will pull it out safely.",
      },
    ],
  },
  {
    slug: "richmond",
    city: "Richmond",
    headline: "Tow Truck Richmond — 24/7 Towing & Roadside Assistance",
    summary:
      "Professional tow truck service in Richmond for stalled vehicles, flat tires, lockouts, and fuel delivery. We serve Steveston, Brighouse, Bridgeport, and Sea Island with fast 24/7 dispatch.",
    nearbyCities: ["Vancouver", "Delta", "Burnaby", "Surrey"],
    neighborhoods: ["Steveston", "Brighouse", "Bridgeport", "Sea Island", "Shellmont", "East Richmond"],
    highways: ["Highway 99", "Knight Street Bridge", "No. 3 Road", "Steveston Highway"],
    localLandmarks: ["Richmond Centre", "Steveston Village", "YVR Airport", "Bridgeport SkyTrain Station"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Richmond?",
        a: "Our average response time in Richmond is under 20 minutes. We dispatch the nearest available driver immediately when you call.",
      },
      {
        q: "Do you tow near YVR Airport in Richmond?",
        a: "Yes. We serve Sea Island and the YVR Airport area. If your vehicle breaks down near the airport, call us for immediate dispatch.",
      },
      {
        q: "Can you help with a flat tire in Richmond?",
        a: "Yes. Our flat tire service changes your tire on-site or tows you to the nearest shop. We cover all of Richmond including Steveston and Bridgeport.",
      },
      {
        q: "Do you offer fuel delivery in Richmond?",
        a: "Yes. If you run out of fuel in Richmond, we deliver gasoline or diesel directly to your location so you can reach the nearest station.",
      },
    ],
  },
  {
    slug: "white-rock",
    city: "White Rock",
    headline: "Tow Truck White Rock — 24/7 Towing & Roadside Assistance",
    summary:
      "24/7 towing in White Rock with rapid response, fair pricing, and careful vehicle handling. We serve Uptown, East Beach, West Beach, and Five Corners with fast dispatch.",
    nearbyCities: ["Surrey", "South Surrey", "Langley", "Delta"],
    neighborhoods: ["Uptown", "East Beach", "West Beach", "Five Corners", "Ocean Park"],
    highways: ["Highway 99", "King George Boulevard", "16th Avenue", "Marine Drive"],
    localLandmarks: ["White Rock Pier", "White Rock Beach", "Peace Arch Border Crossing", "Semiahmoo Shopping Centre"],
    faq: [
      {
        q: "How fast can a tow truck reach me in White Rock?",
        a: "Our average response time in White Rock is under 20 minutes. We dispatch the nearest available driver immediately when you call.",
      },
      {
        q: "Do you cover the White Rock Beach area?",
        a: "Yes. We serve all of White Rock including the beachfront, Marine Drive, and Uptown areas.",
      },
      {
        q: "Can you tow near the Peace Arch Border Crossing?",
        a: "Yes. We respond to breakdowns near the Peace Arch crossing and along Highway 99 through White Rock and South Surrey.",
      },
      {
        q: "Do you offer battery boost service in White Rock?",
        a: "Yes. We provide 24/7 battery boost and jump-start service across White Rock. Average arrival time is under 20 minutes.",
      },
    ],
  },
  {
    slug: "vancouver",
    city: "Vancouver",
    headline: "Tow Truck Vancouver — 24/7 Emergency Towing Near You",
    summary:
      "Emergency towing and roadside service in Vancouver with immediate dispatch and transparent rates. We serve Downtown, Kitsilano, Mount Pleasant, East Vancouver, and surrounding areas.",
    nearbyCities: ["Burnaby", "Richmond", "North Vancouver", "New Westminster"],
    neighborhoods: ["Downtown", "Kitsilano", "Mount Pleasant", "East Vancouver", "West End", "Strathcona"],
    highways: ["Highway 1 (Trans-Canada)", "Granville Street", "Broadway", "Knight Street"],
    localLandmarks: ["Vancouver City Hall", "Granville Island", "BC Place", "Rogers Arena"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Vancouver?",
        a: "Our average response time in Vancouver is under 20 minutes. We dispatch the nearest available driver immediately when you call.",
      },
      {
        q: "Do you tow in Downtown Vancouver?",
        a: "Yes. We serve Downtown Vancouver, the West End, Yaletown, and all central Vancouver neighbourhoods 24/7.",
      },
      {
        q: "Can you help with a lockout in Vancouver?",
        a: "Yes. Our lockout service opens your vehicle safely without damage across all Vancouver neighbourhoods.",
      },
      {
        q: "Do you offer roadside assistance in Vancouver without towing?",
        a: "Yes. Battery boost, flat tire change, fuel delivery, and lockout service are all available on-site in Vancouver.",
      },
    ],
  },
  {
    slug: "delta",
    city: "Delta",
    headline: "Tow Truck Delta — 24/7 Emergency Towing & Roadside Help",
    summary:
      "Fast tow truck dispatch across Delta including Ladner, Tsawwassen, and North Delta. We provide 24/7 emergency towing, battery boosts, lockouts, and flat tire help with upfront pricing.",
    nearbyCities: ["Surrey", "Richmond", "White Rock", "Burnaby"],
    neighborhoods: ["Ladner", "Tsawwassen", "North Delta", "Annieville", "Nordel"],
    highways: ["Highway 99", "Deltaport Way", "Highway 17", "Scott Road (120th Street)"],
    localLandmarks: ["Tsawwassen Ferry Terminal", "Tsawwassen Mills", "Ladner Village", "Burns Bog"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Delta?",
        a: "Our average response time in Delta is under 20 minutes. We dispatch the nearest available driver immediately when you call.",
      },
      {
        q: "Do you cover Tsawwassen and Ladner?",
        a: "Yes. We serve all of Delta including Tsawwassen, Ladner, and North Delta with the same 24/7 dispatch.",
      },
      {
        q: "Can you tow near the Tsawwassen Ferry Terminal?",
        a: "Yes. We respond to breakdowns near the BC Ferries terminal and along Highway 17 through Tsawwassen.",
      },
      {
        q: "Do you offer roadside assistance in Delta?",
        a: "Yes. Battery boost, flat tire change, fuel delivery, lockout service, and winching are all available 24/7 across Delta.",
      },
    ],
  },
  {
    slug: "maple-ridge",
    city: "Maple Ridge",
    headline: "Tow Truck Maple Ridge — 24/7 Towing & Roadside Assistance",
    summary:
      "24/7 tow truck service in Maple Ridge for breakdowns, lockouts, battery issues, and flat tires. We serve all Maple Ridge neighbourhoods including Albion, Haney, and Pitt Meadows with fast dispatch.",
    nearbyCities: ["Pitt Meadows", "Coquitlam", "Mission", "Langley"],
    neighborhoods: ["Haney", "Albion", "Thornhill", "Silver Valley", "Pitt Meadows"],
    highways: ["Lougheed Highway (Highway 7)", "Dewdney Trunk Road", "Golden Ears Way"],
    localLandmarks: ["Golden Ears Provincial Park", "Maple Ridge Town Centre", "Haney Place Mall"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Maple Ridge?",
        a: "Our average response time in Maple Ridge is under 25 minutes. We dispatch the nearest available driver immediately when you call.",
      },
      {
        q: "Do you cover Pitt Meadows?",
        a: "Yes. We serve both Maple Ridge and Pitt Meadows with the same 24/7 dispatch and upfront pricing.",
      },
      {
        q: "Can you tow on Lougheed Highway near Maple Ridge?",
        a: "Yes. We respond to breakdowns on Lougheed Highway (Highway 7) and Dewdney Trunk Road through Maple Ridge.",
      },
      {
        q: "Do you offer winching service in Maple Ridge?",
        a: "Yes. If your vehicle is stuck in a ditch or off-road near Maple Ridge, our winching and extraction team will pull it out safely.",
      },
    ],
  },
];

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

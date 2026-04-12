export interface ServiceArea {
  slug: string;
  city: string;
  headline: string;
  summary: string;
  nearbyCities: string[];
  neighborhoods: string[];
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: "surrey",
    city: "Surrey",
    headline: "Tow Truck Surrey - 24/7 Emergency Response",
    summary:
      "Fast tow truck dispatch across Surrey for breakdowns, collisions, lockouts, battery issues, and flat tires.",
    nearbyCities: ["Delta", "White Rock", "Langley"],
    neighborhoods: ["Guildford", "Newton", "Fleetwood", "Cloverdale", "South Surrey"],
  },
  {
    slug: "langley",
    city: "Langley",
    headline: "Langley Towing and Roadside Assistance",
    summary:
      "24/7 towing service in Langley with quick ETAs, upfront quotes, and trained operators for all vehicle types.",
    nearbyCities: ["Surrey", "Aldergrove", "Cloverdale"],
    neighborhoods: ["Willoughby", "Walnut Grove", "Murrayville", "Brookswood"],
  },
  {
    slug: "burnaby",
    city: "Burnaby",
    headline: "Emergency Tow Truck Burnaby",
    summary:
      "Reliable towing and roadside help in Burnaby including battery boosts, lockouts, and accident recovery.",
    nearbyCities: ["Vancouver", "New Westminster", "Coquitlam"],
    neighborhoods: ["Metrotown", "Brentwood", "Edmonds", "Lougheed"],
  },
  {
    slug: "coquitlam",
    city: "Coquitlam",
    headline: "Coquitlam Tow Truck Available 24/7",
    summary:
      "Need towing near you in Coquitlam? We dispatch quickly for emergency towing and roadside support.",
    nearbyCities: ["Port Coquitlam", "Port Moody", "Burnaby"],
    neighborhoods: ["Burke Mountain", "Westwood Plateau", "Maillardville", "Austin Heights"],
  },
  {
    slug: "richmond",
    city: "Richmond",
    headline: "Richmond Towing Services Day and Night",
    summary:
      "Professional tow truck service in Richmond for stalled vehicles, flat tires, lockouts, and fuel delivery.",
    nearbyCities: ["Vancouver", "Delta", "Burnaby"],
    neighborhoods: ["Steveston", "Brighouse", "Bridgeport", "Sea Island"],
  },
  {
    slug: "white-rock",
    city: "White Rock",
    headline: "White Rock Roadside and Towing",
    summary:
      "24/7 towing in White Rock with rapid response, fair pricing, and careful vehicle handling.",
    nearbyCities: ["Surrey", "South Surrey", "Langley"],
    neighborhoods: ["Uptown", "East Beach", "West Beach", "Five Corners"],
  },
  {
    slug: "vancouver",
    city: "Vancouver",
    headline: "Vancouver Tow Truck Near You",
    summary:
      "Emergency towing and roadside service in Vancouver with immediate dispatch and transparent rates.",
    nearbyCities: ["Burnaby", "Richmond", "North Vancouver"],
    neighborhoods: ["Downtown", "Kitsilano", "Mount Pleasant", "East Vancouver"],
  },
];

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

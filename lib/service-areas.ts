export interface ServiceArea {
  slug: string;
  city: string;
  headline: string;
  summary: string;
  /** Short /locations card text: local geography already named on the city page (A-024, D-057). */
  cardText: string;
  intro: string[];
  whyChooseUs: string[];
  commonScenarios: { title: string; body: string }[];
  nearbyCities: string[];
  neighborhoods: string[];
  highways: string[];
  localLandmarks: string[];
  faq: { q: string; a: string }[];
}

const serviceAreaData: ServiceArea[] = [
  {
    slug: "surrey",
    city: "Surrey",
    headline: "24/7 Towing Service in Surrey, BC",
    summary:
      "TowingNo.1 provides 24/7 emergency towing and roadside assistance across Surrey, BC. We dispatch immediately for emergency towing, battery boosts, car lockouts, flat tires, fuel delivery, and accident recovery throughout Surrey and surrounding communities. Call (778) 838-0014.",
    cardText: "From the Guildford mall parkades and Whalley's City Centre to King George Boulevard and the Highway 99 approach.",
    intro: [
      "Surrey is the busiest territory we cover, and the sprawl from the big box stores of Guildford down through Newton and out to the Cloverdale fairgrounds means breakdowns happen in every kind of setting: packed mall parkades, quiet residential streets off 152nd Street, and fast traffic on Highway 99.",
      "Whalley and the City Centre area generate a steady stream of parkade and curbside calls, while South Surrey and Morgan Crossing tend toward longer highway runs along 99 and 16th Avenue. Whichever pocket of the city you are stranded in, give our dispatcher the nearest major intersection (King George and 104th, Fraser Highway and 152nd, or the Highway 10 and 64th interchange) and we will send the nearest available driver.",
    ],
    whyChooseUs: [
      "Local Surrey drivers know the difference between the Guildford slip lanes and the Newton Exchange bus loops, so they do not waste time circling for an address the way an operator from out of town might. That familiarity matters most during rush hour on King George Boulevard or when a collision closes a lane on the Highway 99 approach to the Massey corridor.",
      "We provide light-duty wheel-lift towing for cars, SUVs and light trucks, and we answer 3 a.m. calls the same way we handle a Tuesday afternoon.",
    ],
    commonScenarios: [
      {
        title: "Parkade and mall lockouts in Guildford",
        body: "Lockouts come up often around Guildford Town Centre and the surrounding retail lots, where parkade ceilings are low and stalls are tight. We use careful entry techniques to open the vehicle on the spot and get you back to your shopping run.",
      },
      {
        title: "Highway 99 and King George breakdowns",
        body: "Stalls and flats on Highway 99, King George Boulevard, and the Highway 10 corridor need a driver who can reach a live shoulder safely. We position the truck to shield you from traffic, then load quickly so you are not standing beside moving lanes any longer than necessary.",
      },
      {
        title: "Winter starts in Newton and Fleetwood",
        body: "Cold snaps drain weak batteries across Newton and Fleetwood every January. We boost the battery where the car sits, and if it still won't start, we tow it to a shop or your home so the next freeze does not leave you stranded again.",
      },
    ],
    nearbyCities: ["Delta", "White Rock", "Langley", "Burnaby"],
    neighborhoods: ["Guildford", "Newton", "Fleetwood", "Cloverdale", "South Surrey", "Whalley", "City Centre"],
    highways: ["Highway 99", "King George Boulevard", "152nd Street", "Highway 10", "Fraser Highway"],
    localLandmarks: ["Surrey Central SkyTrain", "Guildford Town Centre", "Newton Exchange", "Cloverdale Fairgrounds"],
    faq: [
      {
        q: "How quickly can a tow truck reach me in Surrey?",
        a: "We dispatch the nearest available driver when you call (778) 838-0014. Give the dispatcher your nearest major intersection, such as King George and 104th or Fraser Highway and 152nd. Fast local dispatch; arrival times vary by location and road conditions.",
      },
      {
        q: "Do you provide 24/7 towing in Surrey?",
        a: "Yes. TowingNo.1 operates 24 hours a day, 7 days a week in Surrey, including evenings, weekends and statutory holidays. Emergencies don't follow business hours, and neither do we.",
      },
      {
        q: "Do you provide roadside assistance in Surrey?",
        a: "Yes. Beyond towing, we offer battery boosts and jump starts, flat tire changes, car lockout service, and fuel delivery across all Surrey neighbourhoods. Many calls are resolved on the spot without needing a tow.",
      },
      {
        q: "Do you tow cars after accidents in Surrey?",
        a: "Yes. Our accident recovery service handles collision scenes throughout Surrey. We transport damaged vehicles to the repair shop, dealership, or address you choose.",
      },
      {
        q: "What areas of Surrey do you serve?",
        a: "We cover all of Surrey including Cloverdale, Fleetwood, Guildford, Newton, South Surrey, and Whalley. We also dispatch to neighbouring communities including Langley, Delta, White Rock, and Burnaby.",
      },
      {
        q: "How much does towing cost in Surrey?",
        a: "Prices are not listed on this site because every call is different. Call (778) 838-0014, tell the dispatcher where you are in Surrey, your vehicle, and the help you need, and ask about the cost before anyone is sent.",
      },
    ],
  },
  {
    slug: "langley",
    city: "Langley",
    headline: "24/7 Towing Service in Langley, BC",
    summary:
      "TowingNo.1 provides 24/7 emergency towing and roadside assistance across Langley, BC, including Langley City, Langley Township, Willoughby, Walnut Grove, Murrayville, Brookswood, Aldergrove, and Fort Langley. Call (778) 838-0014.",
    cardText: "From the townhome blocks of Willoughby out to the farm roads past Aldergrove, with the Trans-Canada through the middle.",
    intro: [
      "Langley stretches from the dense townhome blocks of Willoughby out to the farm roads past Aldergrove, so a single shift here can mean a parkade boost in Walnut Grove followed by a ditch recovery on a rural section line near Otter. The Trans-Canada cuts straight through the community, and traffic at the 200th Street interchange often backs up, which is when an overheating engine finally gives out.",
      "Drivers heading to Fort Langley along the river road or commuting down the Fraser Highway through Murrayville are often surprised how quickly the surroundings turn rural. That mix is exactly why local knowledge matters: we know which Brookswood side streets flood after heavy rain and where the Aldergrove shoulders are wide enough to load safely.",
    ],
    whyChooseUs: [
      "Township roads are long and lightly lit, so a vague address can cost a stranded driver significant extra time with the wrong company. Our dispatchers ask for the nearest cross street or a landmark like the Langley Events Centre or Willowbrook so the nearest available driver heads straight to you instead of hunting down a rural route number in the dark.",
      "Our light-duty wheel-lift truck handles cars, SUVs and light trucks, from a commuter car in Willoughby to a light work van on Highway 1. Available 24/7, we treat a midnight breakdown near Aldergrove the same as a midday call in town.",
    ],
    commonScenarios: [
      {
        title: "Trans-Canada breakdowns near 200th Street",
        body: "The Highway 1 corridor through Langley sees heavy commuter volume, and the 200th Street and 232nd Street interchanges are common stall points. We reach the shoulder, shield the vehicle from passing traffic, and hook up quickly so you clear the live lane safely.",
      },
      {
        title: "Rural recoveries around Aldergrove and Otter",
        body: "Soft shoulders and roadside ditches on Langley's farm roads catch drivers off guard, especially in wet weather. We winch vehicles back onto firm ground, taking care to protect bumpers and the undercarriage on the way out.",
      },
      {
        title: "Walnut Grove and Willoughby roadside help",
        body: "Dead batteries, flats, and lockouts in the newer Walnut Grove and Willoughby neighbourhoods are usually quick fixes on the spot. We change the spare, boost the battery, or open the door right in your driveway or strata lot so a tow is rarely needed.",
      },
    ],
    nearbyCities: ["Surrey", "Maple Ridge", "Coquitlam"],
    neighborhoods: ["Willoughby", "Walnut Grove", "Murrayville", "Brookswood", "Aldergrove", "Fort Langley", "Langley City"],
    highways: ["Highway 1 (Trans-Canada)", "Fraser Highway", "200th Street", "Highway 10"],
    localLandmarks: ["Willowbrook Shopping Centre", "Langley Events Centre", "Fort Langley National Historic Site"],
    faq: [
      {
        q: "How quickly can a tow truck reach me in Langley?",
        a: "We dispatch the nearest available driver when you call (778) 838-0014. Because Langley covers a wide area from Willoughby to Aldergrove, give the dispatcher your nearest cross street or landmark. Fast local dispatch; arrival times vary by location and road conditions.",
      },
      {
        q: "Do you provide 24/7 towing in Langley?",
        a: "Yes. TowingNo.1 operates 24 hours a day, 7 days a week across Langley, including evenings, weekends and statutory holidays. Whether you're stranded on Highway 1 at midnight or in a Willoughby parkade on a Sunday morning, we answer.",
      },
      {
        q: "Do you cover all of Langley including Aldergrove and Fort Langley?",
        a: "Yes. We serve Langley City and all of Langley Township, including Willoughby, Walnut Grove, Murrayville, Brookswood, Aldergrove, Fort Langley, and the rural roads in between. Give us your nearest cross street and we'll dispatch accordingly.",
      },
      {
        q: "Do you offer roadside assistance in Langley without towing?",
        a: "Yes. We provide battery boosts, flat tire changes, car lockout service, and fuel delivery across Langley. If the problem can be solved on the spot, we fix it there. A tow is only arranged when the vehicle genuinely cannot be driven.",
      },
      {
        q: "Can you tow on Highway 1 near Langley?",
        a: "Yes. We respond to breakdowns on Highway 1 (Trans-Canada) through Langley, including the 200th Street, 232nd Street, and Glover Road interchanges. Call us with your location and we send the nearest available driver.",
      },
      {
        q: "How much does towing cost in Langley?",
        a: "Prices are not listed on this site because every call is different. Call (778) 838-0014, tell the dispatcher where you are in Langley, your vehicle, and the help you need, and ask about the cost before anyone is sent.",
      },
    ],
  },
  {
    slug: "burnaby",
    city: "Burnaby",
    headline: "Tow Truck Burnaby: 24/7 Emergency Towing & Roadside Help",
    summary:
      "Reliable towing and roadside help in Burnaby including battery boosts, lockouts, and accident recovery. We serve Metrotown, Brentwood, Edmonds, and Lougheed with fast 24/7 dispatch.",
    cardText: "Tower parkades at Metrotown and Brentwood, the Kingsway and Lougheed strips, and the Trans-Canada climb toward the SFU exit.",
    intro: [
      "Burnaby packs three town centres, two mountains, and several of the region's busiest highways into one city, so our drivers handle everything from tight tower parkades at Metrotown and Brentwood to stalls in fast traffic on the Trans-Canada as it climbs toward the SFU exit. The density means a lot of our work is vertical: getting a wheel lift truck into a residential parkade on Kingsway or a Brentwood condo without scraping a low ceiling.",
      "Lougheed Highway and Canada Way carry steady traffic between New Westminster and the Tri-Cities, and we field regular calls on both whenever a radiator lets go in summer heat. Knowing the quickest legal turnaround near Burnaby Lake or the Edmonds interchange lets the nearest available driver reach you without adding a frustrating loop through one way arterials.",
    ],
    whyChooseUs: [
      "Burnaby's parkades and tower lots demand a driver who can manoeuvre a tow truck in tight quarters without clipping a pillar. Our light-duty wheel-lift truck has a low clearance height, so it can reach most low-clearance parkades around Metrotown and Brentwood where standard tow trucks can't fit. Many of the all wheel drive crossovers and EVs in these towers should not be towed on their drive wheels, so give the dispatcher the make and drive type when you call.",
      "Whether you are stuck on Highway 1 below Capitol Hill or in a Lougheed Town Centre stall, we dispatch the nearest available driver around the clock.",
    ],
    commonScenarios: [
      {
        title: "Tower parkade boosts at Metrotown and Brentwood",
        body: "Residents of the towers around Metrotown and Brentwood often find a flat battery after a car sits unused in the parkade for a week. We bring the boost pack down to your stall and get the car started, and if it still won't turn over, we can tow it to the shop of your choice.",
      },
      {
        title: "Trans-Canada stalls near the SFU climb",
        body: "The Highway 1 grade up toward the Burnaby Mountain and SFU exits is hard on cooling systems. We respond quickly to overheated and stalled vehicles on that stretch, hook up on the shoulder, and deliver to your shop of choice across the city.",
      },
      {
        title: "Lougheed and Kingsway lockouts",
        body: "Busy commercial strips along Lougheed Highway and Kingsway generate frequent lockout calls. Our technicians use careful entry techniques to open the vehicle, with attention to the door and glass, so a quick errand that went sideways is sorted out on the spot.",
      },
    ],
    nearbyCities: ["Vancouver", "Coquitlam", "Richmond", "Surrey"],
    neighborhoods: ["Metrotown", "Brentwood", "Edmonds", "Lougheed", "Burnaby Heights", "Capitol Hill"],
    highways: ["Highway 1 (Trans-Canada)", "Lougheed Highway", "Kingsway", "Canada Way"],
    localLandmarks: ["Metrotown Shopping Centre", "Brentwood Town Centre", "SFU Burnaby Campus", "Burnaby Lake"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Burnaby?",
        a: "We dispatch the nearest available driver when you call and ask for your nearest cross street, whether you are at Metrotown, Brentwood, or along Kingsway. Fast local dispatch; arrival times vary by location and road conditions.",
      },
      {
        q: "Do you tow on the Trans-Canada Highway through Burnaby?",
        a: "Yes. We respond to breakdowns on Highway 1 through Burnaby, Lougheed Highway, and Kingsway. Call with your location and we'll send the nearest available driver.",
      },
      {
        q: "Can you help with a lockout in Burnaby?",
        a: "Yes. Our lockout service uses careful entry techniques to open your vehicle. We cover all of Burnaby including Metrotown, Brentwood, and Edmonds.",
      },
      {
        q: "Do you offer battery boost service in Burnaby?",
        a: "Yes. We provide 24/7 battery boost and jump start service across all Burnaby neighbourhoods.",
      },
    ],
  },
  {
    slug: "coquitlam",
    city: "Coquitlam",
    headline: "Tow Truck Coquitlam: 24/7 Emergency Towing Near You",
    summary:
      "Need towing near you in Coquitlam? We dispatch quickly for emergency towing and roadside support across Burke Mountain, Westwood Plateau, Maillardville, and Austin Heights.",
    cardText: "From the Maillardville flats and United Boulevard up the grades of Westwood Plateau and Burke Mountain.",
    intro: [
      "Coquitlam climbs from the flats of Maillardville and the United Boulevard industrial strip up the steep grades of Westwood Plateau and Burke Mountain, and that elevation shapes most of our calls here. Winter brings the toughest work: cars that handle the valley fine suddenly lose traction on the plateau switchbacks, and we spend snowy nights winching vehicles back onto the road above Town Centre Park.",
      "Down on the level, the Lougheed and Barnet Highway corridors funnel commuter traffic past Coquitlam Centre and the Lincoln SkyTrain station, where summer heat and stop and go driving expose tired cooling systems. Telling our dispatcher whether you are up the hill or down near Lafarge Lake lets the driver plan for the conditions you are actually in.",
    ],
    whyChooseUs: [
      "The Burke Mountain and Westwood Plateau grades are unforgiving when there is ice or a stalled vehicle on a blind curve, so we send drivers who know how to set up a recovery safely on a slope rather than improvising. That experience protects both your vehicle and the traffic coming up behind it.",
      "Hill or no hill, we dispatch 24/7, and our winching service is meant for exactly the terrain this city throws at drivers.",
    ],
    commonScenarios: [
      {
        title: "Winter traction loss on Westwood Plateau",
        body: "Snow and ice on the Plateau and Burke Mountain switchbacks send cars sliding into curbs and shallow ditches every winter. We winch them from the bank back onto cleared pavement, taking care not to grind the bumper along the way.",
      },
      {
        title: "Lougheed and Barnet Highway stalls",
        body: "Commuter traffic on Lougheed and Barnet Highway near Coquitlam Centre is hard on aging radiators. We reach stalled vehicles quickly on these arterials, lift the front or rear onto the wheel lift, and run you to a nearby shop or your driveway.",
      },
      {
        title: "Maillardville and Austin Heights roadside help",
        body: "Flat tires, dead batteries, and lockouts around Maillardville and Austin Heights are usually fixed on the spot. We change the spare, jump the battery, or pop the lock so most of these calls never need a tow at all.",
      },
    ],
    nearbyCities: ["Burnaby", "Maple Ridge", "Surrey"],
    neighborhoods: ["Burke Mountain", "Westwood Plateau", "Maillardville", "Austin Heights", "Ranch Park", "Chineside"],
    highways: ["Lougheed Highway", "Barnet Highway", "Highway 7", "United Boulevard"],
    localLandmarks: ["Coquitlam Centre", "Town Centre Park", "Lafarge Lake", "Lincoln SkyTrain Station"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Coquitlam?",
        a: "We dispatch the nearest available driver when you call and ask whether you are up on Westwood Plateau or down near Coquitlam Centre, so the dispatcher knows the conditions you are in. Fast local dispatch; arrival times vary by location and road conditions.",
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
    headline: "Tow Truck Richmond: 24/7 Towing & Roadside Assistance",
    summary:
      "Professional tow truck service in Richmond for stalled vehicles, flat tires, lockouts, and fuel delivery. We serve Steveston, Brighouse, Bridgeport, and Sea Island with fast 24/7 dispatch.",
    cardText: "The No. 3 Road grid, Steveston's cannery streets, and the Sea Island roads around YVR and Bridgeport.",
    intro: [
      "Richmond sits on the flat delta islands of the Fraser, laced with long straight arterials like No. 3 Road and Steveston Highway and bordered by the Highway 99 tunnel approach. The geography is kind to our response times because the grid is easy to navigate, but the bridges and the YVR airport lands add their own quirks, with frequent calls near Bridgeport and the Sea Island terminals where rental returns and rideshare cars give out.",
      "From the historic cannery streets of Steveston to the dense Brighouse core around Richmond Centre, parking is tight and ground clearance is low, so mention a lowered import or an EV when you call; many of them should not be towed on their drive wheels. Give our dispatcher a nearby cross street such as No. 3 Road and Westminster Highway and the nearest available driver is on the way.",
    ],
    whyChooseUs: [
      "Richmond's low clearance ramps and the underpasses near the dykes that tend to flood call for a driver who knows which routes stay open after a heavy rain. We plan the approach so a stalled car under the Knight Street Bridge does not turn into a longer wait while a truck reroutes around standing water.",
      "For an airport rental or an EV, tell the dispatcher the make and drive type so the driver can plan the tow. Our dispatch runs 24/7, including statutory holidays, which matters when the highways to the ferries and the border are at their busiest.",
    ],
    commonScenarios: [
      {
        title: "Airport breakdowns near Sea Island",
        body: "Rental returns, rideshare cars, and travellers' vehicles give out near YVR and Bridgeport more than anywhere else in Richmond. We respond fast to the Sea Island connector and terminal roads and can deliver the vehicle wherever your trip plans require.",
      },
      {
        title: "Out of fuel on Highway 99 and No. 5 Road",
        body: "Drivers misjudging the run to the Massey tunnel or the ferry sometimes coast to empty on Highway 99 and the eastern Richmond roads. We bring gasoline or diesel directly to your location so you can reach the nearest station without a full tow.",
      },
      {
        title: "Steveston and Brighouse flat tires",
        body: "Tight parking and curbside scuffs around Steveston Village and the Brighouse core lead to plenty of flat tire calls. We fit your spare on the spot or, if there is none, run you to an open tire shop rather than leaving you parked overnight.",
      },
    ],
    nearbyCities: ["Vancouver", "Delta", "Burnaby", "Surrey"],
    neighborhoods: ["Steveston", "Brighouse", "Bridgeport", "Sea Island", "Shellmont", "East Richmond"],
    highways: ["Highway 99", "Knight Street Bridge", "No. 3 Road", "Steveston Highway"],
    localLandmarks: ["Richmond Centre", "Steveston Village", "YVR Airport", "Bridgeport SkyTrain Station"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Richmond?",
        a: "We dispatch the nearest available driver when you call and ask for your nearest cross street, such as No. 3 Road and Westminster Highway, on Richmond's flat street grid. Fast local dispatch; arrival times vary by location and road conditions.",
      },
      {
        q: "Do you tow near YVR Airport in Richmond?",
        a: "Yes. We serve Sea Island and the YVR Airport area. If your vehicle breaks down near the airport, call (778) 838-0014 and we send the nearest available driver.",
      },
      {
        q: "Can you help with a flat tire in Richmond?",
        a: "Yes. Our flat tire service puts on your spare at the roadside or tows you to the nearest tire shop. We cover all of Richmond including Steveston and Bridgeport.",
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
    headline: "Tow Truck White Rock: 24/7 Towing & Roadside Assistance",
    summary:
      "24/7 towing in White Rock with careful vehicle handling on the hill. We serve Uptown, East Beach, West Beach, and Five Corners with fast dispatch.",
    cardText: "The steep hill from Uptown and Five Corners down to the Marine Drive promenade and the pier.",
    intro: [
      "White Rock is small but steep, and the hill that drops from Uptown and Five Corners down to the Marine Drive promenade defines most of what we do here. Cars parked facing downhill along the beachfront on a frosty morning, manual transmissions that roll on the grade, and tourists unfamiliar with the tight switchback streets all keep our local drivers busy along East Beach and West Beach.",
      "The Highway 99 corridor and the nearby Peace Arch border crossing add a steady flow of traffic from out of town, and a stall in the border queue needs a careful, quick recovery so the lanes keep moving. Whether you are at the pier, on Marine Drive, or up near the Semiahmoo shops, the nearest cross street is all our dispatcher needs to send help.",
    ],
    whyChooseUs: [
      "The beachfront grade is genuinely tricky. A careless load can let a car roll toward the promenade, so our drivers chock, secure, and winch on the slope the right way every time. That care is the difference between a clean recovery and a second incident on one of the busiest pedestrian streets in the region.",
      "We handle the narrow one way beach streets without drama. Day or night, we dispatch the nearest available driver to help, 24/7.",
    ],
    commonScenarios: [
      {
        title: "Beachfront recoveries on Marine Drive",
        body: "Cars parked on the steep approach to the White Rock pier can slip a curb or lose grip on a frosty morning. We secure the vehicle against the grade and recover it without letting it drift toward the busy promenade below.",
      },
      {
        title: "Peace Arch and Highway 99 stalls",
        body: "A vehicle that dies in the border queue or on the Highway 99 approach needs to clear quickly so the lanes keep flowing. We reach the crossing area fast and load efficiently to keep both you and the traffic moving.",
      },
      {
        title: "Uptown and Five Corners battery calls",
        body: "Short trips and cold nights around Uptown and Five Corners leave a lot of weak batteries that will not turn over in the morning. We boost on the spot, and if the battery keeps going flat, have a shop look at it before one failed start becomes a daily ritual.",
      },
    ],
    nearbyCities: ["Surrey", "Langley", "Delta"],
    neighborhoods: ["Uptown", "East Beach", "West Beach", "Five Corners", "Ocean Park"],
    highways: ["Highway 99", "King George Boulevard", "16th Avenue", "Marine Drive"],
    localLandmarks: ["White Rock Pier", "White Rock Beach", "Peace Arch Border Crossing", "Semiahmoo Shopping Centre"],
    faq: [
      {
        q: "How fast can a tow truck reach me in White Rock?",
        a: "We dispatch the nearest available driver when you call and ask for your nearest cross street. The beachfront hill and Marine Drive are tight, so local knowledge matters for a careful recovery. Fast local dispatch; arrival times vary by location and road conditions.",
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
        a: "Yes. We provide 24/7 battery boost and jump start service across White Rock.",
      },
    ],
  },
  {
    slug: "vancouver",
    city: "Vancouver",
    headline: "Tow Truck Vancouver: 24/7 Emergency Towing Near You",
    summary:
      "Emergency towing and roadside service in Vancouver with immediate dispatch. We serve Downtown, Kitsilano, Mount Pleasant, East Vancouver, and surrounding areas.",
    cardText: "Downtown tower parkades, the one way West End streets, and the Broadway and Knight Street corridors.",
    intro: [
      "Vancouver is the toughest city we serve for access, and that is exactly where local experience pays off. Downtown towers wrap their parking into deep underground parkades, the West End is a maze of one way streets, and Kitsilano and Mount Pleasant mix permit parking blocks with bike lanes that narrow the working space around a stranded car. Our drivers thread a wheel lift truck through all of it without holding up a whole block of traffic.",
      "Across the bridges into East Vancouver and along Broadway and Knight Street, the calls shift toward older vehicles and longer commercial runs. Whether you are circling for the Granville Island entrance or stuck near Strathcona, the closest cross street and which floor of the parkade you are on are all our dispatcher needs to get a truck to you quickly.",
    ],
    whyChooseUs: [
      "Tight downtown parkades and one way West End streets slow down operators who do not know them. Our tow truck has a low clearance height, so it can reach most low-clearance parkades and parking garages where standard tow trucks can't fit, and our drivers look for a legal spot to set up on Broadway so a recovery does not become a traffic jam or a scraped roof.",
      "Many of the EVs and all wheel drive cars in these neighbourhoods should not be towed on their drive wheels, so tell the dispatcher the make and drive type when you call. We dispatch around the clock, through downtown gridlock and quiet 4 a.m. side streets alike.",
    ],
    commonScenarios: [
      {
        title: "Downtown parkade recoveries",
        body: "Underground tower parkades downtown and in the West End have low clearances that keep many tow trucks out. Our truck's low clearance height lets it reach most of them, manoeuvre out of the stall cleanly, and avoid the pillars and low beams. Tell the dispatcher the parkade level and any posted clearance sign.",
      },
      {
        title: "Bridge and Broadway corridor stalls",
        body: "Vehicles that die on the bridge approaches or along the Broadway and Knight Street corridors need a quick clear to keep traffic flowing. We reach these arterials fast and hook up without delay so the lane reopens and you get to your shop.",
      },
      {
        title: "Kitsilano and East Van lockouts",
        body: "Permit blocks and busy commercial strips in Kitsilano, Mount Pleasant, and East Vancouver generate constant lockout calls. We use careful entry techniques to open the vehicle right where it sits at the curb.",
      },
    ],
    nearbyCities: ["Burnaby", "Richmond", "Delta"],
    neighborhoods: ["Downtown", "Kitsilano", "Mount Pleasant", "East Vancouver", "West End", "Strathcona"],
    highways: ["Highway 1 (Trans-Canada)", "Granville Street", "Broadway", "Knight Street"],
    localLandmarks: ["Vancouver City Hall", "Granville Island", "BC Place", "Rogers Arena"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Vancouver?",
        a: "We dispatch the nearest available driver when you call and ask for your nearest cross street and parkade level, because downtown one way streets and low tower parkades take some planning to reach. Fast local dispatch; arrival times vary by location and road conditions.",
      },
      {
        q: "Do you tow in Downtown Vancouver?",
        a: "Yes. We serve Downtown Vancouver, the West End, Yaletown, and all central Vancouver neighbourhoods 24/7.",
      },
      {
        q: "Can you help with a lockout in Vancouver?",
        a: "Yes. Our lockout service uses careful entry techniques to open your vehicle across all Vancouver neighbourhoods.",
      },
      {
        q: "Do you offer roadside assistance in Vancouver without towing?",
        a: "Yes. Battery boost, flat tire change, fuel delivery, and lockout service are all available at your location in Vancouver.",
      },
    ],
  },
  {
    slug: "delta",
    city: "Delta",
    headline: "Tow Truck Delta: 24/7 Emergency Towing & Roadside Help",
    summary:
      "Fast tow truck dispatch across Delta including Ladner, Tsawwassen, and North Delta. We provide 24/7 emergency towing, battery boosts, lockouts, and flat tire help.",
    cardText: "Ladner village, the Tsawwassen ferry terminal on Highway 17, and the North Delta blocks along Scott Road.",
    intro: [
      "Delta is really three communities in one: the village feel of Ladner, the seaside grid of Tsawwassen out by the ferry terminal, and the busier North Delta blocks that blend into Surrey along Scott Road. Long highway distances tie them together, so a call in Tsawwassen can sit a fair drive from one in Annieville.",
      "Highway 17 and Deltaport Way carry heavy traffic to the BC Ferries terminal and the port, and a breakdown in the ferry queue needs to clear before it strands a whole sailing's worth of cars behind it. Whether you are near Tsawwassen Mills, the Ladner waterfront, or out toward Burns Bog, the nearest cross street gets the nearest available driver moving your way.",
    ],
    whyChooseUs: [
      "Missing a ferry because a stalled car blocked the lane is a real risk in Tsawwassen, so we treat calls near the terminal with the urgency they deserve and load quickly to keep the queue moving. That same sense of timing helps when a vehicle dies on the long, exposed stretches of Highway 17.",
      "With our light-duty wheel-lift truck, we cover Ladner, Tsawwassen, and North Delta 24/7, even with the long distances between them.",
    ],
    commonScenarios: [
      {
        title: "Ferry terminal queue breakdowns in Tsawwassen",
        body: "A car that dies waiting for a sailing can hold up dozens behind it. We reach the Tsawwassen terminal and Highway 17 approach quickly, clear the lane, and get you and the queue moving with minimal disruption.",
      },
      {
        title: "Scott Road and North Delta roadside help",
        body: "The busy Scott Road corridor along the Surrey boundary generates frequent flat tire, battery, and lockout calls. Most are quick fixes on the spot. We change the spare or boost the battery right there so you avoid a tow entirely.",
      },
      {
        title: "Ladner and rural Delta recoveries",
        body: "Soft farmland shoulders and ditch edges around Ladner and the Burns Bog roads catch drivers in wet weather. We winch the vehicle back onto solid ground, taking care not to add damage on the way out.",
      },
    ],
    nearbyCities: ["Surrey", "Richmond", "White Rock", "Burnaby"],
    neighborhoods: ["Ladner", "Tsawwassen", "North Delta", "Annieville", "Nordel"],
    highways: ["Highway 99", "Deltaport Way", "Highway 17", "Scott Road (120th Street)"],
    localLandmarks: ["Tsawwassen Ferry Terminal", "Tsawwassen Mills", "Ladner Village", "Burns Bog"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Delta?",
        a: "We dispatch the nearest available driver when you call and ask which community you are in (Ladner, Tsawwassen, or North Delta). Fast local dispatch; arrival times vary by location and road conditions.",
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
    headline: "Tow Truck Maple Ridge: 24/7 Towing & Roadside Assistance",
    summary:
      "24/7 tow truck service in Maple Ridge for breakdowns, lockouts, battery issues, and flat tires. We serve all Maple Ridge neighbourhoods including Albion, Haney, and Pitt Meadows with fast dispatch.",
    cardText: "Haney's suburban blocks out to the Silver Valley forest roads and the Golden Ears Provincial Park trailheads.",
    intro: [
      "Maple Ridge marks the rural edge of our coverage, where the suburban blocks of Haney give way to the forest roads of Silver Valley and the trailheads at Golden Ears Provincial Park. That mix means our drivers swing from a routine boost outside Haney Place Mall to a genuine backcountry recovery on a logging spur in the same shift.",
      "Lougheed Highway and Dewdney Trunk Road are the spine of the community, and the Golden Ears Way connection over to Langley adds a fast bridge corridor where breakdowns need a prompt clear. From Albion's newer subdivisions to the Pitt Meadows flats, telling our dispatcher the nearest landmark gets the nearest available driver rolling toward you without guesswork.",
    ],
    whyChooseUs: [
      "Recoveries near Golden Ears and the Silver Valley forest roads are not ordinary roadside calls. Soft ground, steep banks, and poor cell coverage all complicate them, and our winching service is meant for exactly that.",
      "Despite the rural distances, we dispatch to Maple Ridge and Pitt Meadows 24/7, and we treat a remote midnight call past Albion with the same urgency as a downtown Haney breakdown.",
    ],
    commonScenarios: [
      {
        title: "Backcountry recoveries near Golden Ears",
        body: "Drivers exploring the forest roads and trailheads around Golden Ears Provincial Park sometimes slide off soft shoulders or get stuck on rough spurs. We winch the vehicle back from these spots, taking care to protect its underside.",
      },
      {
        title: "Lougheed Highway and Golden Ears Way stalls",
        body: "Breakdowns on Lougheed Highway, Dewdney Trunk Road, and the Golden Ears Way bridge approach need a quick clear to keep traffic moving. We respond fast, get the vehicle on the wheel lift, and run you to a shop or home.",
      },
      {
        title: "Haney and Albion roadside fixes",
        body: "Flat tires, dead batteries, and lockouts around Haney and the newer Albion subdivisions are usually solved on the spot. We change the spare, jump the battery, or open the door right in your driveway so a tow is rarely needed.",
      },
    ],
    nearbyCities: ["Coquitlam", "Langley", "Burnaby"],
    neighborhoods: ["Haney", "Albion", "Thornhill", "Silver Valley", "Pitt Meadows"],
    highways: ["Lougheed Highway (Highway 7)", "Dewdney Trunk Road", "Golden Ears Way"],
    localLandmarks: ["Golden Ears Provincial Park", "Maple Ridge Town Centre", "Haney Place Mall"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Maple Ridge?",
        a: "We dispatch the nearest available driver when you call and ask for your nearest landmark, from Haney Place Mall to the Golden Ears Way approach, so the driver can find you on the rural roads. Fast local dispatch; arrival times vary by location and road conditions.",
      },
      {
        q: "Do you cover Pitt Meadows?",
        a: "Yes. We serve both Maple Ridge and Pitt Meadows with the same 24/7 dispatch.",
      },
      {
        q: "Can you tow on Lougheed Highway near Maple Ridge?",
        a: "Yes. We respond to breakdowns on Lougheed Highway (Highway 7) and Dewdney Trunk Road through Maple Ridge.",
      },
      {
        q: "Do you offer winching service in Maple Ridge?",
        a: "Yes. If your vehicle is stuck in a ditch or off the road near Maple Ridge, our winching and extraction team will pull it out safely.",
      },
    ],
  },
  {
    slug: "cloverdale",
    city: "Cloverdale",
    headline: "Tow Truck Cloverdale: 24/7 Towing & Roadside Assistance",
    summary:
      "Fast tow truck dispatch across Cloverdale for breakdowns, lockouts, battery boosts, and flat tires. We cover the historic town centre, the fairgrounds, Clayton Heights, and the Highway 10 corridor with quick local response.",
    cardText: "Heritage streets around 176th Street, the fairgrounds, Clayton Heights, and the Highway 10 and 15 truck routes.",
    intro: [
      "Cloverdale sits at the eastern edge of Surrey where the suburban grid opens toward Langley farmland, and that mix shapes our calls here. Around the historic town centre and the Cloverdale Fairgrounds we handle everyday parkade boosts and curbside lockouts, while the newer Clayton Heights subdivisions and the industrial blocks off the Highway 15 truck route bring more highway and work van calls.",
      "The Cloverdale Rodeo and the fairgrounds events pack the area on peak weekends, and a dead battery or flat in an overflow lot is a common call when the crowds arrive. Whether you are near the Museum of Surrey, the athletic park, or out toward the 64th Avenue industrial strip, give our dispatcher the nearest cross street and the nearest available driver heads straight to you.",
    ],
    whyChooseUs: [
      "Cloverdale drivers know the difference between the tight heritage streets around 176th and the fast traffic on the Highway 10 and 15 corridors, so we set up safely whether you are curbside downtown or stranded beside a truck route. That local knowledge matters most during Rodeo weekend or rush hour when the usual routes are jammed.",
      "Our light-duty wheel-lift truck handles cars, SUVs and light trucks, including the light work vans that come off the industrial blocks, and we answer 3 a.m. calls the same way we handle a Saturday afternoon.",
    ],
    commonScenarios: [
      {
        title: "Fairgrounds and Rodeo weekend battery calls",
        body: "Overflow parking around the Cloverdale Fairgrounds fills fast on event weekends, and cars left with lights or accessories on come back to a dead battery. We bring the boost pack right to your stall, get the engine running, and get you out ahead of the traffic.",
      },
      {
        title: "Highway 10 and Highway 15 breakdowns",
        body: "The Highway 10 and Highway 15 (176th Street) corridors carry heavy commuter and truck traffic through Cloverdale. We reach the shoulder safely, shield your vehicle from passing lanes, and hook up fast so you clear the live route quickly.",
      },
      {
        title: "Clayton Heights lockouts and flats",
        body: "The newer Clayton Heights townhome blocks generate frequent lockout and flat tire calls. Most are fixed quickly on the spot. We open the vehicle with careful entry techniques or swap the spare right in your strata lot so a tow is rarely needed.",
      },
    ],
    nearbyCities: ["Surrey", "Langley", "White Rock", "Delta"],
    neighborhoods: ["Cloverdale Town Centre", "Clayton Heights", "Cloverdale East", "Hillcrest", "West Cloverdale"],
    highways: ["Highway 10", "Highway 15 (176th Street)", "Fraser Highway", "64th Avenue"],
    localLandmarks: ["Cloverdale Fairgrounds", "Museum of Surrey", "Cloverdale Athletic Park", "Cloverdale Rodeo"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Cloverdale?",
        a: "We dispatch the nearest available driver when you call (778) 838-0014 and ask for your nearest cross street, from the fairgrounds to Clayton Heights to the Highway 10 corridor. Fast local dispatch; arrival times vary by location and road conditions.",
      },
      {
        q: "Do you cover the Cloverdale Fairgrounds and Clayton Heights?",
        a: "Yes. We serve all of Cloverdale including the town centre, the fairgrounds, Clayton Heights, and the surrounding industrial areas.",
      },
      {
        q: "Can you tow on Highway 10 and Highway 15 near Cloverdale?",
        a: "Yes. We respond to breakdowns on Highway 10, Highway 15 (176th Street), and Fraser Highway through Cloverdale. Call with your nearest cross street.",
      },
      {
        q: "Do you offer battery boost and lockout service in Cloverdale?",
        a: "Yes. Battery boost, jump start, lockout, flat tire, and fuel delivery are all available 24/7 across Cloverdale, usually as a quick fix on the spot.",
      },
    ],
  },
  {
    slug: "south-surrey",
    city: "South Surrey",
    headline: "Tow Truck South Surrey: 24/7 Towing & Roadside Assistance",
    summary:
      "24/7 tow truck service across South Surrey including Grandview Heights, Morgan Crossing, Ocean Park, and the Highway 99 corridor. Fast local dispatch for breakdowns, battery boosts, lockouts, and flat tires.",
    cardText: "From Grandview Corners and Morgan Crossing down to the Ocean Park bluffs, Crescent Beach, and the 16th Avenue run.",
    intro: [
      "South Surrey stretches from the Grandview Corners shopping district down to the Ocean Park bluffs and the White Rock border, laced by the fast Highway 99 corridor and the long east to west run of 16th Avenue. The area's newer estate neighbourhoods and busy retail centres at Morgan Crossing generate a steady mix of parkade boosts, lockouts, and highway breakdowns.",
      "Commuters heading to the Peace Arch border crossing or south on Highway 99 make up a large share of our calls, and a stall on that corridor needs a prompt, safe clearance. Whether you are at Grandview Corners, near the South Surrey Athletic Park, or on a quiet Ocean Park side street, the nearest intersection is all our dispatcher needs to send the nearest available driver.",
    ],
    whyChooseUs: [
      "South Surrey's mix of fast Highway 99 traffic and quiet residential bluffs calls for a driver who can work both safely, shielding a stalled car on a live shoulder one minute and easing a wheel lift truck down a tight Ocean Park lane the next. We come equipped for either.",
      "If you drive one of the EVs or all wheel drive vehicles common in the area's newer neighbourhoods, mention it when you call so the driver can plan the tow. We dispatch around the clock, including statutory holidays.",
    ],
    commonScenarios: [
      {
        title: "Highway 99 and Peace Arch corridor stalls",
        body: "A vehicle that dies on Highway 99 or in the border approach needs to clear before it backs up traffic. We reach the corridor fast, position the truck to protect you from moving lanes, and load efficiently so both you and the queue keep moving.",
      },
      {
        title: "Grandview Corners and Morgan Crossing lockouts",
        body: "The busy retail lots at Grandview Corners and Morgan Crossing are frequent spots for lockout and dead battery calls. We open the vehicle with careful entry techniques, or boost the battery on the spot, so a quick shopping trip does not turn into a long wait.",
      },
      {
        title: "Recoveries on the Ocean Park bluffs",
        body: "The sloped, leafy streets around Ocean Park can catch a car on a frosty morning or when wet leaves cover the grade. We secure and recover the vehicle carefully so it never drifts on the slope during loading.",
      },
    ],
    nearbyCities: ["White Rock", "Surrey", "Delta", "Langley"],
    neighborhoods: ["Grandview Heights", "Morgan Crossing", "Ocean Park", "Crescent Beach", "Sunnyside", "Elgin"],
    highways: ["Highway 99", "16th Avenue", "King George Boulevard", "32nd Avenue"],
    localLandmarks: ["Grandview Corners", "Morgan Crossing", "South Surrey Athletic Park", "Peace Arch Border Crossing"],
    faq: [
      {
        q: "How fast can a tow truck reach me in South Surrey?",
        a: "We dispatch the nearest available driver when you call and ask for your nearest intersection, from Grandview Corners and Morgan Crossing to Ocean Park and the Highway 99 corridor. Fast local dispatch; arrival times vary by location and road conditions.",
      },
      {
        q: "Do you cover Grandview Heights, Morgan Crossing, and Ocean Park?",
        a: "Yes. We serve all of South Surrey including Grandview Heights, Morgan Crossing, Ocean Park, Crescent Beach, and the Highway 99 corridor.",
      },
      {
        q: "Can you tow near the Peace Arch Border Crossing?",
        a: "Yes. We respond to breakdowns near the Peace Arch crossing and along Highway 99 through South Surrey and White Rock.",
      },
      {
        q: "Do you offer roadside assistance in South Surrey without towing?",
        a: "Yes. Battery boost, jump start, flat tire change, fuel delivery, and lockout service are all available at your location across South Surrey.",
      },
    ],
  },
  {
    slug: "aldergrove",
    city: "Aldergrove",
    headline: "Tow Truck Aldergrove: 24/7 Towing & Roadside Assistance",
    summary:
      "24/7 towing and roadside help across Aldergrove and east Langley Township, from the Fraser Highway town centre to the rural section roads near the Abbotsford border. Fast dispatch for breakdowns, winching, battery boosts, and lockouts.",
    cardText: "The Fraser Highway town centre and the rural section roads toward the Highway 13 (264th Street) connector and the Abbotsford boundary.",
    intro: [
      "Aldergrove marks the rural eastern edge of Langley Township, where the Fraser Highway town centre gives way to farm roads, acreages, and the long straight stretches near the Abbotsford boundary. That setting means our work here swings from a routine boost outside the Aldergrove shopping plaza to a genuine ditch recovery on a soft rural shoulder in the same shift.",
      "The Highway 13 (264th Street) connector down to the Aldergrove border crossing and the busy Fraser Highway corridor see plenty of breakdowns, especially in wet weather when the shoulders of farm roads turn soft. From the Aldergrove Regional Park trailheads to the industrial blocks along 56th Avenue, telling our dispatcher the nearest landmark gets the nearest available driver rolling toward you without guesswork.",
    ],
    whyChooseUs: [
      "Rural Aldergrove roads are long, lightly lit, and easy to describe vaguely, which is exactly how a stranded driver ends up waiting far too long. Our dispatchers ask for the nearest cross street or a landmark like the Aldergrove Regional Park or the plaza in the town centre so the nearest available driver heads straight to you instead of hunting a rural route number in the dark.",
      "Our winching service is meant for the ditch and soft shoulder recoveries these farm roads produce, and we dispatch 24/7, even out on the rural roads.",
    ],
    commonScenarios: [
      {
        title: "Rural ditch and soft shoulder recoveries",
        body: "The shoulders of Aldergrove's farm roads turn soft after rain, and a wheel off the edge can leave a vehicle stuck fast. We winch it back onto firm ground using proper anchor points, taking care to protect the bumper and undercarriage on the way out.",
      },
      {
        title: "Fraser Highway and 264th Street breakdowns",
        body: "Commuter and truck traffic on Fraser Highway and the Highway 13 (264th Street) connector to the border makes for common stall points. We reach the shoulder, protect you from passing lanes, and lift the vehicle onto the wheel lift so you clear the route quickly.",
      },
      {
        title: "Town centre boosts and lockouts",
        body: "Around the Aldergrove plaza and the 56th Avenue shops, dead batteries and lockouts are usually solved on the spot. We boost the battery or open the vehicle with careful entry techniques so most of these calls never need a tow.",
      },
    ],
    nearbyCities: ["Langley", "Surrey", "Maple Ridge", "Cloverdale"],
    neighborhoods: ["Aldergrove Town Centre", "Shortreed", "Parkside", "Bertrand Creek", "Otter District"],
    highways: ["Fraser Highway", "Highway 13 (264th Street)", "56th Avenue", "Highway 1 (Trans-Canada)"],
    localLandmarks: ["Aldergrove Regional Park", "Aldergrove Town Centre", "Greater Vancouver Zoo"],
    faq: [
      {
        q: "How fast can a tow truck reach me in Aldergrove?",
        a: "We dispatch the nearest available driver when you call and ask for your nearest cross street or landmark. The rural roads are long and lightly lit, so a precise location helps the driver find you in the dark. Fast local dispatch; arrival times vary by location and road conditions.",
      },
      {
        q: "Do you handle rural and off road recoveries near Aldergrove?",
        a: "Yes. Our winching service handles ditch, mud, and soft shoulder recoveries on Aldergrove's farm and rural roads, then we check whether the vehicle is safe to drive or needs a tow.",
      },
      {
        q: "Can you tow on Fraser Highway and near the Aldergrove border?",
        a: "Yes. We respond to breakdowns on Fraser Highway, Highway 13 (264th Street), and the routes toward the Aldergrove border crossing.",
      },
      {
        q: "Do you offer battery boost and lockout service in Aldergrove?",
        a: "Yes. Battery boost, jump start, lockout, flat tire, and fuel delivery are all available 24/7 across Aldergrove and east Langley Township.",
      },
    ],
  },
];

/**
 * Service-area priority (highest first). This is the SINGLE place that controls
 * the order cities appear in: the /locations grid, the footer "Service Areas"
 * strip, the ItemList schema positions (home + /locations), and the sitemap
 * ordering/priority. Re-rank cities by editing THIS list only — the data
 * objects above can stay in any order. Any slug not listed here sorts last.
 */
const AREA_PRIORITY: string[] = [
  "cloverdale",
  "langley",
  "surrey",
  "south-surrey",
  "white-rock",
  "maple-ridge",
  "burnaby",
  "coquitlam",
  "aldergrove",
  "delta",
  "richmond",
  "vancouver",
];

const areaRank = (slug: string): number => {
  const i = AREA_PRIORITY.indexOf(slug);
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
};

/**
 * Public, priority-ordered list of every service area (ordered by AREA_PRIORITY).
 * Consumed by the locations grid, footer, ItemList schema, and sitemap.
 */
export const serviceAreas: ServiceArea[] = [...serviceAreaData].sort(
  (a, b) => areaRank(a.slug) - areaRank(b.slug),
);

export function getServiceAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

/**
 * Convert a city name into a location-route slug.
 * Mirrors the slug format used for the `/locations/[city]` routes
 * (lowercase, trimmed, spaces collapsed to hyphens).
 */
export function slugifyCity(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

/** Set of every real `/locations/[city]` slug. */
export const serviceAreaSlugs: Set<string> = new Set(serviceAreas.map((area) => area.slug));

/** True only when `slug` resolves to a real `/locations/[slug]` route. */
export function isServiceAreaSlug(slug: string): boolean {
  return serviceAreaSlugs.has(slug);
}

/**
 * Compact single-node areaServed for Service schema.
 * Use this on individual service pages instead of the full 13-city expansion —
 * the detailed per-city list lives on the global LocalBusiness (layout.tsx).
 * This cuts ~1.5 KB of JSON-LD payload per service page (SEMrush Issue #2).
 */
export const serviceAreaCompact = {
  "@type": "AdministrativeArea" as const,
  name: "Lower Mainland",
  containedInPlace: { "@type": "AdministrativeArea" as const, name: "British Columbia" },
};


// Structured areaServed list (all served cities) for Service JSON-LD, matching
// the global LocalBusiness areaServed shape. Service pages use this so every
// service advertises the same, complete coverage area instead of an arbitrary
// 4–6 city subset.
export const areaServedSchema = serviceAreas.map((a) => ({
  "@type": "City" as const,
  name: a.city,
  containedInPlace: { "@type": "AdministrativeArea" as const, name: "British Columbia" },
}));

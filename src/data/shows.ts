export type Show = {
  id: string;
  artist: string;
  venue: string;
  city: string;
  date: string;
  lat: number;
  lng: number;
  genres: string[];
  priceFrom: number;
  source: "calendar" | "gmail" | "suggested";
  ticketUrl: string;
};

/** Sample listings — labeled in UI when live Gmail/Calendar aren't wired in-app. */
export const SAMPLE_SHOWS: Show[] = [
  {
    id: "s1",
    artist: "Dream Theater",
    venue: "Terminal 5",
    city: "New York, NY",
    date: "2026-12-04T20:00:00-05:00",
    lat: 40.7713,
    lng: -73.9929,
    genres: ["prog-metal", "prog-rock"],
    priceFrom: 79,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s2",
    artist: "Opeth",
    venue: "Brooklyn Steel",
    city: "Brooklyn, NY",
    date: "2026-12-12T19:30:00-05:00",
    lat: 40.7195,
    lng: -73.9333,
    genres: ["prog-metal", "death-metal"],
    priceFrom: 65,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s3",
    artist: "King Gizzard",
    venue: "The Anthem",
    city: "Washington, DC",
    date: "2026-12-18T20:00:00-05:00",
    lat: 38.8801,
    lng: -77.026,
    genres: ["psychedelic-rock", "prog-rock"],
    priceFrom: 55,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s4",
    artist: "Spiritbox",
    venue: "House of Blues",
    city: "Boston, MA",
    date: "2026-11-30T19:00:00-05:00",
    lat: 42.3519,
    lng: -71.047,
    genres: ["metalcore", "alt-metal"],
    priceFrom: 49,
    source: "gmail",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s5",
    artist: "Tame Impala",
    venue: "Madison Square Garden",
    city: "New York, NY",
    date: "2027-01-15T20:00:00-05:00",
    lat: 40.7505,
    lng: -73.9934,
    genres: ["psychedelic-rock", "indie"],
    priceFrom: 120,
    source: "calendar",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s6",
    artist: "Turnstile",
    venue: "The Fillmore",
    city: "Philadelphia, PA",
    date: "2026-12-08T19:00:00-05:00",
    lat: 39.9656,
    lng: -75.158,
    genres: ["hardcore", "alt-rock"],
    priceFrom: 45,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s7",
    artist: "Haken",
    venue: "Warsaw",
    city: "Brooklyn, NY",
    date: "2027-02-02T20:00:00-05:00",
    lat: 40.7282,
    lng: -73.957,
    genres: ["prog-metal"],
    priceFrom: 40,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s8",
    artist: "Depeche Mode",
    venue: "Barclays Center",
    city: "Brooklyn, NY",
    date: "2027-03-10T20:00:00-05:00",
    lat: 40.6826,
    lng: -73.9754,
    genres: ["80s-pop", "synthwave", "electronic"],
    priceFrom: 95,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s9",
    artist: "Nujabes Tribute Night",
    venue: "Baby's All Right",
    city: "Brooklyn, NY",
    date: "2026-12-20T21:00:00-05:00",
    lat: 40.7115,
    lng: -73.963,
    genres: ["lo-fi", "hip-hop", "jazz"],
    priceFrom: 25,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s10",
    artist: "Iron Maiden",
    venue: "MetLife Stadium",
    city: "East Rutherford, NJ",
    date: "2027-04-22T19:30:00-04:00",
    lat: 40.8128,
    lng: -74.0742,
    genres: ["metal", "nwobhm"],
    priceFrom: 89,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s11",
    artist: "Fontaines D.C.",
    venue: "Knockdown Center",
    city: "Queens, NY",
    date: "2026-12-28T20:00:00-05:00",
    lat: 40.7135,
    lng: -73.921,
    genres: ["post-punk", "indie"],
    priceFrom: 50,
    source: "gmail",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s12",
    artist: "Animals as Leaders",
    venue: "Irving Plaza",
    city: "New York, NY",
    date: "2027-01-28T19:00:00-05:00",
    lat: 40.7347,
    lng: -73.9883,
    genres: ["prog-metal", "djent"],
    priceFrom: 42,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s13",
    artist: "Yes",
    venue: "Beacon Theatre",
    city: "New York, NY",
    date: "2027-05-05T20:00:00-04:00",
    lat: 40.7805,
    lng: -73.981,
    genres: ["prog-rock"],
    priceFrom: 75,
    source: "calendar",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s14",
    artist: "Lorna Shore",
    venue: "The Wellmont Theater",
    city: "Montclair, NJ",
    date: "2026-12-15T19:00:00-05:00",
    lat: 40.811,
    lng: -74.215,
    genres: ["deathcore", "death-metal"],
    priceFrom: 38,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
  {
    id: "s15",
    artist: "Khruangbin",
    venue: "Forest Hills Stadium",
    city: "Queens, NY",
    date: "2027-06-12T19:00:00-04:00",
    lat: 40.7195,
    lng: -73.845,
    genres: ["psychedelic-rock", "funk", "lo-fi"],
    priceFrom: 70,
    source: "suggested",
    ticketUrl: "https://www.ticketmaster.com",
  },
];

export const LOCATIONS = [
  { id: "nyc", label: "New York, NY", lat: 40.7128, lng: -74.006 },
  { id: "la", label: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
  { id: "chicago", label: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
  { id: "austin", label: "Austin, TX", lat: 30.2672, lng: -97.7431 },
  { id: "seattle", label: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
  { id: "miami", label: "Miami, FL", lat: 25.7617, lng: -80.1918 },
  { id: "london", label: "London, UK", lat: 51.5074, lng: -0.1278 },
  { id: "berlin", label: "Berlin, DE", lat: 52.52, lng: 13.405 },
];

export function haversineMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

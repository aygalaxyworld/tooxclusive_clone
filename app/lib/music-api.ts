export type ExternalRelease = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  link: string;
  releaseDate: string;
  category:
    | "Afrobeats"
    | "Hip-hop"
    | "Gospel"
    | "R&B"
    | "Mixtape"
    | "Lyrics"
    | "Trending";

  // Optional fields for extended functionality
  lyricsUrl?: string;
  mixtapeUrl?: string;
  trendingRank?: number;
  description?: string;
};

type ItunesResult = {
  trackId?: number;
  collectionId?: number;
  trackName?: string;
  collectionName?: string;
  artistName?: string;
  artworkUrl100?: string;
  trackViewUrl?: string;
  collectionViewUrl?: string;
  releaseDate?: string;
};

type ItunesResponse = {
  results: ItunesResult[];
};

// Normalize artwork size
function normalizeArtwork(url?: string) {
  if (!url) return "/placeholder.jpg";
  return url.replace("100x100bb", "600x600bb");
}

// Convert iTunes result to ExternalRelease
function toRelease(
  item: ItunesResult,
  category: ExternalRelease["category"]
): ExternalRelease | null {
  const idValue = item.trackId ?? item.collectionId;
  const title = item.trackName ?? item.collectionName;
  const link = item.trackViewUrl ?? item.collectionViewUrl;

  if (!idValue || !title || !item.artistName || !link) {
    return null;
  }

  return {
    id: String(idValue),
    title,
    artist: item.artistName,
    artwork: normalizeArtwork(item.artworkUrl100),
    link,
    releaseDate: item.releaseDate ?? new Date().toISOString(),
    category,
  };
}

// Fallback release if API returns nothing
function fallbackRelease(
  category: ExternalRelease["category"]
): ExternalRelease {
  return {
    id: "fallback-" + category,
    title: "No new releases found",
    artist: "Unknown",
    artwork: "/placeholder.jpg",
    link: "https://music.apple.com",
    releaseDate: new Date().toISOString(),
    category,
    description: "Fallback content when API has no data",
  };
}

// Generic fetcher by term
async function fetchByTerm(
  term: string,
  category: ExternalRelease["category"]
): Promise<ExternalRelease[]> {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    term
  )}&entity=song&limit=10`;
  const response = await fetch(url, { next: { revalidate: 1800 } });

  if (!response.ok) {
    return [fallbackRelease(category)];
  }

  const json = (await response.json()) as ItunesResponse;
  const results = json.results
    .map((item) => toRelease(item, category))
    .filter((item): item is ExternalRelease => item !== null);

  return results.length ? results : [fallbackRelease(category)];
}

// Editorial overrides (manual picks)
export const editorialOverrides: ExternalRelease[] = [
  {
    id: "davido-special",
    title: "Special Album",
    artist: "Davido",
    artwork: "/davido.jpg",
    link: "https://exclusive.com/davido",
    releaseDate: "2025-01-01",
    category: "Afrobeats",
    description: "Editorial pick: Davido's special album",
  },
];

// Fetch latest releases across multiple categories
export async function getLatestReleases(): Promise<ExternalRelease[]> {
  const [afrobeats, hiphop, gospel, rnb, mixtapes, lyrics, trending] =
    await Promise.all([
      fetchByTerm("afrobeats new release", "Afrobeats"),
      fetchByTerm("hip hop new release", "Hip-hop"),
      fetchByTerm("gospel new release", "Gospel"),
      fetchByTerm("rnb new release", "R&B"),
      fetchByTerm("mixtape", "Mixtape"),
      fetchByTerm("lyrics", "Lyrics"),
      fetchByTerm("top charts", "Trending"),
    ]);

  // Add trending rank
  const trendingWithRank = trending.map((r, idx) => ({
    ...r,
    trendingRank: idx + 1,
  }));

  const combined = [
    ...editorialOverrides,
    ...afrobeats,
    ...hiphop,
    ...gospel,
    ...rnb,
    ...mixtapes,
    ...lyrics,
    ...trendingWithRank,
  ];

  return combined
    .sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    )
    .slice(0, 30); // limit to 30 for homepage
}

export type ExternalRelease = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  link: string;
  releaseDate: string;
  category: "Afrobeats" | "Hip-hop";
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

function normalizeArtwork(url?: string) {
  if (!url) return "/LOGO1.png";
  return url.replace("100x100bb", "600x600bb");
}

function toRelease(item: ItunesResult, category: ExternalRelease["category"]): ExternalRelease | null {
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

async function fetchByTerm(term: string, category: ExternalRelease["category"]): Promise<ExternalRelease[]> {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=10`;
  const response = await fetch(url, { next: { revalidate: 1800 } });

  if (!response.ok) {
    return [];
  }

  const json = (await response.json()) as ItunesResponse;
  return json.results
    .map((item) => toRelease(item, category))
    .filter((item): item is ExternalRelease => item !== null);
}

export async function getLatestReleases(): Promise<ExternalRelease[]> {
  const [afrobeats, hiphop] = await Promise.all([
    fetchByTerm("afrobeats new release", "Afrobeats"),
    fetchByTerm("hip hop new release", "Hip-hop"),
  ]);

  return [...afrobeats, ...hiphop]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 12);
}

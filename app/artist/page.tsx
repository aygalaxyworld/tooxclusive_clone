import ReleaseGridPage from "@/app/components/ReleaseGridPage";

export const metadata = {
  title: "Artistes | Tooxclusive",
};

export default async function ArtistPage() {
  return (
    <ReleaseGridPage
      title="Featured Artistes"
      description="Discover top and emerging artistes across Afrobeats, Hip-hop, and R&B with a continuously updated feed from the music API."
      categories={["Afrobeats", "Hip-hop", "R&B"]}
      ctaLabel="View artiste release"
    />
  );
}

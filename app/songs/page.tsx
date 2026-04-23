import ReleaseGridPage from "@/app/components/ReleaseGridPage";

export const metadata = {
  title: "Songs | Tooxclusive",
};

export default async function SongsPage() {
  return (
    <ReleaseGridPage
      title="Latest Songs"
      description="Browse newly released songs and charting tracks across the platform."
      categories={["Afrobeats", "Hip-hop", "R&B", "Gospel", "Trending"]}
      ctaLabel="Play song"
    />
  );
}

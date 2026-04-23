import ReleaseGridPage from "@/app/components/ReleaseGridPage";

export const metadata = {
  title: "Features | Tooxclusive",
};

export default async function FeaturesPage() {
  return (
    <ReleaseGridPage
      title="Editorial Features"
      description="Hand-picked features from our editors showcasing major drops, unique sounds, and standout releases."
      categories={["Afrobeats", "Mixtape", "Lyrics"]}
      ctaLabel="Explore feature"
    />
  );
}

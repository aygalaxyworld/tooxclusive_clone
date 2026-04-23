import ReleaseGridPage from "@/app/components/ReleaseGridPage";

export const metadata = {
  title: "News | Tooxclusive",
};

export default async function NewsPage() {
  return (
    <ReleaseGridPage
      title="Music News"
      description="Fresh updates and notable release moments sourced dynamically from the latest music feed."
      categories={["Trending", "Afrobeats", "Hip-hop"]}
      ctaLabel="Read update"
    />
  );
}

import ReleaseGridPage from "@/app/components/ReleaseGridPage";

export const metadata = {
  title: "Reviews | Tooxclusive",
};

export default async function ReviewsPage() {
  return (
    <ReleaseGridPage
      title="Song Reviews & Reactions"
      description="Editorial and audience picks focused on trending tracks, lyrics deep-dives, and mixtape highlights."
      categories={["Trending", "Lyrics", "Mixtape"]}
      ctaLabel="Read review context"
    />
  );
}

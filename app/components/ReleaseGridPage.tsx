import Link from "next/link";
import Image from "next/image";
import { ExternalRelease, getLatestReleases } from "@/app/lib/music-api";

type ReleaseGridPageProps = {
  title: string;
  description: string;
  categories: ExternalRelease["category"][];
  ctaLabel?: string;
};

export default async function ReleaseGridPage({
  title,
  description,
  categories,
  ctaLabel = "Open on Apple Music",
}: ReleaseGridPageProps) {
  const releases = await getLatestReleases();
  const filtered = releases.filter((release) => categories.includes(release.category));

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-slate-300 mt-3 max-w-3xl">{description}</p>
          <p className="text-xs text-slate-400 mt-3">Dynamic feed powered by the live releases API.</p>
        </header>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((release) => (
            <article
              key={`${release.category}-${release.id}`}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-black/20"
            >
              <div className="relative h-48">
                <Image
                  src={release.artwork}
                  alt={release.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <p className="text-xs uppercase tracking-wide text-fuchsia-300 mt-4">{release.category}</p>
              <h2 className="text-lg font-semibold mt-1">{release.title}</h2>
              <p className="text-sm text-slate-300">{release.artist}</p>
              <p className="text-xs text-slate-400 mt-2">
                {new Date(release.releaseDate).toLocaleDateString()}
              </p>
              <Link
                href={release.link}
                className="inline-block mt-4 rounded-lg bg-fuchsia-600 px-3 py-2 text-sm font-medium hover:bg-fuchsia-500 transition"
              >
                {ctaLabel}
              </Link>
            </article>
          ))}
        </section>

        {filtered.length === 0 && (
          <p className="text-slate-300 text-center py-16">No content available yet for this section.</p>
        )}
      </div>
    </main>
  );
}

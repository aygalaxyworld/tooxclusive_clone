import React from "react";
import Image from "next/image";
import Link from "next/link";
import Card from "./components/Card";
import MediumCard from "./components/MediumCard";
import DescriptiveCard from "./components/DescriptiveCard";
import BulletLink from "./components/BulletLink";
import CalloutCard from "./components/CalloutCard";
import { getLatestReleases } from "./lib/music-api";

export default async function Home() {
  const releases = await getLatestReleases();

  const trending = releases.filter((r) => r.category === "Trending");
  const spotlight = releases.find((r) => r.category === "Afrobeats");
  const mixtapes = releases.filter((r) => r.category === "Mixtape");
  const lyrics = releases.filter((r) => r.category === "Lyrics");
  const latest = releases.slice(0, 9);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#121212] via-[#1E1E2F] to-[#2A2A3D] text-white font-poppins">
      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={spotlight?.artwork ?? "/placeholder.jpg"}
          alt={spotlight?.title ?? "Featured Artist"}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            🔥 Hot New Release
          </h1>
          <h2 className="text-xl md:text-2xl font-medium mb-6">
            {spotlight?.artist} — {spotlight?.title}
          </h2>
          <Link
            href={spotlight?.link ?? "#"}
            className="bg-gradient-to-r from-[#FF3CAC] to-[#784BA0] px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            ▶ Play Now
          </Link>
        </div>
      </section>

      {/* Trending Carousel */}
      <section className="px-6 py-10">
        <h3 className="text-2xl font-bold mb-6">🔥 Trending Now</h3>
        <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
          {trending.slice(0, 10).map((release, idx) => (
            <div
              key={release.id}
              className="min-w-[200px] bg-white/10 backdrop-blur-md rounded-xl p-4 hover:scale-105 transition"
            >
              <Image
                src={release.artwork}
                alt={release.title}
                width={200}
                height={200}
                className="rounded-lg mb-3"
              />
              <h4 className="font-semibold text-sm">
                #{release.trendingRank} {release.title}
              </h4>
              <p className="text-xs text-gray-300">{release.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spotlight Artist */}
      <section className="px-6 py-10 bg-gradient-to-r from-[#6C63FF]/20 to-[#FF3CAC]/20 rounded-2xl mx-3 my-5 backdrop-blur-md">
        <h3 className="text-2xl font-bold mb-6">🌟 Spotlight Artist</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image
            src={spotlight?.artwork ?? "/placeholder.jpg"}
            alt={spotlight?.artist ?? "Artist"}
            width={250}
            height={250}
            className="rounded-full shadow-lg"
          />
          <div>
            <h4 className="text-3xl font-bold mb-3">{spotlight?.artist}</h4>
            <p className="text-gray-300 mb-4">
              {spotlight?.description ??
                "Discover the latest track from this Afrobeats sensation."}
            </p>
            <Link
              href={spotlight?.link ?? "#"}
              className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF] px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              🎧 Listen
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Mixtapes */}
      <section className="px-6 py-10">
        <h3 className="text-2xl font-bold mb-6">🎧 Latest Mixtapes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mixtapes.slice(0, 3).map((release) => (
            <DescriptiveCard
              key={release.id}
              href={release.mixtapeUrl ?? release.link}
              src={release.artwork}
              alt={release.title}
              rating="Mixtape"
              title={`${release.artist} — ${release.title}`}
              date={new Date(release.releaseDate).toLocaleDateString()}
            />
          ))}
        </div>
      </section>

      {/* Lyrics Spotlight */}
      <section className="px-6 py-10 bg-gradient-to-r from-[#FF3CAC]/20 to-[#784BA0]/20 rounded-2xl mx-3 my-5 backdrop-blur-md">
        <h3 className="text-2xl font-bold mb-6">🎤 Lyrics Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lyrics.slice(0, 2).map((release) => (
            <div
              key={release.id}
              className="bg-white/10 rounded-xl p-6 hover:scale-105 transition"
            >
              <h4 className="font-semibold text-lg mb-2">
                {release.artist} — {release.title}
              </h4>
              <p className="text-sm text-gray-300 mb-3">
                {release.description ??
                  "Lyric snippet goes here... Read full lyrics for more."}
              </p>
              <Link
                href={release.lyricsUrl ?? release.link}
                className="text-[#FF3CAC] font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Releases */}
      <section className="px-6 py-10">
        <h3 className="text-2xl font-bold mb-6">⭐ Latest Releases</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((release) => (
            <CalloutCard
              key={release.id}
              imageUrl={release.artwork}
              imageAlt={release.title}
              category={release.category}
              title={`${release.artist} — ${release.title}`}
              author="Music API"
              authorUrl="https://music.apple.com"
              postUrl={release.link}
              date={new Date(release.releaseDate).toLocaleDateString()}
            />
          ))}
        </div>
      </section>

      {/* Sticky Music Player */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src={spotlight?.artwork ?? "/placeholder.jpg"}
            alt="Current Track"
            width={50}
            height={50}
            className="rounded-md"
          />
          <div>
            <h4 className="font-semibold text-sm">{spotlight?.title}</h4>
            <p className="text-xs text-gray-400">{spotlight?.artist}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-[#FF3CAC]">⏮</button>
          <button className="bg-[#FF3CAC] text-white rounded-full px-4 py-2">
            ▶
          </button>
          <button className="text-white hover:text-[#FF3CAC]">⏭</button>
        </div>
      </footer>
    </main>
  );
}

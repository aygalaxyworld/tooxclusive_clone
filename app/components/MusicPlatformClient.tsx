"use client";

import { useEffect, useMemo, useState } from "react";

type MusicPost = {
  id: string;
  title: string;
  artist: string;
  category: "Afrobeats" | "Hip-hop";
  summary: string;
  likes: number;
  saves: number;
  spotifyUrl?: string;
  createdAt: string;
};

type CategoryFilter = "All" | "Afrobeats" | "Hip-hop";

export default function MusicPlatformClient() {
  const [posts, setPosts] = useState<MusicPost[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category !== "All") params.set("category", category);

      const response = await fetch(`/api/music?${params.toString()}`);
      const result = (await response.json()) as { data: MusicPost[] };
      setPosts(result.data);
      setLoading(false);
    };

    void loadPosts();
  }, [search, category]);

  const stats = useMemo(() => {
    return {
      songs: posts.length,
      likes: posts.reduce((sum, post) => sum + post.likes, 0),
      saves: posts.reduce((sum, post) => sum + post.saves, 0),
    };
  }, [posts]);

  const reactToPost = async (id: string, reaction: "like" | "save") => {
    await fetch(`/api/music/${id}/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reaction }),
    });

    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: reaction === "like" ? post.likes + 1 : post.likes,
              saves: reaction === "save" ? post.saves + 1 : post.saves,
            }
          : post,
      ),
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-2xl bg-zinc-900 p-8 text-white">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-300">Music Platform UI System</p>
        <h1 className="mt-2 text-3xl font-bold">Music Content Platform</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Designed and developed a responsive music platform interface inspired by real-world media
          platforms. Focused on clean layout structure, component reusability, and user experience.
        </p>
      </section>

      <section className="mt-6 grid gap-4 rounded-xl bg-zinc-100 p-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow-sm">Songs: {stats.songs}</div>
        <div className="rounded-lg bg-white p-4 shadow-sm">Likes: {stats.likes}</div>
        <div className="rounded-lg bg-white p-4 shadow-sm">Saves: {stats.saves}</div>
      </section>

      <section className="mt-6 rounded-xl border p-4">
        <h2 className="text-xl font-semibold">Search and Categories</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            className="w-full rounded-md border px-3 py-2"
            placeholder="Search songs or artist"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select
            className="rounded-md border px-3 py-2"
            value={category}
            onChange={(event) => setCategory(event.target.value as CategoryFilter)}
          >
            <option value="All">All categories</option>
            <option value="Afrobeats">Afrobeats</option>
            <option value="Hip-hop">Hip-hop</option>
          </select>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Music Posts</h2>
        {loading ? (
          <p className="mt-4 text-zinc-600">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="mt-4 text-zinc-600">No posts yet. Use admin upload API to add songs.</p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id} className="rounded-xl border p-4 shadow-sm">
                <p className="text-xs uppercase text-zinc-500">{post.category}</p>
                <h3 className="mt-1 text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-zinc-600">Artist: {post.artist}</p>
                <p className="mt-3 text-sm">{post.summary}</p>

                {post.spotifyUrl ? (
                  <a
                    href={post.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-green-700"
                  >
                    Open via Spotify API Source
                  </a>
                ) : null}

                <div className="mt-4 flex gap-2">
                  <button
                    className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white"
                    onClick={() => reactToPost(post.id, "like")}
                  >
                    👍 Like ({post.likes})
                  </button>
                  <button
                    className="rounded-md border px-3 py-2 text-sm"
                    onClick={() => reactToPost(post.id, "save")}
                  >
                    💾 Save ({post.saves})
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

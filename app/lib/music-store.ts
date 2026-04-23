import { promises as fs } from "fs";
import path from "path";

export type MusicCategory = "Afrobeats" | "Hip-hop";

export type MusicPost = {
  id: string;
  title: string;
  artist: string;
  category: MusicCategory;
  summary: string;
  likes: number;
  saves: number;
  spotifyUrl?: string;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const dataDir = path.join(process.cwd(), "data");
const postsFile = path.join(dataDir, "music-posts.json");
const usersFile = path.join(dataDir, "users.json");

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content) as T;
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

export async function getMusicPosts(): Promise<MusicPost[]> {
  await ensureDir();
  return readJsonFile<MusicPost[]>(postsFile, []);
}

export async function saveMusicPosts(posts: MusicPost[]): Promise<void> {
  await ensureDir();
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
}

export async function addMusicPost(
  post: Omit<MusicPost, "id" | "createdAt" | "likes" | "saves">,
): Promise<MusicPost> {
  const posts = await getMusicPosts();
  const newPost: MusicPost = {
    ...post,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    likes: 0,
    saves: 0,
  };

  const nextPosts = [newPost, ...posts];
  await saveMusicPosts(nextPosts);
  return newPost;
}

export async function toggleReaction(
  id: string,
  reaction: "like" | "save",
): Promise<MusicPost | null> {
  const posts = await getMusicPosts();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return null;
  }

  const current = posts[index];
  const updated: MusicPost = {
    ...current,
    likes: reaction === "like" ? current.likes + 1 : current.likes,
    saves: reaction === "save" ? current.saves + 1 : current.saves,
  };

  posts[index] = updated;
  await saveMusicPosts(posts);
  return updated;
}

export async function getUsers(): Promise<User[]> {
  await ensureDir();
  return readJsonFile<User[]>(usersFile, []);
}

export async function registerUser(input: Omit<User, "id">): Promise<User> {
  const users = await getUsers();
  const exists = users.some((user) => user.email.toLowerCase() === input.email.toLowerCase());

  if (exists) {
    throw new Error("User already exists");
  }

  const user: User = {
    ...input,
    id: crypto.randomUUID(),
  };

  users.push(user);
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
  return user;
}

export async function loginUser(email: string, password: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((user) => user.email === email && user.password === password) ?? null;
}

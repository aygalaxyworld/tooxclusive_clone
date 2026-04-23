# Music Platform UI System

A **Music Content Platform** built with Next.js (Node runtime) featuring a responsive UI inspired by real-world media platforms.

> Designed and developed a responsive music platform interface inspired by real-world media platforms. Focused on clean layout structure, component reusability, and user experience.

## Core Upgrade Scope

### 1) Backend (Node)
- Fetch music posts through `/api/music`
- Store music data in local JSON storage (`data/music-posts.json`)
- Admin upload endpoint for new posts (protected by admin token)

### 2) Features
- Search songs
- Categories: **Afrobeats**, **Hip-hop**
- Like / Save system
- Admin upload support

### 3) API Integration
- Supports music-source links from free APIs/platforms (example Spotify track URLs)
- Posts can include `spotifyUrl` for external playback/source reference

### 4) Authentication
- Register endpoint: `/api/auth/register`
- Login endpoint: `/api/auth/login`
- Simple token response for authenticated sessions

## Endpoints

- `GET /api/music?search=<term>&category=<Afrobeats|Hip-hop>`
- `POST /api/music` (requires `x-admin-token`)
- `POST /api/music/:id/react` with `{ "reaction": "like" | "save" }`
- `POST /api/auth/register`
- `POST /api/auth/login`

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Admin Upload Example

```bash
curl -X POST http://localhost:3000/api/music \
  -H "Content-Type: application/json" \
  -H "x-admin-token: admin123" \
  -d '{
    "title": "Sample Song",
    "artist": "Sample Artist",
    "category": "Afrobeats",
    "summary": "Demo upload from admin",
    "spotifyUrl": "https://open.spotify.com/track/..."
  }'
```

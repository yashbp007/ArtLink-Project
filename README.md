# ArtLink (React)

This project has been migrated to React + Vite.

## Getting Started

1.  Current directory contains the new React app.
2.  Legacy files are backed up in `legacy_backup`.
3.  Run `npm install` (already done).
4.  Run `npm run dev` to start the development server.

## Structure

- `src/components`: UI Components (Layout, Sidebar, PostCard, etc.)
- `src/pages`: Page Views (Home, Explore, Create, Profile, etc.)
- `src/context`: State Management (Data, Theme)
- `src/index.css`: Global Styles (Ported from legacy style.css)

## Features Ported

- Feed, Stories, Explore Grid, Profile, Create Post.
- LocalStorage persistence for Users, Posts, Interactions.
- Dark Mode support (Toggle in Sidebar).

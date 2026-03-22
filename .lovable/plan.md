

# Plan: Add Search and Sorting to Immutable Vault

## Overview
Add a search bar and sort controls to the "Stored Documents" section so users can find and organize their files and text entries. This is a vanilla JS app (no React), so changes go into `index.html`, `app.js`, and `styles.css`.

## Changes

### 1. Add search bar and sort dropdown to `index.html`
Insert a toolbar between the section header and the storage grid containing:
- A search input with a magnifying glass icon
- A sort dropdown (Newest first, Oldest first, Name A-Z, Name Z-A, Size largest, Size smallest)

### 2. Add search and sort logic to `app.js`
- Add a `currentSearchQuery` variable and a `currentSort` variable (default: `newest`)
- Add `searchItems(query)` and `sortItems(sort)` functions that update state and call `renderStorage()`
- Update `renderStorage()` to filter items by search query (matching file name or text content, case-insensitive) and sort them before rendering
- Add debounced input listener for the search field

### 3. Style the search/sort toolbar in `styles.css`
- Style the search input with an icon, matching the existing dark theme
- Style the sort dropdown to match existing filter tabs
- Responsive layout: stack vertically on small screens

### 4. Auth flow testing note
The auth flow uses hardcoded credentials in `app.js` and should already work. I'll verify the auth screen transitions are correct during implementation.

## Technical Details
- Search matches against `item.name` (files) and `item.content` (text entries)
- Sort options: `newest` (default), `oldest`, `name-asc`, `name-desc`, `size-desc`, `size-asc`
- Text entries have no `size` property — they sort to the end for size-based sorts
- No new dependencies needed


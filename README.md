# CINELOG — Movie List Tracker

**Author:** Hari Sridharan

**Date:** 25/06/2026

**Hosted:** https://cine-log-alpha.vercel.app/

---

## Tech Stack

|                  |                                                     |
| ---------------- | --------------------------------------------------- |
| Library          | React                                               |
| Bundler          | Parcel                                              |
| State Management | React Context                                       |
| Styles           | CSS                                                 |
| Formatter        | Prettier (rules aligned with personal coding style) |

---

## Getting Started

- npm install
- create a .env in the root with: OMDB_API="https://www.omdbapi.com/" OMDB_API_KEY="shared via email"
- npm run dev

---

## Project Brief

A small application that tracks and maintains movies and TV shows for the user.

---

## Approach

### Data Modelling

I've used normalisation. The movies data layer consists of all the searched results from the user and acts as a single source of truth. From that
layer, I'm referencing IDs to the different lists — Watchlist, Watched Log, and custom lists. This ensures that the application is not rigid and
hard-coded, and also satisfies the core requirement of having two fixed lists while supporting the extension of allowing users to create multiple
additional lists.

### Data Handling

I've used React Context, as it is a perfectly capable state management option for a small to mid-sized application. localStorage is used to persist
the data. The store is kept in sync with the same structure defined in the context and is updated as the user makes any operation — adding, moving, or
removing movies, and creating new lists. The application is powered entirely by the data from the context.

### Component Structure

The application is built in a modular way, following the single responsibility principle wherever possible — each component focuses on rendering only
the data it receives, keeping things clean and structured. Atomic component structure was intentionally avoided due to time constraints and to prevent
over-engineering.

---

## Features

1. Two default lists — Watchlist and Watched Log — with the option to create additional custom lists
2. Watchlist is rendered by default
3. Search is abstracted and commonly available across all lists
4. Debouncing is implemented on the search functionality, so an API call will not be made on every individual keystroke
5. When moving a movie to the Watched Log, or when searching and adding directly to it, the user is prompted to provide a rating and an optional
   review
6. Movies can be moved between multiple lists. However, movement out of the Watched Log is intentionally restricted — it made more sense not to move
   data once it has been logged as watched
7. Duplicate entries are not allowed across lists, but this can be enabled with minimal code changes. When a user tries to add an existing movie, it
   is indicated in the search results and the action is blocked
8. Custom tags can be added to any movie or show

---

## Extensions Implemented

- User-defined lists — users can create and name their own lists in addition to the two defaults
- Custom tags — tags can be added to any movie or show across all lists

---

## Tools Used

- **ChatGPT** — used to improve the styling of the application, to allow focus on the core requirements and functionality

- **Claude** — used for code review and to improve the format of this Readme file

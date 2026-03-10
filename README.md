# 🐐 Herd Registry — Goat Breeding Tracker

A lightweight, browser-based goat herd management app. No server required — runs entirely in the browser and saves data to localStorage.

## Features

- Track does, bucks, and kids with full breeding records
- Due date alerts (flags animals due within 14 days)
- Photo upload per animal (stored as base64 in localStorage)
- Filter by status: All, Does, Bucks, Kids, Pregnant, Nursing, Waiting
- Record breeding events with automatic 150-day due date calculation
- Add/edit/remove any animal

## Files

| File | Purpose |
|------|---------|
| `index.html` | App structure and modals |
| `styles.css`  | All visual styling |
| `app.js`      | Data, logic, and rendering |

## Hosting on GitHub Pages

1. Push all three files to your repository root
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your app will be live at `https://<username>.github.io/<repo-name>/`

## Local Use

Open `index.html` directly in a browser — no build step, no dependencies, no server needed.

> **Note:** Photos and data are saved in your browser's localStorage. Clearing browser data will reset the app. For persistent backups, use the browser's export feature (coming soon).

## Herd

Pre-loaded with the Aspire Technical Solutions herd as of March 2026:
- **Elvis** — Herd sire
- **14 adult does** — various statuses (nursing, pregnant, waiting, unknown)
- **10 kids** — born Feb–Mar 2026, all sired by Elvis

---
*Built with Claude · Aspire Technical Solutions, LLC*

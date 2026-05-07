# App Clone Store

A premium App Store-inspired catalog built with Vite, React and TypeScript.

## Features

- Beautiful App Store-like landing page
- App cards with icons, names, developers and categories
- Detailed app page with rating, downloads, features and screenshots
- Synthetic demo reviews
- Manual app creation form in the UI
- Responsive design for desktop and mobile

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL in your browser.

## Manual app form fields

When adding apps manually, use this structure:

```json
{
  "name": "App name",
  "developer": "Developer name",
  "category": "Productivity",
  "price": "Free",
  "icon": "https://example.com/icon.png",
  "tagline": "Short App Store-like subtitle",
  "description": "Long app description",
  "features": "Feature one, Feature two, Feature three",
  "screenshots": "https://example.com/one.png, https://example.com/two.png"
}
```

## Next milestones

1. Persist manually added apps in a backend or JSON file.
2. Add admin authentication.
3. Add legal import connectors for app metadata.
4. Generate synthetic reviews with clear demo labeling.
5. Add real install/download buttons or deep links.

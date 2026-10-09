# Veranda

A plant & pot e-commerce store built on Medusa v2, with a live 2D
plant-in-pot configurator — pick a plant, pick a pot, see them
composited together in real time, only buy compatible pairs.

## Status

Backend (Medusa setup, data modules, cart logic) and a working
configurator prototype are built and wired to real data end-to-end.
Catalog data is currently placeholder/test data — real plant and pot
data is in progress.

## Team

- **Arouja** — Medusa setup, backend/data modules, 2D configurator
- **Teammate** — catalog/data curation, asset/image generation

## Stack

- **Backend:** Medusa v2 (`apps/backend`)
- **Storefront:** Next.js (`apps/storefront`)
- **Database:** Postgres
- **Package manager:** npm

## Running locally

```bash
# Backend
cd apps/backend
npm run dev
# → http://localhost:9000 (admin at /app)

# Storefront
cd apps/storefront
npm run dev
# → http://localhost:8000

# Configurator
http://localhost:8000/fr/configurator
```

## Custom modules

- `plant-meta` — botanical/care data per plant
- `pot-meta` — physical data per pot
- `asset-meta` — image compositing anchors for the configurator

## Key routes

- `GET /store/plants` — plants, pots, and the fit-compatibility table
- `POST /store/carts/:id/plantpot-bundle` — adds a plant+pot pair to cart as one linked purchase
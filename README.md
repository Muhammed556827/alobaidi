# Alobaidi Group Painting

Clean Next.js website package ready for a new repository.

## Public website structure

- `/` — main scrolling website with Hero, Trusted Companies, About, Why Us, Services, Reviews, Process, FAQ, and Contact.
- `/gallery` — dedicated Gallery page.
- `/admin` — CMS dashboard.

The hero uses video only. It is configured to autoplay muted, loop, and play inline on mobile.

Phone and email are managed from Admin → Business Settings. Phone links open the device dialer. Email links open a Gmail compose window with the saved business email already entered.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Add your Supabase credentials.
3. Run `npm install`.
4. Run `npm run dev`.

This package intentionally does not include `.git`, `.vercel`, `node_modules`, or `.env.local`.

## Latest homepage update

- Added a CMS-driven gallery preview section to the homepage after Services.
- The preview automatically loads the three newest Gallery items and links visitors to `/gallery`.
- Phone links are normalized to `tel:` links for tap-to-call behavior.
- Email links open a Gmail compose window with the saved admin email pre-filled.
- Contact link helpers are shared by both the main Contact section and Footer.
# alobaidi

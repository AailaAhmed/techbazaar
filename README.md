# TechBazaar

A full-featured ecommerce frontend for an electronics store, built as part of a Web Development Internship at **Appologix Software Solutions**.

** Live Demo:** [techbazaar-beta.vercel.app](https://techbazaar-beta.vercel.app)
** Repository:** [github.com/AailaAhmed/techbazaar](https://github.com/AailaAhmed/techbazaar)

---

## Overview

TechBazaar is a responsive, single-page ecommerce application covering the complete customer shopping journey — from browsing products to completing checkout — built with React and styled with Tailwind CSS. Product data is sourced live from the [DummyJSON](https://dummyjson.com) API, filtered to tech-relevant categories (smartphones, laptops, tablets, and accessories).

## Features

- **Home Page** — hero banner, browsable categories, featured products, best sellers, flash sale, and newsletter signup
- **Shop Page** — full product listing with live **search**, **category filtering**, and **sorting** (by price and rating)
- **Product Details** — individual product pages with full description, pricing, rating, and stock info
- **Cart** — add/remove items, adjust quantities, live order summary, persisted via `localStorage`
- **Wishlist** — save favorite products for later, persisted via `localStorage`
- **Checkout** — multi-field form with full client-side validation (email format, phone format, required fields)
- **Order Success** — confirmation page showing order details after a successful checkout
- **Live Cart Badge** — cart item count updates instantly across the site via React Context
- **Responsive Design** — fully functional on both desktop and mobile
- **About & Contact Pages** — static/informational pages with a working contact form (client-side only)

## Tech Stack

- **React** (via Vite)
- **Tailwind CSS**
- **React Router** — client-side routing, including URL query parameters for filters
- **DummyJSON API** — live product data
- **localStorage** — cart and wishlist persistence
- **lucide-react** — icon library
- **Vercel** — deployment

## Project Structure

```
src/
  components/     → Reusable UI components (Navbar, Footer, ProductCard)
  pages/          → Route-level pages (Home, Shop, Cart, Checkout, etc.)
  context/        → React Context for global cart state
  services/       → API service layer (DummyJSON requests)
  utils/          → localStorage helpers (cart, wishlist)
```

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/AailaAhmed/techbazaar.git
cd techbazaar
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## User Flow

```
Home → Shop (search/filter/sort) → Product Details → Cart → Checkout → Order Success
                ↳ Wishlist (accessible from Navbar + Product Cards)
```

## Notes

- This project uses DummyJSON's public API for product data; cart, wishlist, and orders are simulated using browser `localStorage` (no real backend/payment processing).
- Built and documented as part of an 8-week internship program.

---

*Built by Aaila Ahmed — Web Development Intern, Appologix Software Solutions*

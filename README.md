# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# Streamify - OTT Platform

A Netflix-style OTT platform built with React.js

## Features
- Browse trending, popular & top rated movies
- Movie detail page with full info
- Add/Remove movies to Watchlist
- Dark Mode / Light Mode toggle
- Persistent data with LocalStorage
- Responsive design

## Tech Stack
- React.js + Vite
- React Router DOM
- Context API
- TMDB API
- LocalStorage

## How to Run
1. Clone the repo
2. Run `npm install`
3. Add `.env` file with TMDB API key
4. Run `npm run dev`
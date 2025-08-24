# React + TypeScript + Vite

# Bidding Downloader

This project is a web application for downloading and exporting bidding goods data. Built with React, TypeScript, and Vite.

## Features

- Download and export bidding goods to CSV
- Modern UI with reusable components
- Fast and efficient data handling

## Getting Started

### Install dependencies

```sh
bun install
```

### Run the development server

```sh
bun run dev
```

### Build for production

```sh
bun run build
```

## Project Structure

- `src/components/` - UI and form components
- `src/utils/` - Utility functions for data fetching and exporting
- `src/configs/` - Configuration and types

## Exporting Bidding Goods

Use the form in the app to fetch and export bidding goods data to CSV. The logic is in `src/utils/exportItemsToBidCSV.ts`.

## License

MIT

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

// pages/_app.tsx
import '../styles/globals.css'; // 🔥 Import Tailwind styles di sini

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

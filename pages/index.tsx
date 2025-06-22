// ==== File: pages/index.tsx ====

import { useState } from "react";
import Head from "next/head";

function hashUsername(username: string, minute: number) {
  const input = username + minute;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function Home() {
  const [platform, setPlatform] = useState("x");
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const checkWhitelist = () => {
    const now = new Date();
    const currentMinute = Math.floor(now.getTime() / 60000);
    const hash = hashUsername(username.toLowerCase(), currentMinute);
    const isWhitelisted = hash % 2 === 0;
    setResult(isWhitelisted ? "✅ You are Whitelisted!" : "❌ Not on the List");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <Head>
        <title>WhitelistChecker2.5</title>
      </Head>
      <div className="max-w-md w-full bg-zinc-900 p-6 rounded-2xl shadow-xl border border-pink-500">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-pink-400">WhitelistChecker2.5</h1>
          <p className="text-sm text-gray-400">for fun only ✨</p>
        </div>
        <div className="flex mb-4">
          <select
            className="w-1/3 p-2 rounded-l-xl bg-zinc-800 border border-pink-500"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="x">X</option>
            <option value="discord">Discord</option>
          </select>
          <input
            type="text"
            placeholder={`Enter your ${platform} username`}
            className="w-2/3 p-2 rounded-r-xl bg-zinc-800 border-t border-r border-b border-pink-500 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          onClick={checkWhitelist}
          className="w-full p-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition"
        >
          Check Whitelist
        </button>
        {result && (
          <div className="mt-6 text-center text-xl font-semibold text-neon">
            {result}
          </div>
        )}
      </div>
      <footer className="mt-10 text-sm text-gray-600">
        Powered by <span className="text-pink-400">@frommvenus</span>
      </footer>
    </div>
  );
}

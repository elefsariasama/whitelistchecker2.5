import Image from "next/image";
import { useState } from "react";

const getDecision = (username: string): "✅ Whitelisted!" | "❌ Not Whitelisted" => {
  const timeSeed = Math.floor(Date.now() / 60000); // per menit
  const combined = username + timeSeed.toString();
  const hash = Array.from(combined).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % 2 === 0 ? "✅ Whitelisted!" : "❌ Not Whitelisted";
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [recentCheck, setRecentCheck] = useState<string | null>(null);

  const handleCheck = () => {
    if (!username) return;
    const res = getDecision(username.trim().toLowerCase());
    setResult(res);
    setRecentCheck(username);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white flex flex-col items-center justify-center px-4 relative">

      {/* Konten Utama */}
      <div className="w-full max-w-xl bg-gray-900 bg-opacity-50 backdrop-blur-md p-8 rounded-2xl border border-pink-500 shadow-[0_0_20px_#db2777aa]">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={130}
            height={130}
            className="rounded-full"
          />
        </div>

        <h1 className="text-4xl font-extrabold text-pink-400 text-center mb-6 tracking-wide animate-pulse drop-shadow">
          WhitelistChecker 2.5 🚀
        </h1>

        <input
          type="text"
          placeholder="Enter your X / Discord username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-5 py-3 mb-4 rounded-xl bg-black border-2 border-pink-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={handleCheck}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold py-3 rounded-xl transition duration-300 ease-in-out shadow-lg hover:shadow-pink-700"
        >
          Check Whitelist Status
        </button>

        {result && (
          <div
            className={`mt-6 text-center text-2xl font-bold ${
              result.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {result}
          </div>
        )}

        {recentCheck && (
          <div className="mt-2 text-center text-sm text-gray-400">
            Checked: <span className="text-white font-mono">@{recentCheck}</span>
          </div>
        )}
      </div>

      {/* Footer Responsif */}
      <div className="absolute bottom-4 w-full px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        {/* Powered by */}
        <div className="bg-black bg-opacity-40 border border-pink-500 rounded-lg px-3 py-1 text-pink-400 shadow-md text-center">
          Powered by{" "}
          <a
            href="https://twitter.com/frommvenus"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @frommvenus
          </a>
        </div>

        {/* Disclaimer */}
        <div className="bg-black bg-opacity-40 border border-yellow-600 text-yellow-400 rounded-lg px-3 py-1 shadow-md text-center">
          ⚠️ This is just for fun! Not a real Whitelist Checker system.
        </div>
      </div>
    </div>
  );
}

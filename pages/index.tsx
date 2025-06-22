import { useState } from "react";

const getDecision = (username: string): "Whitelist ✅" | "Not Whitelisted ❌" => {
  const timeSeed = Math.floor(Date.now() / 60000); // per menit
  const combined = username + timeSeed.toString();
  const hash = Array.from(combined).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % 2 === 0 ? "Whitelist ✅" : "Not Whitelisted ❌";
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="bg-gray-900 rounded-xl p-8 shadow-lg w-full max-w-md border border-pink-500">
        <div className="text-center text-pink-500 text-3xl font-bold mb-6">WhitelistChecker 2.5</div>

        <input
          className="w-full px-4 py-2 rounded bg-black border-2 border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
          placeholder="Enter your X or Discord username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold py-2 px-4 rounded hover:opacity-90 transition mb-4"
          onClick={handleCheck}
        >
          Check Whitelist Stage 2.5
        </button>

        {result && (
          <div className={`text-center font-bold text-xl mb-4 ${result.includes("✅") ? "text-green-400" : "text-red-400"}`}>
            {result}
          </div>
        )}

        {recentCheck && (
          <div className="text-sm text-gray-400 text-center">
            Recent Check: <span className="text-white font-mono">@{recentCheck}</span>
          </div>
        )}
      </div>

      <div className="text-gray-500 text-xs mt-6">
        ⚠️ This is just for fun. Not a real whitelist verifier.
      </div>
    </main>
  );
}

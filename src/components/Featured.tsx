export default function FeatureCard() {
  return (
    <div className="mx-auto max-w-2xl text-center mt-28 px-4">
      <div className="backdrop-blur bg-white/5 dark:bg-black/10 border border-white/10 rounded-3xl p-8">
        <h1 className="text-2xl font-bold mb-2">
          One-click GitHub repo privacy toggle
        </h1>
        <p className="text-sm text-white/70 mb-6">
          Skip the deep settings screens. Connect GitHub and flip any personal
          repo between public and private instantly.
        </p>
        <ul className="text-left text-white/80 text-sm grid gap-2">
          <li>• Secure GitHub OAuth</li>
          <li>• Shows your personal repositories</li>
          <li>• One click to make Public or Private</li>
        </ul>
      </div>
    </div>
  );
}
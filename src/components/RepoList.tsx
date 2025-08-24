"use client";

import React, { useEffect, useMemo, useState } from "react";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: boolean | null;
  fork: boolean;
  archived: boolean;
};

export default function RepoList() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [toggling, setToggling] = useState(false);

  // getting repos
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/repos", { cache: "no-store" });
        if (!res.ok) throw new Error(`Faild to load repos ${res.status}`);
        const data = await res.json();
        setRepos(data.repos as Repo[]);
      } catch (e: any) {
        setError(e?.message || "Faild to load repos");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const selectedRepo = useMemo(
    () => repos?.find((r) => r.full_name === selected || null),
    [repos, selected]
  );

  // toggle the repo
  async function toggleVisibility(makePrivate: boolean) {
    if (!selected) return;
    try {
      setToggling(true);
      const res = await fetch("/api/toggle-visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repos: selected, makePrivate }),
      });
      if (!res.ok) throw new Error("Faild to toggle visibility");
      const updated = (await res.json()) as Partial<Repo> & {
        full_name: string;
      };
      setRepos(
        (prev) =>
          prev?.map((r) =>
            r.full_name === (updated.full_name || selected)
              ? { ...r, private: !!updated.private }
              : r
          ) || null
      );
    } catch (e: any) {
      alert(e?.message || "Toggle faild");
    } finally {
      setToggling(false);
    }
  }
  return (
    <div className="mx-auto max-w-3xl mt-28 px-4">
      <div className="backdrop-blur bg-white/5 dark:bg-black/10 border border-white/10 rounded-3xl p-6">
        <h2 className="text-lg font-semibold mb-4">Your repositories</h2>
        {loading && <p className="text-sm text-white/70">Loading…</p>}
        {error && <p className="text-sm text-red-400">{error}</p>}
        {!loading && !error && (
          <div className="grid gap-2">
            {repos?.map((repo) => (
              <button
                key={repo.id}
                onClick={() => setSelected(repo.full_name)}
                className={`text-left px-3 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition ${
                  selected === repo.full_name ? "bg-white/10" : "bg-transparent"
                }`}
                title={repo.full_name}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{repo.full_name}</div>
                    <div className="text-xs text-white/60 line-clamp-1">
                      {repo.description || "No description"}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-1 rounded-full border ${
                      repo.private
                        ? "border-yellow-300/30 text-yellow-300/90"
                        : "border-emerald-300/30 text-emerald-300/90"
                    }`}
                  >
                    {repo.private ? "Private" : "Public"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <button
            disabled={!selectedRepo || toggling || selectedRepo?.private}
            onClick={() => toggleVisibility(true)}
            className="text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 disabled:opacity-40"
          >
            Make Private
          </button>
          <button
            disabled={!selectedRepo || toggling || !selectedRepo?.private}
            onClick={() => toggleVisibility(false)}
            className="text-xs px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 disabled:opacity-40"
          >
            Make Public
          </button>
        </div>
      </div>
    </div>
  );
}

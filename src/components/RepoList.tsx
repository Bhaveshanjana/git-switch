"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  GitBranch,
  Lock,
  Unlock,
  Settings,
  X,
  Eye,
  EyeOff,
  Star,
  GitFork,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { bricolage, manrope, quick, roboto, sans, urban } from "@/utils/fonts";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
};

export default function RepoList() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [toggling, setToggling] = useState(false);
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);

  // Getting repos
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/repos", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load repos ${res.status}`);
        const data = await res.json();
        setRepos(data.repos as Repo[]);
      } catch (e: any) {
        setError(e?.message || "Failed to load repos");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const selectedRepo = useMemo(
    () => repos?.find((r) => r.full_name === selected) || null,
    [repos, selected]
  );

  // Toggle the repo visibility
  async function toggleVisibility(makePrivate: boolean) {
    if (!selected) return;
    try {
      setToggling(true);
      const res = await fetch("/api/toggle-visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo: selected, makePrivate }),
      });
      if (!res.ok) throw new Error("Failed to toggle visibility");
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
      alert(e?.message || "Toggle failed");
    } finally {
      setToggling(false);
    }
  }

  const handleVisibilityChange = (makePrivate: boolean) => {
    toggleVisibility(makePrivate);
    setShowVisibilityModal(false);
  };
  return (
    <div className="pt-40 md:pt-50 bg-background dark:bg-foreground p-6 md:p-12">
      <div className="flex items-center justify-between mb-6 ">
        <h2
          className={`md:text-xl text-gray-900 dark:text-white flex items-center gap-2 ${roboto}`}
        >
          <GitBranch className="h-5 w-5" />
          Your Repositories
        </h2>
        <span className="text-sm md:text-[15px] text-gray-500 dark:text-gray-400">
          {repos?.length || 0} repositories
        </span>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="ml-3 text-gray-600 dark:text-gray-300">
            Loading repositories...
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {!loading &&
        !error &&
        repos &&
        (showVisibilityModal ? (
          <div className="space-y-3 h-[40vh] overflow-hidden p-12 ">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className={`group relative bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200 cursor-pointer ${
                  selected === repo.full_name
                    ? "ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                    : ""
                }`}
                onClick={() => setSelected(repo.full_name)}
              >
                {/* Repository Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                        {repo.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {repo.description || "No description available"}
                    </p>
                  </div>

                  {/* Visibility Status & Settings */}
                  <div className="flex items-center gap-2 ml-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        repo.private
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                          : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                      }`}
                    >
                      {repo.private ? (
                        <Lock className="h-3 w-3" />
                      ) : (
                        <Unlock className="h-3 w-3" />
                      )}
                      {repo.private ? "Private" : "Public"}
                    </span>

                    {selected === repo.full_name && !repo.archived && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowVisibilityModal(true);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        title="Change visibility"
                      >
                        <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 h-full p-1 md:p-12 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className={`group relative bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-200 cursor-pointer ${
                  selected === repo.full_name
                    ? "ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                    : ""
                }`}
                onClick={() => setSelected(repo.full_name)}
              >
                {/* Repository Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`text-gray-900 dark:text-white text-sm md:text-[15px] truncate ${bricolage}`}
                      >
                        {repo.name}
                      </h3>
                    </div>
                    <p
                      className={`text-xs text-gray-600 dark:text-gray-400 line-clamp-2 ${manrope}`}
                    >
                      {repo.description || "No description available"}
                    </p>
                  </div>

                  {/* Visibility Status & Settings */}
                  <div className="flex items-center gap-2 ml-3 mt-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[13px] font-medium ${
                        repo.private
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                          : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                      }`}
                    >
                      {repo.private ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <Unlock className="h-4 w-4" />
                      )}
                      {repo.private ? "Private" : "Public"}
                    </span>

                    {selected === repo.full_name && !repo.archived && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowVisibilityModal(true);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        title="Change visibility"
                      >
                        <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      {/* Visibility Change Modal */}
      {showVisibilityModal && selectedRepo && !selectedRepo.archived && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm p-4 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg text-gray-900 dark:text-white ${urban}`}>
                Change Repository Visibility
              </h3>
              <button
                onClick={() => setShowVisibilityModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                disabled={toggling}
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400 cursor-pointer" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Repository:{" "}
                  <span className={`${sans}`}>{selectedRepo.name}</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Current status:{" "}
                  <span
                    className={`font-medium ${
                      selectedRepo.private
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {selectedRepo.private ? "Private" : "Public"}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  disabled={toggling || !selectedRepo.private}
                  onClick={() => handleVisibilityChange(false)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all cursor-pointer ${
                    !selectedRepo.private
                      ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700/50"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <span
                    className={`text-sm text-gray-900 dark:text-white ${quick}`}
                  >
                    Public
                  </span>
                  <span
                    className={`text-xs text-gray-500 dark:text-gray-400 text-center ${manrope}`}
                  >
                    Anyone can see this repository
                  </span>
                </button>

                <button
                  disabled={toggling || selectedRepo.private}
                  onClick={() => handleVisibilityChange(true)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedRepo.private
                      ? "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700/50"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <EyeOff className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  <span
                    className={`text-sm text-gray-900 dark:text-white ${quick}`}
                  >
                    Private
                  </span>
                  <span
                    className={`text-xs text-gray-500 dark:text-gray-400 text-center ${manrope}`}
                  >
                    Only you can see this repository
                  </span>
                </button>
              </div>

              {toggling && (
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  Updating repository visibility...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

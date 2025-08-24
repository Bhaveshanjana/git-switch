import { Octokit } from "@octokit/rest";

export function createUserOctokit(accessToken: string | undefined) {
  if (!accessToken) throw new Error("Missing Github acess token");
  return new Octokit({ auth: accessToken, userAgent: "repo-toggle-app/1.0" });
}

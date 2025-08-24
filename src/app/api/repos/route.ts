import { createUserOctokit } from "@/lib/octokit";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Getting User Details-
  const accessToken = (session as any).accessToken as string | undefined;
  const login = (session.user as any)?.login as string | undefined;

  if (!login) {
    return NextResponse.json({ error: "Missing user login" }, { status: 400 });
  }

  // Fetching Repositories from GitHub-
  const octokit = createUserOctokit(accessToken);
  const { data } = await octokit.repos.listForAuthenticatedUser({
    visibility: "all",
    affiliation: "owner",
    per_page: 100,
    sort: "pushed",
    direction: "desc",
  });

  // Cleaning and Formatting the Data-
  const repos = data
    .filter((r) => r.owner?.login === login)
    .map((r) => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      private: r.private,
      html_url: r.html_url,
      description: r.description,
      archived: r.archived,
      fork: r.fork,
    }));
  return NextResponse.json({ repos });
}

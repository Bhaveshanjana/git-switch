import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createUserOctokit } from "@/lib/octokit";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const accessToken = (session as any).accessToken as string | undefined;
  const login = (session.user as any)?.login as string | undefined;

  const { repo, makePrivate } = await request.json();
  if (!repo || typeof makePrivate !== "boolean") {
    return NextResponse.json({ error: "Invaild payload" }, { status: 400 });
  }

  const [owner, name] = String(repo).split("/");
  if (!owner || !name)
    return NextResponse.json(
      { error: "Invaild repo" },
      { status: 400 }
    );
  if (owner !== login)
    return NextResponse.json(
      { error: "Only personal repos supported " },
      { status: 403 }
    );

  const octokit = createUserOctokit(accessToken);

  const { data } = await octokit.repos.update({
    owner,
    repo: name,
    private: makePrivate,
  });

  return NextResponse.json({
    id: data.id,
    name: data.name,
    full_name: data.full_name,
    private: data.private,
    html_url: data.html_url,
  });
}

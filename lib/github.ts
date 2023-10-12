import { z } from "zod";

const REPOS = [
  "devict/job-board",
  "devict/devict.org",
  "devict/keeper",
  "devict/hacktoberfest",
]

export async function getHelpWantedIssues(token: string) {
/**
 * TODO: Assuming there won't be more than 100 help-wanted issues on
 * any of the defined repos. Handle pagination!
 */
  const PER_PAGE = 100;
  const allRepoIssues = await Promise.all(
    REPOS.map(r => fetchIssues(token, r, PER_PAGE, 1))
  );
  return allRepoIssues.flat();
}

const GitHubIssueSchema = z.object({
  title: z.string(),
  number: z.number(),
  html_url: z.string(),
  repository_url: z.string(),
  state: z.string(),
  labels: z.array(z.object({
    name: z.string(),
    color: z.string(),
  })),
  reactions: z.object({
    "+1": z.number(),
    "-1": z.number(),
    confused: z.number(),
    eyes: z.number(),
    heart: z.number(),
    hooray: z.number(),
    laugh: z.number(),
    rocket: z.number(),
    total_count: z.number(),
  })
})
type GitHubIssue = z.infer<typeof GitHubIssueSchema>;

const GitHubIssueResponseSchema = z.array(GitHubIssueSchema);

async function fetchIssues(token: string, repo: string, perPage: number, page: number = 1) {
  const url = `https://api.github.com/repos/${repo}/issues?state=open&labels=devict-help-wanted&per_page=${perPage}&page=${page}`;
  const resp = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    }
  });

  if (!resp.ok) {
    console.error(`Fetching issues failed (${resp.status} ${url}): ${await resp.text()}`);
    throw new Error(`Failed to fetch ${url}: ${resp.statusText}`);
  }
  return GitHubIssueResponseSchema.parse(await resp.json());
}

function formatIssue(issue: GitHubIssue): string {
  const { html_url: issueUrl, title: issueTitle, number: issueNumber } = issue;
  const repoUrl = issueUrl.replace(/\/issues\/\d+$/, "");
  const repoName = repoUrl.replace("https://github.com/", "");

  return `- *<${repoUrl}|${repoName}>*: <${issueUrl}|${issueTitle} (${issueNumber})>`;
}

export function formatIssuesAsMessage(issues: GitHubIssue[], limit?: number): string {
  if (limit) {
    issues = issues.slice(0, limit);
  }
  return issues.map(formatIssue).join("\n");
}
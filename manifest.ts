import { Manifest } from "deno-slack-sdk/mod.ts";
import pingWorkflow from "./workflows/ping.ts";
import { GitHubIssuesFunctionDefinition } from "./functions/github_issues.ts";
import { IssuesWorkflow } from "./workflows/issues.ts";

import "std/dotenv/load.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "devICT Keeper",
  displayName: "keeper",
  description: "A slack bot for devICT",
  icon: "assets/devict_logo_2000x2000.png",
  functions: [GitHubIssuesFunctionDefinition],
  workflows: [pingWorkflow, IssuesWorkflow],
  events: [],
  outgoingDomains: [
    "api.github.com",
  ],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "app_mentions:read",
  ],
});

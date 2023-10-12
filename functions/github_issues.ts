import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { formatIssuesAsMessage, getHelpWantedIssues } from "../lib/github.ts";

export const GitHubIssuesFunctionDefinition = DefineFunction({
  callback_id: "github_issues",
  title: "Get GitHub Issues",
  description: "Get a list of `help-wanted` issues from devICT GitHub",
  source_file: "functions/github_issues.ts",
  input_parameters: {
    properties: {},
    required: [],
  },
  output_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: "Formatted list of github issues",
      },
    },
    required: ["message"],
  },
});

export default SlackFunction(
  GitHubIssuesFunctionDefinition,
  async () => {
    const issues = await getHelpWantedIssues();
    return { outputs: { message: formatIssuesAsMessage(issues) } };
  },
);

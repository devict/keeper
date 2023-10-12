import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { GitHubIssuesFunctionDefinition } from "../functions/github_issues.ts";

// Define a workflow that can pass the parameters for the Slack function
export const IssuesWorkflow = DefineWorkflow({
  callback_id: "issues",
  title: "GitHub Help Wanted Issues",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
    },
    required: ["channel_id"],
  },
});

const getIssuesMessageStep = IssuesWorkflow.addStep(
  GitHubIssuesFunctionDefinition,
  {},
);

IssuesWorkflow.addStep(
  Schema.slack.functions.SendMessage,
  {
    channel_id: IssuesWorkflow.inputs.channel_id,
    message: `${getIssuesMessageStep.outputs.message}}`,
  },
);

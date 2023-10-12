import { Trigger } from "deno-slack-api/types.ts";
import { TriggerEventTypes, TriggerTypes } from "deno-slack-api/mod.ts";
import { AllRegisteredChannels } from "../lib/channels.ts";
import { IssuesWorkflow } from "../workflows/issues.ts";

const IssuesTrigger: Trigger<typeof IssuesWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "Fetch help wanted GitHub issues.",
  description: "responds to `@keeper issues`",
  workflow: "#/workflows/issues",
  event: {
    event_type: TriggerEventTypes.AppMentioned,
    /**
     * TODO: Is there way to say "all public channels" here? It would be nice
     * to not have to list them all out in `lib/channels.ts`.
     */
    channel_ids: AllRegisteredChannels,
    filter: {
      version: 1,
      root: {
        statement: "{{data.text}} CONTAINS issues",
      },
    },
  },
  inputs: {
    channel_id: {
      value: "{{data.channel_id}}",
    },
  },
};

export default IssuesTrigger;

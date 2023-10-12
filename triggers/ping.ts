import { Trigger } from "deno-slack-api/types.ts";
import { TriggerEventTypes, TriggerTypes } from "deno-slack-api/mod.ts";
import pingWorkflow from "../workflows/ping.ts";
import { AllRegisteredChannels } from "../lib/channels.ts";

const pingTrigger: Trigger<typeof pingWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "Reactji response",
  description: "responds to a specific reactji",
  workflow: "#/workflows/ping",
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
        statement: "{{data.text}} CONTAINS ping",
      },
    },
  },
  inputs: {
    user_id: {
      value: "{{data.user_id}}",
    },
    channel_id: {
      value: "C123ABC456",
    },
  },
};

export default pingTrigger;

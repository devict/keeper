import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

// Define a workflow that can pass the parameters for the Slack function
const pingWorkflow = DefineWorkflow({
  callback_id: "ping",
  title: "Ping",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      user_id: { type: Schema.slack.types.user_id },
    },
    required: ["channel_id", "user_id"],
  },
});

pingWorkflow.addStep(
  Schema.slack.functions.SendMessage,
  {
    channel_id: pingWorkflow.inputs.channel_id,
    message: `<@${pingWorkflow.inputs.user_id}> pong!`,
  },
);

export default pingWorkflow;

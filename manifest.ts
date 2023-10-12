import { Manifest } from "deno-slack-sdk/mod.ts";
import pingWorkflow from "./workflows/ping.ts";

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
  functions: [],
  workflows: [pingWorkflow],
  events: [],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "app_mentions:read",
  ],
});

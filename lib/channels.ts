import { filterKeys } from "std/collections/filter_keys.ts";

export const Channels = {
  "#general": "C02TAGHRE",
  "#random": "C02TAGHRL",
  "#events": "C031KNP1S",
  "#bot-testing": "C02N7CW42JE",
  "#javascript": "C02TQKE1P",
} as const;

/**
 * We construct it this way because where it is used it is expected to have
 * at least one item in the array, and `Object.values()` alone does not guarantee
 * that at the type level. Weird workaround, but :shrug:
 */
export const AllRegisteredChannels: [string, ...string[]] = [
  Channels["#general"],
  ...Object.values(filterKeys(Channels, k => k !== "#general")),
];

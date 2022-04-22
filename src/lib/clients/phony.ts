import { Client } from "../../types/generic";

export default class PhonyClient implements Client {
    start(): Promise<void> {
        return Promise.resolve();
    }

    stop(): Promise<void> {
        return Promise.reject();
    }
}
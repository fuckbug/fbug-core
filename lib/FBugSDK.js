import { LogProvider } from "./LogProvider";
// 80c0d8c0-3e60-49a0-9a48-6bb2332b0130
//
// /ingest/{projectID}:{key}/logs
export class FBugSDK {
    #logProvider;
    constructor(plugins) {
        this.#logProvider = new LogProvider(plugins);
    }
}

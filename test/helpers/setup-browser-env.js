// waiting for https://github.com/github/fetch/issues/657
import browserEnv from "browser-env";
import fetch from "node-fetch";

browserEnv();
global.fetch = fetch;

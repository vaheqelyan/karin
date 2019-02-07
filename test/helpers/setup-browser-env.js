// waiting for https://github.com/github/fetch/issues/657
import browserEnv from "browser-env";
import { fetch as fetchPolyfill } from "whatwg-fetch";

browserEnv();
global.fetch = fetchPolyfill;

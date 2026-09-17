import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Static site: no ISR cache or queue needed.
export default defineCloudflareConfig();

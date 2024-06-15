// Needed to be able to run GrowthBook locally and in the server since the first is Node and the second Edge
// https://linen.growthbook.io/t/442993/hi-guys-i-m-having-some-package-module-issues-using-the-sdk-
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { GrowthBook } = require("@growthbook/growthbook");

let client = null;

const getClient = async () => {
  const growbook = new GrowthBook({
    apiHost: "https://cdn.growthbook.io",
    clientKey: import.meta.env.PUBLIC_GROWTHBOOK_SDK_KEY,
    enableDevMode: import.meta.env.DEV,
    trackingCallback: (experiment, result) => {
      // TODO: Use your real analytics tracking system
      console.log("Viewed Experiment", {
        experimentId: experiment.key,
        variationId: result.key
      });
    }
  });
  growbook.setAttributes({ deviceId: "12345" });

  // Wait for features to be available
  await growbook.init({ streaming: true });
  client = growbook;

  return client;
}

export const getFeatureValue = async (featureName) => {
  const client = await getClient();
  return client.getFeatureValue(featureName);
}

import { GrowthBook } from "@growthbook/growthbook";

let client = null;

const getClient = async () => {
if (client) return growbook;

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

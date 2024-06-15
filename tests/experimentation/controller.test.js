import { Application as StimulusApp } from "@hotwired/stimulus";
import { describe, vi } from "vitest";

import { ExperimentController } from "@lib/experimentation";

vi.mock("@lib/experimentation/client", async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    async getFeatureValue(experimentName) {
      return {
        "mock-experiment": "variation"
      }[experimentName]
    }
  }
});

describe("ExperimentController", () => {
  describe("connect", () => {
    beforeEach(() => {
      useDOM(`
        <div data-controller="experiment" data-experiment-name-value="mock-experiment">
          <p data-experiment-target="variation" data-bucket="control">Control</p>
          <p data-experiment-target="variation" data-bucket="variation">Variation</p>
        </div>
      `);

      const stimulusApp = StimulusApp.start();
      stimulusApp.register("experiment", ExperimentController);
    });

    test("hides all variations with a bucket different than the assigned", () => {
      const [control, variation] = document.getElementsByTagName("p");

      expect(control.hidden).toBe(true);
      expect(variation.hidden).toBe(false);
    });
  });
});
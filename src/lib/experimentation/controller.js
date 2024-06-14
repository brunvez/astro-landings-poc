import { Controller } from "@hotwired/stimulus";
import { getFeatureValue } from "./client";

export class ExperimentController extends Controller {
  static targets = ["variation"];

  connect() {
    const experimentName = this.element.dataset.experimentName;
    getFeatureValue(experimentName)
      .then((bucket) => this.showVisibleVariation(bucket));
  }

  showVisibleVariation(variationName) {
    this.variationTargets.forEach((element) => {
      element.hidden = element.dataset.bucket !== variationName;
    })
  }
}

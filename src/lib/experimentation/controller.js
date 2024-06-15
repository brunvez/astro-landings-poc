import { Controller } from "@hotwired/stimulus";
import { getFeatureValue } from "./client";

export class ExperimentController extends Controller {
  static targets = ["variation"];
  static values = {
    name: String
  }

  connect() {
    getFeatureValue(this.experimentName())
      .then((bucket) => this.showVisibleVariation(bucket));
  }

  showVisibleVariation(variationName) {
    this.variationTargets.forEach((element) => {
      element.hidden = element.dataset.bucket !== variationName;
    })
  }

  experimentName() {
    return this.nameValue;
  }
}

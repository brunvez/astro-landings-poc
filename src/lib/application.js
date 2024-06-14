import { Application } from "@hotwired/stimulus"
const Stimulus = Application.start()

export const registerStimulusComponent = (identifier, controllerConstructor) => {
  Stimulus.register(identifier, controllerConstructor)
}
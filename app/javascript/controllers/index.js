import { Application } from "@hotwired/stimulus"
import Flash from "./flash_controller";
import Modal from "./modal_controller";
import Paddle from "./paddle_controller";

const application = Application.start()
application.register("flash", Flash);
application.register("modal", Modal);
application.register("paddle", Paddle);

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

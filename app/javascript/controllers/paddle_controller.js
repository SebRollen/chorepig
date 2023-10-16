import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  checkout() {
    Paddle.Checkout.open({ product: 840870 });
  }
}

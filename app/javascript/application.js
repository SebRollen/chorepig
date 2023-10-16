// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./react"
import "./controllers"

if (navigator.serviceWorker) {
    navigator.serviceWorker.register("/sw.js", { scope: "/" })
        .then(() => navigator.serviceWorker.ready);
}

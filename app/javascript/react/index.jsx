import React, {StrictMode} from "react";
import { createRoot } from "react-dom/client";
import App from './components/App';

document.addEventListener("turbo:load", async () => {
  const node = document.getElementById('root');
  if (node) {
    const root = createRoot(node);
    root.render(<StrictMode><App/></StrictMode>);
  }
});

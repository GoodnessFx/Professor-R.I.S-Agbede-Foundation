
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  const rootEl = document.getElementById("root");
  if (!rootEl) {
    document.body.innerHTML = '<div style="padding:40px;font-family:sans-serif">App failed to start: #root element missing.</div>';
    throw new Error("#root element missing");
  }
  window.addEventListener("error", (e) => {
    if (rootEl.childElementCount === 0) {
      rootEl.innerHTML =
        '<div style="padding:40px;font-family:sans-serif;max-width:640px;margin:0 auto">' +
        "<h1>Something went wrong loading the site.</h1>" +
        "<p>Please refresh the page. If the problem persists, contact support.</p>" +
        "<pre style=\"white-space:pre-wrap;font-size:12px;color:#555\">" +
        String((e as ErrorEvent).message || e.error || "Unknown error") +
        "</pre></div>";
    }
  });
  createRoot(rootEl).render(<App />);
  
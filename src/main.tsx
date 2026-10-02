  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";

  const rootEl = document.getElementById("root");
  if (!rootEl) {
    throw new Error("#root element missing");
  }
  createRoot(rootEl).render(<App />);
  
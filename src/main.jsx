import { createRoot } from "react-dom/client";
import Counter from "./Counter";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// root.render(<Counter />);
root.render(<App />);
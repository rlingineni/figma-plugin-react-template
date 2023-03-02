import * as React from "react";
import App from "./App";
import PreviewApp from "./WebViewer/PreviewApp";

import { createRoot } from "react-dom/client";

import "./styles/ui.css";

const PREVIEW_ENV = process.env.PREVIEW_ENV;

const container = document.getElementById("react-page");
const root = createRoot(container!);
root.render(!PREVIEW_ENV ? <App /> : <PreviewApp />);

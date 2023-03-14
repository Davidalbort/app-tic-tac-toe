import React from "react"
import ReactDom from "react-dom/client"
import { App } from "./App"
import "./style.css"

ReactDom.createRoot(document.getElementById("app") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

import { defineConfig} from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	plugins: [react({
		// Exclude storybook stories
		exclude: /\.stories\.(t|j)sx?$/,
		// Only .tsx files
		include: "**/*.tsx",
	})]

}
)
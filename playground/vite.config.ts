import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import liveReload from 'vite-plugin-live-reload'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		liveReload(['../packages/mini-react/dist/**/*', '../packages/mini-react-dom/dist/**/*']),
	],
})

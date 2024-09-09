import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        TanStackRouterVite()
    ],
    resolve: {
        alias: [
            {find: '@components', replacement: resolve(__dirname, './src/components')},
            {find: '@assets', replacement: resolve(__dirname, './src/assets')},
            {find: '@api', replacement: resolve(__dirname, './src/api')},
            {find: '@context', replacement: resolve(__dirname, './src/context')}
        ]
    }
})

import {defineConfig} from 'vite';

export default defineConfig({
    base: './',
    server: {
        port: 3008,
    },
    optimizeDeps: {
        exclude: ['node:fs/promises']
    }
});
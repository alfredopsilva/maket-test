import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 800,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        projectId: 'dbsy94',
    },
});

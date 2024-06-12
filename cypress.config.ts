import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'dbsy94',
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

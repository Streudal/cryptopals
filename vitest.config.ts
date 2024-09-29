/// <reference types="vitest/config" />
import "@testing-library/jest-dom/vitest";
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['vitest-localstorage-mock'],
    mockReset: false,
    typecheck: {
      enabled: true
    }
  },
});

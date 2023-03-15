/* eslint-disable prettier/prettier */
import { defineConfig } from 'vitest/config'
import tsconfigPAths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPAths()],
})
/* eslint-disable prettier/prettier */
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs:[
      ['./src/http/controllers/**' , 'prisma']
    ],
    coverage: {
      reporter: ['text', 'lcov']
    }
  }
})
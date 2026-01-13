import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest'
import { configure } from '@testing-library/react'

configure({
  testIdAttribute: 'data-test-id'
})

global.console = {
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
} as any // eslint-disable-line
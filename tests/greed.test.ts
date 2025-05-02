import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

describe('Check for DB file integrity.', () => {
  it('should be present.', () => {
    const dbPath = path.resolve('./src/db/settings.sqlite')
	
    expect(fs.existsSync(dbPath)).toBe(true)
  })
})

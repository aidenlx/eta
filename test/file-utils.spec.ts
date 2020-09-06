/* global it, expect, describe */

import { loadFile, templates } from '../src/index'
import { config } from '../src/config'

var path = require('path'),
  filePath = path.join(__dirname, 'templates/simple.eta')

describe('File tests', () => {
  it('loadFile works', () => {
    loadFile(filePath, { filename: filePath })
    expect(templates.get(filePath)).toBeTruthy()
    expect(templates.get(filePath)({ name: 'Ben' }, config)).toBeTruthy()
  })
})

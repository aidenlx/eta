/* global it, expect, describe */

import { render, templates, compile } from '../src/index'

var path = require('path')

templates.define('test-template', compile('HEY <%=it.name%>'))

describe('include works', () => {
  it('simple parser works with "includeFile"', async () => {
    var renderedTemplate = render(
      '<%~ E.includeFile("simple", it) %>',
      { name: 'Ben' },
      { filename: path.join(__dirname, 'templates/placeholder.eta') }
    )

    expect(renderedTemplate).toEqual('Hi Ben')
  })

  it('"includeFile" works with "views" array', async () => {
    var renderedTemplate = render(
      '<%~ E.includeFile("randomtemplate", it) %>',
      { user: 'Ben' },
      {
        filename: path.join(__dirname, 'templates/placeholder.eta'),
        views: [path.join(__dirname, 'templates'), path.join(__dirname, 'othertemplates')],
      }
    )

    expect(renderedTemplate).toEqual('This is a random template. Hey Ben')
  })

  it('simple parser works with "include"', async () => {
    var renderedTemplate = render('<%~ E.include("test-template", it) %>', { name: 'Ben' })

    expect(renderedTemplate).toEqual('HEY Ben')
  })

  test('throws if helper "includeFile" cannot find template', () => {
    expect(() => {
      render(
        '<%~ E.includeFile("missing-template", it) %>',
        {},
        {
          filename: path.join(__dirname, 'templates/placeholder.eta'),
          views: [path.join(__dirname, 'templates'), path.join(__dirname, 'othertemplates')],
        }
      )
    }).toThrow(
      `Could not find the template "missing-template". Paths tried: ${path.join(
        __dirname,
        '/templates'
      )}/missing-template.eta,${path.join(__dirname, '/othertemplates')}/missing-template.eta`
    )
  })
})

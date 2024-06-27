import Handlebars from 'handlebars'

import './index.less'
import { buttonLink } from './components/button-link'
import indexTmpl from './index.tmpl'

Handlebars.registerPartial('button-link', buttonLink)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')
  const tempalte = Handlebars.compile(indexTmpl)
  const result = tempalte({})
  root!.innerHTML = result
})

import './signup.less'
import Handlebars from 'handlebars'
import signupTmpl from './signup.tmpl'
import { button } from '../../components/button'
import { buttonLink } from '../../components/button-link'
import { input } from '../../components/input'

Handlebars.registerPartial('button', button)
Handlebars.registerPartial('button-link', buttonLink)
Handlebars.registerPartial('input', input)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')

  const template = Handlebars.compile(signupTmpl)
  root!.innerHTML = template({})
})

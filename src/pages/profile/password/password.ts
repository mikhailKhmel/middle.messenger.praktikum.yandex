import './password.less'
import Handlebars from 'handlebars'
import passwordTmpl from './password.tmpl'
import { input } from '../../../components/input'
import { buttonLink } from '../../../components/button-link'

Handlebars.registerPartial('input', input)
Handlebars.registerPartial('button-link', buttonLink)

function render(props: any) {
  const root = document.querySelector('#root')
  const template = Handlebars.compile(passwordTmpl)
  root!.innerHTML = template(props)
}

function init() {
  const props = {}
  render(props)
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

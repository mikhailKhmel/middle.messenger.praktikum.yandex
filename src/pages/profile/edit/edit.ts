import './edit.less'
import Handlebars from 'handlebars'
import editTmpl from './edit.tmpl'
import { input } from '../../../components/input'
import { buttonLink } from '../../../components/button-link'

Handlebars.registerPartial('input', input)
Handlebars.registerPartial('button-link', buttonLink)

function render(props: any) {
  const root = document.querySelector('#root')
  const template = Handlebars.compile(editTmpl)
  root!.innerHTML = template(props)
}

function init() {
  const props = {}
  render(props)
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

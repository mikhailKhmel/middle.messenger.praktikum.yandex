import './error.less'
import Handlebars from 'handlebars'
import tmpl404 from './error.tmpl'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')
  const template = Handlebars.compile(tmpl404)
  root!.innerHTML = template({})
})

import './profile.less'
import profileTmpl from './profile.tmpl'
import Handlebars from 'handlebars'

function render(props: any) {
  const root = document.querySelector('#root')
  const template = Handlebars.compile(profileTmpl)
  root!.innerHTML = template(props)
}

function init() {
  const props = {}
  render(props)
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

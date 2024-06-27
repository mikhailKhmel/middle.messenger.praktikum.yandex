import './notfound.less'
import Handlebars from 'handlebars'
import tmpl404 from './notfound.tmpl'
import notfoudImg from '../../assets/tumbleweed.gif'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')
  const template = Handlebars.compile(tmpl404)
  root!.innerHTML = template({ img: notfoudImg })
})

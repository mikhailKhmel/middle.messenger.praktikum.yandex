import './input.less'
import inputTmpl from './input.tmpl'
import Handlebars from 'handlebars'

export const input = (context: any) => {
  const template = Handlebars.compile(inputTmpl)
  return template(context)
}

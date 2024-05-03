import './button-link.less'
import buttonLinkTmpl from './button-link.tmpl'
import Handlebars from 'handlebars'

export const buttonLink = (context: any) => {
  const template = Handlebars.compile(buttonLinkTmpl)
  return template(context)
}

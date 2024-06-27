import './button.less'

import Handlebars from 'handlebars'
import buttonTmpl from './button.tmpl'

export const button = (context: any) => {
  const template = Handlebars.compile(buttonTmpl)
  return template(context)
}

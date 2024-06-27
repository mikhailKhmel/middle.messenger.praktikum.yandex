import './contact.less'
import Handlebars from 'handlebars'
import contactTmpl from './contact.tmpl'

export const contact = (context: any) => {
  const template = Handlebars.compile(contactTmpl)
  return template(context)
}

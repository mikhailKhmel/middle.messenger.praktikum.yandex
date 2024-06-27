import './profile.less'
import Handlebars from 'handlebars'
import profileTmpl from './profile.tmpl'

export const profile = (context: any) => {
  const template = Handlebars.compile(profileTmpl)
  return template(context)
}

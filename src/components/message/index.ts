import './message.less'
import Handlebars from 'handlebars'
import messageTmpl from './message.tmpl'

export const message = (context: { message: string; isIncome: boolean }) => {
  const template = Handlebars.compile(messageTmpl)
  return template(context)
}

import { contact } from '../../components/contact'
import { input } from '../../components/input'
import { message } from '../../components/message'
import { profile } from '../../components/profile'
import './main.less'
import mainTmpl from './main.tmpl'
import Handlebars from 'handlebars'

Handlebars.registerPartial('contact', contact)
Handlebars.registerPartial('message', message)
Handlebars.registerPartial('input', input)
Handlebars.registerPartial('profile', profile)

function getContacts() {
  const contacts: { username: string }[] = []
  for (let i = 0; i < 20; i++) {
    contacts.push({ username: `Пользователь ${i}` })
  }
  return contacts
}

function getMessages() {
  const messages: { message: string; isIncome: boolean }[] = []
  for (let i = 0; i < 100; i++) {
    messages.push({
      message: `текст ${i}`,
      isIncome: Math.round(Math.random()) === 0,
    })
  }
  return messages
}

function render(props: any) {
  const root = document.querySelector('#root')
  const template = Handlebars.compile(mainTmpl)
  root!.innerHTML = template(props)
}

function init() {
  const contacts = getContacts()
  const messages = getMessages()
  const props = { contacts, messages }
  render(props)
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

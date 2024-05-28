import Contact from '../../components/contact'
import Input from '../../components/input'
import Message from '../../components/message'
import Profile from '../../components/profile'
import Block from '../../types/block'
import getContacts from '../../utils/getContacts'
import getMessages from '../../utils/getMessages'
import { render } from '../../utils/renderDOM'
import './main.less'
import mainTmpl from './main.tmpl'

interface IProps {
  profile: Block
  contacts: string[]
  messages: string[]
  messageInput: Block
}

class Main extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): string {
    return this.compile(mainTmpl, this.props)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const contacts = getContacts().map((x) => new Contact({ name: x.username }).render())
  const messages = getMessages().map((x) => new Message(x).render())
  const messageInput = new Input({ id: 'message', name: 'message', type: 'text', placeholder: 'Введите сообщение' })
  const main = new Main({ profile: new Profile(), contacts, messages, messageInput })
  render('#root', main)
})

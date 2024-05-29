import Contact from '../../components/contact'
import FormInput from '../../components/forminput'
import Input from '../../components/input'
import Message from '../../components/message'
import Profile from '../../components/profile'
import SendButton from '../../components/send-button'
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
  sendButton: Block
}

class Main extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): DocumentFragment {
    return this.compile(mainTmpl, this.props)
  }
}

let message: string = ''

document.addEventListener('DOMContentLoaded', () => {
  const contacts = getContacts().map((x) => new Contact({ name: x.username }).element?.innerHTML || '')
  const messages = getMessages().map((x) => new Message(x).element?.innerHTML || '')
  const messageInput = new Input({
    id: 'message',
    name: 'message',
    type: 'text',
    placeholder: 'Введите сообщение',
    events: {
      blur: (event: any) => {
        message = event.target.value
      },
    },
  })
  const messageFormInput = new FormInput({ input: messageInput })
  const sendButton = new SendButton({
    events: {
      click: () => {
        const trimMessage = message.trim()
        messageFormInput.setProps({ error: !trimMessage ? 'Сообщение не может быть пустым' : '' })
      },
    },
  })
  const main = new Main({ profile: new Profile(), contacts, messages, messageInput: messageFormInput, sendButton })
  render('#root', main)
})

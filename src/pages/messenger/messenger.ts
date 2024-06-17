import Contact from '../../components/contact';
import FormInput from '../../components/forminput';
import Input from '../../components/input';
import Message from '../../components/message';
import Profile from '../../components/profile';
import SendButton from '../../components/send-button';
import Block from '../../types/block';
import getContacts from '../../utils/getContacts';
import getMessages from '../../utils/getMessages';
import './messenger.less';
import mainTmpl from './messenger.tmpl.ts';

interface IProps {
  profile: Block;
  contacts: string[];
  messages: string[];
  messageInput: Block;
  sendButton: Block;
}

export class Messenger extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    let message: string = '';
    const contacts = getContacts()
      .map(
        (x) => new Contact({ name: x.username }).element?.innerHTML || '',
      );
    const messages = getMessages()
      .map((x) => new Message(x).element?.innerHTML || '');
    const messageInput = new Input({
      id: 'message',
      name: 'message',
      type: 'text',
      placeholder: 'Введите сообщение',
      events: {
        blur: (event: any) => {
          message = event.target.value;
        },
      },
    });
    const messageFormInput = new FormInput({ input: messageInput });
    const sendButton = new SendButton({
      events: {
        click: () => {
          const trimMessage = message.trim();
          messageFormInput.setProps({ error: !trimMessage ? 'Сообщение не может быть пустым' : '' });
        },
      },
    });
    this.props = {
      profile: new Profile().getContent()?.innerHTML,
      contacts,
      messages,
      messageInput: messageFormInput.getContent()?.innerHTML,
      sendButton: sendButton.getContent()?.innerHTML,
    };
    return this.compile(mainTmpl, this.props);
  }
}

import FormInput from '../../components/forminput';
import Input from '../../components/input';
import Profile from '../../components/profile';
import SendButton from '../../components/send-button';
import Block from '../../types/block';
import './messenger.less';
import mainTmpl from './messenger.tmpl.ts';
import { ChatsApi } from '../../api/ChatsApi.ts';

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
    const messages = (new ChatsApi()).chats();
    this.props = {
      profile: new Profile().getContent()?.innerHTML,
      messageInput: messageFormInput.getContent()?.innerHTML,
      sendButton: sendButton.getContent()?.innerHTML,
      messages,
    };
    return this.compile(mainTmpl, this.props);
  }
}

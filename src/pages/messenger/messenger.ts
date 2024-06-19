import FormInput from '../../components/forminput';
import Input from '../../components/input';
import Profile from '../../components/profile';
import SendButton from '../../components/send-button';
import Block, { Props } from '../../types/Block.ts';
import './messenger.less';
import mainTmpl from './messenger.tmpl.ts';
import { ChatsApi } from '../../api/ChatsApi.ts';
import AddChatButton from '../../components/add-chat-button';
import { ChatType } from '../../types/ChatType.ts';
import Chat from '../../components/chat';

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

  componentDidMount(_oldProps?: Props) {
    super.componentDidMount(_oldProps);
    new ChatsApi().chats()
      .then((res) => this.setProps({ chats: res.map((x: ChatType) => new Chat({ name: x.title }).getContent()?.outerHTML) }));
  }

  render(): DocumentFragment {
    let message: string = '';
    const addChatButton = new AddChatButton({});
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

    this.children = {
      addChatButton,
      profile: new Profile(),
      messageInput: messageFormInput,
      sendButton,
    };
    return this.compile(mainTmpl, this.props);
  }
}

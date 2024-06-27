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
import ChatButton from '../../components/chat-button';
import { Chat } from '../../components/chat';
import { AuthApi } from '../../api/AuthApi.ts';

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
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount(_oldProps?: Props) {
    super.componentDidMount(_oldProps);
    this.refresh();
  }

  refresh() {
    new ChatsApi().chats()
      .then((res) => {
        const chats: ChatButton[] = res.map((x: ChatType) => new ChatButton({
          name: x.title,
          avatar: x.avatar,
          events: {
            click: () => {
              (this.children.chat as Chat)?.setProps({ chatId: x.id });
              (this.children.chat as Chat)?.show();
            },
          },
        }));
        this.setChildren({
          chats,
        });
      });
    new AuthApi().getUserInfo()
      .then((res) => {
        this.setProps({ userId: res.id });
      });
  }

  render(): DocumentFragment {
    let message: string = '';
    const addChatButton = new AddChatButton({
      onRefresh: () => {
        this.refresh();
      },
    });
    const messageInput = new Input({
      id: 'message',
      name: 'message',
      type: 'text',
      placeholder: 'Введите сообщение',
      events: {
        blur: (event: Event) => {
          if (!(event.target instanceof HTMLInputElement)) return;
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

    const chat = new Chat({
      userId: this.props.userId,
      onRefresh: this.refresh,
    });
    chat.hide();

    this.children = {
      ...this.children,
      addChatButton,
      profile: new Profile(),
      messageInput: messageFormInput,
      sendButton,
      chat,
    };
    return this.compile(mainTmpl, this.props);
  }
}

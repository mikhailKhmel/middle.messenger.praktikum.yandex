import './chat.less';
import Block, { Props } from '../../types/Block.ts';
import chatTmpl from './chat.tmpl.ts';
import { ChatsApi } from '../../api/ChatsApi.ts';
import { AddUser } from '../add-user';
import Input from '../input';
import SendButton from '../send-button';

export class Chat extends Block {
  constructor(props: Props) {
    super('div', props);
    this.loadChat = this.loadChat.bind(this);
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    if (!_oldProps || !_oldProps) return true;
    if (_oldProps.chatId !== _newProps.chatId) {
      this.loadChat();
    }

    return super.componentDidUpdate(_oldProps, _newProps);
  }

  async loadChat() {
    const id = this.props.chatId;
    const users = (await (new ChatsApi().getChatUsers({ id }))).map((user: any) => new User({
      id: user.id,
      chatId: this.props.chatId,
      first_name: user.first_name,
      second_name: user.second_name,
      onRefresh: this.loadChat,
    }));
    console.log({ users });
    this.setChildren({ users });
  }

  render(): DocumentFragment {
    this.children = {
      ...this.children,
      addUser: new AddUser({
        chatId: this.props.chatId,
        onRefresh: this.loadChat,
      }),

      messageInput: new Input({
        id: 'message',
        name: 'message',
        type: 'text',
      }),
      sendButton: new SendButton({}),
    };
    return this.compile(chatTmpl, this.props);
  }
}

class User extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    this.children = {
      ...this.children,
      delete: new DeleteUserButton({
        events: {
          click: async () => {
            await (new ChatsApi().deleteUser({
              chatId: this.props.chatId,
              users: [this.props.id],
            }));
            this.props.onRefresh();
          },
        },
      }),
    };
    return this.compile(
      `<div class="user">
                <span>{{first_name}} {{second_name}}</span>
                {{{delete}}}
                </div>`,
      this.props,
    );
  }
}

class DeleteUserButton extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(
      `
                <button><i class="bi bi-x"></i></button>`,
      this.props,
    );
  }
}
